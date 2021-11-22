const mongoose = require('mongoose');

const contactSchema = ({
    nama: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    noHP: {
        type: String,
        required: true
    },
    alamat: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Contact', contactSchema);