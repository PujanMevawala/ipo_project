const express = require('express');
const router = express.Router();
const db = require('../models');
const multer = require('multer');
const path = require('path');

// Multer setup for logo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/logos'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Upload company logo
router.post('/upload-logo', upload.single('logo'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ filePath: `/uploads/logos/${req.file.filename}` });
});

// Get all companies
router.get('/', async (req, res) => {
  try {
    const companies = await db.Company.findAll();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get company by id
router.get('/:id', async (req, res) => {
  try {
    const company = await db.Company.findByPk(req.params.id);
    if (!company) return res.status(404).json({ error: 'Company not found' });
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create company
router.post('/', async (req, res) => {
  try {
    const { company_name, company_logo } = req.body;
    const company = await db.Company.create({ company_name, company_logo });
    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update company
router.put('/:id', async (req, res) => {
  try {
    const { company_name, company_logo } = req.body;
    const company = await db.Company.findByPk(req.params.id);
    if (!company) return res.status(404).json({ error: 'Company not found' });
    company.company_name = company_name;
    company.company_logo = company_logo;
    await company.save();
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete company
router.delete('/:id', async (req, res) => {
  try {
    const company = await db.Company.findByPk(req.params.id);
    if (!company) return res.status(404).json({ error: 'Company not found' });
    await company.destroy();
    res.json({ message: 'Company deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 