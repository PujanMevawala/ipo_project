const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { Pool } = require('pg');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Initialize Google OAuth client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const pool = new Pool(
    {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    }
)

pool.connect((err, client, release) => {
    if (err)
        return console.error('Error acquiring client', err.stack);
    console.log('Connected to Database');
    release();
})

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

//Routes

//user signup
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    console.log('Signup request received:', { name, email, password: '[REDACTED]' });
    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            console.warn('Signup failed: User with this email already exists.', email);
            return res.status(400).json({
                message: 'User with this email already exists'
            });
        }

        const hashed_password = await bcrypt.hash(password, 10);
        console.log('Attempting to insert new user:', { name, email, password: '[HASHED_REDACTED]' });
        const newUser = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email', [name, email, hashed_password]);
        console.log('New user inserted into DB:', newUser.rows[0]);
        const token = jwt.sign({ id: newUser.rows[0].id, email: newUser.rows[0].email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message: 'User registerd successfully!', user: newUser.rows[0], token
        });
    } catch (error) {
        console.error('Error During Signup', error.message);
        res.status(500).json({
            message: 'Server error during signup'
        });

    }
});

//signin
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0)
            return res.status(401).json(
                {
                    message: 'Invalid email or password! This username doesnt exits Register First...'
                });

        const validPassword = await bcrypt.compare(password, user.rows[0].password)
        if (!validPassword)
            return res.status(401).json({
                message: 'Invalid email or password'
            });

        const token = jwt.sign(
            {
                id: user.rows[0].id, 
                email: user.rows[0].email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1hr'
            }
        );

        res.status(200).json(
            {
                message: "Login successfull",
                user: {
                    id: user.rows[0].id,
                    name: user.rows[0].name,
                    email: user.rows[0].email,
                }, 
                token
            }
        );
    } catch (error) {
        console.error('Error During Signin', error.message);
        res.status(500).json({
            message: 'Server error during signin'
        });
    }
});

// Google OAuth signin
app.post('/google-signin', async (req, res) => {
    const { token, userInfo } = req.body;
    
    try {
        console.log('Google Signin: Received token (redacted):', token ? '[RECEIVED]' : '[NONE]');
        console.log('Google Signin: Received user info:', userInfo);
        
        if (!userInfo || !userInfo.email) {
            console.error('Google Signin Error: Invalid user information from Google', userInfo);
            return res.status(400).json({
                message: 'Invalid user information from Google'
            });
        }
        
        const { email, name, picture } = userInfo;
        console.log('Google Signin: Processing user:', { email, name, picture });
        
        // Check if user exists
        console.log('Google Signin: Checking if user exists with email:', email);
        let user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        
        if (user.rows.length === 0) {
            console.log('Google Signin: User not found, attempting to create new user.');
            // Create new user if doesn't exist
            const newUser = await pool.query(
                'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
                [name, email, 'google_oauth_user'] // Set a placeholder password for Google users
            );
            user = newUser;
            console.log('Google Signin: Created new user for Google OAuth:', user.rows[0]);
        } else {
            console.log('Google Signin: Found existing user for Google OAuth:', user.rows[0]);
        }
        
        // Generate JWT token
        const jwtToken = jwt.sign(
            {
                id: user.rows[0].id,
                email: user.rows[0].email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1hr'
            }
        );
        
        res.status(200).json({
            message: 'Google signin successful',
            user: {
                id: user.rows[0].id,
                name: user.rows[0].name,
                email: user.rows[0].email,
                picture: picture
            },
            token: jwtToken
        });
        
    } catch (error) {
        console.error('Google Signin Error: ', error.message);
        console.error('Google Signin Full error:', error);
        res.status(500).json({
            message: 'Server error during Google signin',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});