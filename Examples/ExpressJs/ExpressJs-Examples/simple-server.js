const express = require('express')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const admin = require('./routes/admin');
const client = require('./routes/client');
const rootDir = require('./utils/path-utility')

app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', admin);
app.use(client);

app.use((req, res, next) => {
   res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
})


app.use(bodyParser.urlencoded({
   extended: true
}));

app.listen(3000)