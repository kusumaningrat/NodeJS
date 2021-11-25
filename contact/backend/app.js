// Call a library
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv/config');
const routes = require('./routes/routes');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', routes);
app.use(cors());

app.set('view engine', 'ejs')



// Connect to database
const connectDB = mongoose.connect(
    process.env.DB_URL,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error While Connection to Database'));
db.once('open', () => {
    console.log('Database is succesfully connect')
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});