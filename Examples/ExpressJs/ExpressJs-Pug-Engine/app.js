const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;


// views
app.set('views', path.join(__dirname, 'views'));


// Middleware to serve static files (HTML, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug')

// Routes for each page
app.get('/', (req, res) => {
   const projects = [
      { name: 'React' }, { name: 'Rust' }, { name: 'Tirea' }, { name: 'htm' }, { name: 'htmlx' }
   ]
   res.status(200).render('index', {
      docTitle: "Vanakkam",
      projects: projects
   });
});

app.get('/about', (req, res) => {
   res.status(200).render('about', {
      activePage: 'about',
      docTitle: 'About Us'
   });
});


app.get('/services', (req, res) => {
   res.status(200).render('services', {
      activePage: 'services',
      docTitle: 'services'
   });
});

app.get('/contact', (req, res) => {
   res.status(200).render('contact', {
      activePage: 'contact',
      docTitle: 'contact'
   });
});
// Handle 404 - Page Not Found
app.use((req, res, next) => {
   res.status(404).render('404');
});

// Start the server
app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
