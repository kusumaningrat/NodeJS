const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Contacts = require('./models/Contact')
const mongoose = require('mongoose');
require('dotenv/config');

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Import routes
const contactRoutes = require('./routes/Contact')

// Connect to DB
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;

db.on(
    'error', console.error.bind(console, 'Database connection error')
)
db.once('open', () => {
    console.log('Database is Connected')
});

// Create a Routes
app.use('/api/contact', contactRoutes);

// Rendering ejs template
app.get('/', (req,res) => {
    res.render('Home')
});
app.get('/about', (req,res) => {
    res.render('About')
});
app.get('/contact', (req,res) => {
    res.render('Contact')
});
app.get('/add-contact', (req,res) => {
    res.render('Add-Contact')
});

// Create a Server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})