const express = require('express');
const rootDir = require('../utils/path-utility')
const router = express.Router()
const path = require('path');
router.get('/admin-page', (req, res, next) => {
   res.sendFile(path.join(rootDir, 'views', 'sample.html'))
})

router.post('/admin-page', (req, res, next) => {
   res.send('<b>Product submitted!</b>')
})


module.exports = router