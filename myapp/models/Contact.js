const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    nama: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    noHP: {
        type: Number,
        required: true
    },
    alamat: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Contacts', contactSchema);