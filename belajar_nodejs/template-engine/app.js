const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express()
const port = 3000;

// Gunakan ejs
app.set('view engine', 'ejs');
app.set(expressLayouts);

app.get('/', (req,res) => {
    const mahasiswa = [
        {
            nama: 'Kusuma Ningrat',
            email: 'kusumanetcom@gmail.com',
        },
        {
            nama: 'Dinda Syagita',
            email: 'dinda@gmail.com',
        },
        {
            nama: 'Dewi Darmani',
            email: 'dewi@gmail.com',
        },
    ]
    res.render('index', { 
        nama: 'Kusuma Ningrat', 
        title: 'Halaman Home',
        mahasiswa,
    });
});

app.get('/about', (req,res) => {
    res.render('about', 
    { 
        title: 'Halaman About',
        layout: 'layouts/main_layout'
    });
});

app.get('/contact', (req,res) => {
    res.render('contact', 
    { 
        title: 'Halaman Contact',
        layout: 'layouts/main_layout'
    });
});

// req by params
app.get('/product/:id', (req,res) => {
    res.send(`Product ID: ${req.params.id} <br> Query: ${req.query.category}`);
});

// req by 
app.use('/', (req,res) => {
    res.status(404);
    res.send('<h1>Not Found</h1>')
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});