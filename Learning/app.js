const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/items')
const app = express();
const port = 3000;
const mongodb = 'mongodb://localhost:27017/item-database'

// Middleware function
app.use(express.urlencoded({
    extended: true
}))

mongoose.connect(mongodb,
    {useNewUrlParser: true},
    {useUnifiedTopology: true})
    .then(() => 
    console.log('Connected')
).
catch(err => console.log(err))

app.set('view engine', 'ejs');
app.listen(port);

app.get('/', (req,res) => {
    res.redirect('/get-items')
})

app.get('/get-items', (req,res) => {
    Item.find().then(result => {
        res.render('index', {items: result})
    }).catch(err => console.log(err))
})

app.get('/add-item', (req,res) => {
    res.render('add-item');
})

app.post('/items',(req,res) => {
    console.log(req.body)
    const addItem = Item(req.body);
    addItem.save().then(() => {
        res.redirect('/get-items')
    }).catch(err => console.log(err))

})

app.get('/items/:id', (req,res) => {
    const id = req.params.id;
    Item.findById(id).
    then(result => {
        console.log('result', result)
        res.render('item-detail', {item: result})
    })
})
app.get('/delete/:id', (req,res) => {
    const id = req.params.id;
    Item.Delete(id).then(result => {
        delet
    })
})

app.use((req,res) => {
    res.render('error'); 
})