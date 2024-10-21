// routes/documents.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/documents/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1634234234.pdf
    }
});
const upload = multer({ storage: storage });

// GET Documents
router.get('/:projectId/documents', authenticateToken, async (req, res) => {
    const { projectId } = req.params;
    // Fetch documents from DB where project_id = projectId
});

// POST Upload Document
router.post('/:projectId/documents', authenticateToken, upload.single('file'), async (req, res) => {
    const { projectId } = req.params;
    const { spreadName } = req.body;
    const fileUrl = `/uploads/documents/${req.file.filename}`;
    // Save document info to DB
});

module.exports = router;
