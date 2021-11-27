// Library
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Contacts = require('./models/Contact');
const app = express();
require('dotenv/config');

// Use method override
app.use(methodOverride('_method'))

// Set Middleware
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'))


app.use(cookieParser());
app.use(session({
    secret: "fd34s@!@dfa453f3DF#$D&W",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: !true }
}));

app.use(require('flash')())

// Parsing
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

// Connect to Database
mongoose.connect(process.env.DB_URL,{ 
        useNewUrlParser: true,
        useUnifiedTopology: true,
});

let db = mongoose.connection;

// when failed to connect to database
db.on('error', console.error.bind(console, 'Database connection error'));

// when successfully connect to database
db.once('open', () => {
    console.log('Database connect successfully');
})
// Routes
app.get('/', (req,res) => {
    res.render('Home', {
        layout: 'layouts/main-layouts',
        title: 'Halaman Home'
    })
});

app.get('/about', (req,res) => {
    res.render('About', {
        layout: 'layouts/main-layouts',
        title: 'Halaman About'
    });
});

app.get('/contact', async(req,res) => {
    // const contacts = [
    //     {
    //         nama  : 'Kusuma Ningrat',
    //         email : 'kusumanetcom@gmail.com',
    //         noHP  : '082341900379',
    //         alamat: 'Gerung'
    //     },
    //     {
    //         nama  : 'Dewi Darmani',
    //         email : 'dewi@gmail.com',
    //         noHP  : '085341900379',
    //         alamat: 'Gerung'
    //     },
    //     {
    //         nama  : 'Dinda Syagita',
    //         email : 'dinda@gmail.com',
    //         noHP  : '081341900379',
    //         alamat: 'Mataram'
    //     },
    // ]
    const contacts = await Contacts.find();
    res.render('Contact', {
        layout: 'layouts/main-layouts',
        title: 'Halaman Contact',
        contacts
    })
});

// Detail Contact
app.get('/contact/:nama', async(req,res) => {
    const getContactName = await Contacts.findOne({nama: req.params.nama})
    res.render('Details', {
        layout: 'layouts/main-layouts',
        title: 'Detail Contact',
        getContactName,
    })

});

app.delete('/contact', (req,res) => {
    Contacts.deleteOne({__id: req.body.nama}).then((result) => {
        req.flash('msg', 'Data Berhasil dihapus!!')
        res.redirect('/contact')
    })
})

// Add Contact
app.get('/add-contact', (req,res) => {
    res.render('Add-Contact', {
        layout: 'layouts/main-layouts',
        title: 'Tambah Contact',
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})