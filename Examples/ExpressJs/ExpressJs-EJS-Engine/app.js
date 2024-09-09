const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Set views directory
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Define routes
app.get('/', (req, res) => {
   res.status(200).render('index', {
      docTitle: "Home"
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
      docTitle: 'Our Services'
   });
});

app.get('/projects', (req, res) => {
   const projects = [
      { name: 'React' }, { name: 'Rust' }, { name: 'Tirea' }, { name: 'htm' }, { name: 'htmlx' }
   ];
   res.status(200).render('projects', {
      activePage: 'projects',
      docTitle: 'Projects',
      projects: projects
   });
});

app.get('/contact', (req, res) => {
   res.status(200).render('contact', {
      activePage: 'contact',
      docTitle: 'Contact Us'
   });
});

// Handle 404 - Page Not Found
app.use((req, res, next) => {
   res.status(404).render('404', {
      docTitle: 'Page Not Found'
   });
});

// Start the server
app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
