const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');



// router.get('/', (req,res) => {
//     res.send('<h1>Halaman Home</h1>')
// });


// INSERT DATA
router.post('/', async(req,res) => {
    // Create a variable call contactPost
    const contactPost = new Contact({
        nama  : req.body.nama,
        email : req.body.email,
        noHP  : req.body.noHP,
        alamat: req.body.alamat
    });

    try{
        const saveContact = await contactPost.save();
        res.json(saveContact);
        console.log('Contact is successfully saved')
    }catch(err){
        res.json({mesage: err})
    }
});

router.get('/', async(req,res) => {
    res.render('Home')
    try{
        const getContact = await Contact.find();
        res.json(getContact);
    }catch(err){
        res.send({message: err});
    }
});

router.put('/:id', async(req,res) => {
    try {
        const updateContact = await Contact.updateOne({_id: req.params.id}, 
            {
                nama: req.body.nama,
                email: req.body.email,
                noHP: req.body.noHP,
                alamat: req.body.alamat
            });
            res.json(updateContact);
            console.log('Data is successfully updated');
    } catch (err) {
        res.json({message: err})
    }
});

router.delete('/:id', async(req,res) => {
    try {
        const deleteContact = await Contact.deleteOne({_id: req.params.id}, 
            {
                nama: req.body.nama,
                email: req.body.email,
                noHP: req.body.noHP,
                alamat: req.body.alamat
            });
            res.json(deleteContact);
            console.log('Data is successfully deleted');
    } catch (err) {
        res.json({message: err})
    }
});

module.exports = router