const yargs = require('yargs');
const { simpanContact, listContact, detailContact, deleteContact } = require('./app');

yargs.command({
    command: 'add',
    describe: 'Adding data',
    builder: {
        nama: {
            describe: 'Full name',
            type: 'string',
            demandOption: true
        },
        email: {
            describe: 'Your Email',
            type: 'string',
            demandOption: true
        },
        noHP: {
            describe: 'No Handphone',
            type: 'string',
            demandOption: true
        },
        alamat: {
            describe: 'Address',
            type: 'string',
            demandOption: true
        },
    },

    handler(argv){
        simpanContact(argv.nama,argv.email,argv.noHP,argv.alamat)
    }
    
});

yargs.command({
    command: 'list',
    describe: 'Menampilkan nama & contact dari daftar contact',
    handler() {
        listContact()
    }
});

yargs.command({
    command: 'detail',
    describe: 'List of a contact by name',
    builder: {
        nama: {
            describe: 'Full name',
            type: 'string',
            demandOption: true
        }
    },
    handler(argv){
        detailContact(argv.nama);
    }
        
});

yargs.command({
    command: 'delete',
    describe: 'delete of a contact by name',
    builder: {
        nama: {
            describe: 'Full name',
            type: 'string',
            demandOption: true
        }
    },
    handler(argv){
        deleteContact(argv.nama);
    }
        
});


yargs.parse()
// const {tulisPertanyaan,simpanContact} = require('./app')

// const main = async () => {
//     const nama   = await tulisPertanyaan('Masukan nama anda: ');
//     const email  = await tulisPertanyaan('Masukan email anda: ');
//     const noHP   = await tulisPertanyaan('Masukan noHP anda: ');
//     const alamat = await tulisPertanyaan('Masukan alamat anda: ')

//     simpanContact(nama,email,noHP,alamat)
// }
// main()