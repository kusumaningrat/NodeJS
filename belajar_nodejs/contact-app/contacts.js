const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

// Cek apakah direktory data sudah ada atau belum, jika belum maka langsung dibuat
const dirPath = './data';
if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
};

// Cek apakah file contacts.json sudah ada atau belum, jika belum maka langsung dibuat
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf8');
};

// Load Contact
const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf8');
    const contacts = JSON.parse(file);
    return contacts;
}


const simpanContact = (nama,email,noHP) => {
    const contact = {nama,email,noHP};
    const contacts = loadContact();

    // Cek duplikat
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if(duplikat){
        console.log(chalk.red.inverse.bold('Contact sudah terdaftar, gunakan contact lain!!'))
        return false;
    };

    // Cek Email
    if(email) {
        if(!validator.isEmail(email)){
            console.log(chalk.red.inverse.bold('Email is invalid'));
            return false;
        }
    }

    // Cek numberPhone
    if(!validator.isMobilePhone(noHP,'id-ID')){
        console.log(chalk.red.inverse.bold('no Handphone is invalid'));
        return false;
    }

    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
    
    console.log(chalk.green.inverse.bold('Terimakasih sudah memasukan data'));

};

const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.cyan.inverse.bold('Daftar Contact: '));
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}.  ${contact.nama} - ${contact.noHP}`)
    })
}

const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

    if(!contact){
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
        return false;
    }

    console.log(chalk.bold(contact.nama));
    console.log(chalk.bold(contact.email));
    console.log(chalk.bold(contact.noHP));

}

const deleteContact = (nama) => {
    const contacts = loadContact();

    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

    if(contacts.length === newContacts.length){
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
        return false;
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts))
    
    console.log(chalk.green.inverse.bold(`${nama} berhasil dihapus`));

}

module.exports = {simpanContact,listContact,detailContact, deleteContact};