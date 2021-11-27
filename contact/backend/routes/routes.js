const express = require('express');
const { body, validationResult,check } = require('express-validator');
const validator = require('validator');
const router = express.Router();
const Contact = require('../models/contact');



// router.get('/', (req,res) => {
//     res.send('<h1>Halaman Home</h1>')
// });


// INSERT DATA
router.post('/', [
    body('nama').custom(async(value) => {
        const namaDup = await Contact.findOne({nama: value});
        if(namaDup){
            throw new Error('Nama sudah ada');
        }
        return true;
    }),
    body('email').custom(async(value) => {
        const emailDup = await Contact.findOne({email: value});
        if(emailDup){
            throw new Error('Nama sudah ada');
        }
        return true;
    }),
    check('email', 'Email invalid').isEmail(),
    check('noHP', 'No Handphone invalid').isMobilePhone('id-ID')], async(req,res) => {

    // Create a variable call contactPost
    const contactPost = new Contact({
        nama  : req.body.nama,
        email : req.body.email,
        noHP  : req.body.noHP,
        alamat: req.body.alamat
    });

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({errors: errors.array() })
    }

    // Check existing data
    try{
        const saveContact = await contactPost.save();
        res.json(saveContact);
        console.log('Contact is successfully saved')
    }catch(err){
        res.json({mesage: err})
    }
    
});

router.get('/', async(req,res) => {
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