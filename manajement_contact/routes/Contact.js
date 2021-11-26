const express = require('express');
const router  = express.Router();
const Contact = require('../models/Contact');

// Get Contact
router.get('/contacts', async(req,res) => {
   Contact.find().then(result => {
       res.render('Home', {items: result})
   }).catch(err => console.log(err))
})
// Create 


module.exports = router