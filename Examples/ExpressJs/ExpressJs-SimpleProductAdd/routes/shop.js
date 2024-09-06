const express = require('express');
const rootDir = require('../utility/path');
const path = require('path');
const router = express.Router();

// Get the product
router.get('/shop', (req, res, next) => {
   res.sendFile(path.join(rootDir, "ui", "shop.html"));
});

// Post the product
router.post('/shop', (req, res, next) => {
   res.send("Product will be displayed below")
})
