const express = require('express');
const router = express.Router();
const { IPO, Company, Document } = require('../models');
const multer = require('multer');
const path = require('path');

// Multer setup for document uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/docs'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Upload RHP/DRHP PDFs for an IPO
router.post('/:id/upload-docs', upload.fields([
  { name: 'rhp_pdf', maxCount: 1 },
  { name: 'drhp_pdf', maxCount: 1 },
]), async (req, res) => {
  try {
    const ipo = await IPO.findByPk(req.params.id);
    if (!ipo) return res.status(404).json({ error: 'IPO not found' });
    const rhp_pdf = req.files['rhp_pdf'] ? `/uploads/docs/${req.files['rhp_pdf'][0].filename}` : null;
    const drhp_pdf = req.files['drhp_pdf'] ? `/uploads/docs/${req.files['drhp_pdf'][0].filename}` : null;
    const document = await Document.create({
      ipo_id: ipo.ipo_id,
      rhp_pdf,
      drhp_pdf,
    });
    res.status(201).json(document);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all documents for an IPO
router.get('/:id/documents', async (req, res) => {
  try {
    const documents = await Document.findAll({ where: { ipo_id: req.params.id } });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all IPOs (with company and documents)
router.get('/', async (req, res) => {
  try {
    const ipos = await IPO.findAll({
      include: [Company, Document]
    });
    res.json(ipos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get IPO by id
router.get('/:id', async (req, res) => {
  try {
    const ipo = await IPO.findByPk(req.params.id, {
      include: [Company, Document]
    });
    if (!ipo) return res.status(404).json({ error: 'IPO not found' });
    res.json(ipo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create IPO
router.post('/', async (req, res) => {
  try {
    const ipo = await IPO.create(req.body);
    res.status(201).json(ipo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update IPO
router.put('/:id', async (req, res) => {
  try {
    const ipo = await IPO.findByPk(req.params.id);
    if (!ipo) return res.status(404).json({ error: 'IPO not found' });
    await ipo.update(req.body);
    res.json(ipo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete IPO
router.delete('/:id', async (req, res) => {
  try {
    const ipo = await IPO.findByPk(req.params.id);
    if (!ipo) return res.status(404).json({ error: 'IPO not found' });
    await ipo.destroy();
    res.json({ message: 'IPO deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 