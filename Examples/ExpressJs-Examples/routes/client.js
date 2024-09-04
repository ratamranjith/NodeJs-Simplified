const express = require('express');
const rootDir = require('../utils/path-utility')
const router = express.Router()
const path = require('path');

router.get('/client-page', (req, res, next) => {
   res.send('<h1>Add client</h1><form action="/add-client" method = "POST"><input type="text" placeholder="add client"/><button type="submit">Add</button>');
   next();
})

router.post('/client-page', (req, res, next) => {
   res.sendFile(path.join(rootDir, '..', 'views', 'sample1.html'));
   next();
})

module.exports = router