const express = require('express');
const router = express.Router();
const db = require('../models');

// Get all documents
router.get('/', async (req, res) => {
  try {
    const documents = await db.Document.findAll();
    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get document by id
router.get('/:id', async (req, res) => {
  try {
    const document = await db.Document.findByPk(req.params.id);
    if (!document) return res.status(404).json({ error: 'Document not found' });
    res.json(document);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create document
router.post('/', async (req, res) => {
  try {
    const document = await db.Document.create(req.body);
    res.status(201).json(document);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update document
router.put('/:id', async (req, res) => {
  try {
    const document = await db.Document.findByPk(req.params.id);
    if (!document) return res.status(404).json({ error: 'Document not found' });
    await document.update(req.body);
    res.json(document);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete document
router.delete('/:id', async (req, res) => {
  try {
    const document = await db.Document.findByPk(req.params.id);
    if (!document) return res.status(404).json({ error: 'Document not found' });
    await document.destroy();
    res.json({ message: 'Document deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 