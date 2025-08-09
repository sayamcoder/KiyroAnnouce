const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { AdminMiddleware } = require('@ptero/blueprint');

const dataPath = path.join(__dirname, '..', 'data', 'announcements.json');

// Helper function to read data
const readAnnouncements = () => {
  try {
    if (!fs.existsSync(dataPath)) {
      return [];
    }
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading announcements:', error);
    return [];
  }
};

// Helper function to write data
const writeAnnouncements = (data) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing announcements:', error);
  }
};

// GET all announcements (For everyone)
router.get('/', (req, res) => {
  const announcements = readAnnouncements();
  // Sort by newest first
  res.json(announcements.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

// POST a new announcement (Admin only)
router.post('/', AdminMiddleware, (req, res) => {
  const announcements = readAnnouncements();
  const { title, content, type } = req.body;

  if (!title || !content || !type) {
    return res.status(400).json({ error: 'Title, content, and type are required.' });
  }

  const newAnnouncement = {
    id: uuidv4(),
    title,
    content,
    type, // 'info', 'warning', 'danger'
    createdAt: new Date().toISOString(),
  };

  announcements.push(newAnnouncement);
  writeAnnouncements(announcements);
  res.status(201).json(newAnnouncement);
});

// DELETE an announcement (Admin only)
router.delete('/:id', AdminMiddleware, (req, res) => {
  let announcements = readAnnouncements();
  const announcementExists = announcements.some(a => a.id === req.params.id);

  if (!announcementExists) {
      return res.status(404).json({ error: 'Announcement not found.' });
  }

  announcements = announcements.filter(a => a.id !== req.params.id);
  writeAnnouncements(announcements);
  res.status(204).send(); // No Content
});

module.exports = router;