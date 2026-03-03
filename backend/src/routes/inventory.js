const express = require('express');
const InventoryItem = require('../models/InventoryItem');

const router = express.Router();

// GET all items
router.get('/', async (req, res) => {
  try {
    const items = await InventoryItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// POST create item
router.post('/', async (req, res) => {
  try {
    const item = new InventoryItem(req.body);
    await item.save();
    // broadcast via socket.io if available
    try { req.app.get('io')?.emit('inventory:created', item); } catch(e){}
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create item', details: err.message });
  }
});

// PUT update item
router.put('/:id', async (req, res) => {
  try {
    const item = await InventoryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    try { req.app.get('io')?.emit('inventory:updated', item); } catch(e){}
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update item' });
  }
});

// DELETE item
router.delete('/:id', async (req, res) => {
  try {
    const item = await InventoryItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    try { req.app.get('io')?.emit('inventory:deleted', { id: req.params.id }); } catch(e){}
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete item' });
  }
});

module.exports = router;
