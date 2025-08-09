const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// The port is provided by the Blueprint extension environment
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Routes
const announcementRoutes = require('./routes/announcements');
app.use('/api/announcements', announcementRoutes);

app.listen(PORT, () => {
  console.log(`[Announcements Blueprint] Server is running on port ${PORT}`);
});