const express = require('express');
const rootDir = require('../utility/path');
const path = require('path');
const router = express.Router();

// Get the product
router.get('/admin', (req, res, next) => {
   res.sendFile(path.join(rootDir, "ui", "admin.html"));
});

// Post the product
router.post('/admin', (req, res, next) => {
   res.send("Product will be added soon or later")
})


module.exports = router;