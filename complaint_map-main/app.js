// app.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const complaintRouter = require('./src/routes/complaintRoutes');

const app = express();

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// Serve static files (like Leaflet CSS/JS if needed)
app.use(express.static(path.join(__dirname, 'src/views')));

// --- EJS Setup ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// --- Routes ---
app.use('/api/complaints', complaintRouter);

// Render the Complaint Map Page
app.get('/map', (req, res) => {
    res.render('complaintMap');
});

// --- Start Server ---
const port = process.env.PORT || 5100;
app.listen(port, () => {
    console.log(`🚀 App running on port ${port}...`);
});
