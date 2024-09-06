const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const admin = require('./routes/admin')
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(admin)
app.use('/', (req, res, next) => {
   res.status(404).send("<h1>Error in Request<h1>");
})
app.use(bodyParser.urlencoded());
app.listen(5000);