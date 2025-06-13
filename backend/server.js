const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

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

app.use(cors());
app.use(express.json());


//Routes

//user signup
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                message: 'User with this email already exists'
            });
        }

        const hashed_password = await bcrypt.hash(password, 10);

        const newUser = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email', [name, email, hashed_password]);
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
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});