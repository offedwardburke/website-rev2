// routes/goformzWebhook.js
const express = require('express');
const router = express.Router();
const authenticateWebhook = require('../middleware/authenticateWebhook'); // Optional: Verify GoFormz webhook
const multer = require('multer');
const path = require('path');

// Configure multer for form uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/forms/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Webhook Endpoint
router.post('/goformz/webhook', authenticateWebhook, upload.single('formFile'), async (req, res) => {
    const { spreadName, projectName } = req.body; // Assuming these fields are sent
    const fileUrl = `/uploads/forms/${req.file.filename}`;
    
    // Find project by projectName
    const project = await Project.findOne({ where: { name: projectName } });
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Save form to Documents
    await Document.create({
        project_id: project.id,
        spread_name: spreadName,
        file_url: fileUrl,
        uploaded_by: null, // Or assign a system user ID
        uploaded_at: new Date()
    });

    res.status(200).json({ message: 'Form uploaded successfully' });
});

module.exports = router;
