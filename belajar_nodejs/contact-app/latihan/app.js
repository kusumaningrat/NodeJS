const chalk = require('chalk');
const fs = require('fs');
const validator = require('validator');

// Cek apakah direktory data sudah ada atau belum, jika belum maka akan langsung dibuat
const dirPath = './contact';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
};

// Cek apakah file contacts.json sudah ada atau belum, jika belum maka akan langsung dibuat
const filePath = './contact/contacts.json';
if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath, '[]', 'utf-8');
};

const loadContact = () => {

    const file = fs.readFileSync('./contact/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}


const simpanContact = (nama,email,noHP,alamat) => {
    const contact = {nama,email,noHP,alamat}

    const contacts = loadContact();
    // cek duplikat data 
    const dup = contacts.find((contact) => contact.nama === nama);
    if(dup){
        console.log(chalk.red.inverse.bold('name is already, please input another name'))
        return false;
    };

    // cek email
    if(email){
        if(!validator.isEmail(email)){
            console.log(chalk.red.inverse.bold('Email is invalid'))
            return false;
        }
    };

    // Cek number phone
    if(!validator.isMobilePhone(noHP, 'id-ID')){
        console.log(chalk.red.inverse.bold('Number Phone is invalid'))
        return false;
    }

    contacts.push(contact);
    fs.writeFileSync('./contact/contacts.json', JSON.stringify(contacts));

    console.log('Data successfully added')

};

const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.cyan.inverse.bold('List Contact: '));
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}.  ${contact.nama} - ${contact.noHP}`)
    });
};

const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())
    if(!contact){
        console.log(chalk.red.inverse.bold('Contact is not found'));
        return false;
    }else{
        console.log(chalk.bold(contact.nama))
        console.log(chalk.bold(contact.email))
        console.log(chalk.bold(contact.noHP))
        console.log(chalk.bold(contact.alamat))
    }
};

const deleteContact = (nama) => {
    const contacts = loadContact()
    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase())
    
    if(contacts.length === newContacts.length){
        console.log(chalk.red.inverse.bold(`${nama} is not found`));
        return false;
    };

    fs.writeFileSync('./contact/contacts.json', JSON.stringify(newContacts));

    console.log('Data successfully removed')
    
}

module.exports = {simpanContact, listContact, detailContact, deleteContact}