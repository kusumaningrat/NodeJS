const yargs = require('yargs');
const {simpanContact, listContact, detailContact, deleteContact} = require('./contacts')

yargs.command({
    command: 'add',
    describe: 'Adding data',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email',
            demandOption: true,
            type: 'string'
        },
        noHP: {
            describe: 'No Handphone',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv){
        simpanContact(argv.nama,argv.email,argv.noHP)
    }
}).demandCommand();

// Menampilkan daftar nama,noHP dari contacts.json 
yargs.command({
    command: 'list',
    describe: 'Menampilkan nama & noHP',
    handler() {
        listContact();
    }
});

// Detail sebuah contact

yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail sebuah contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        detailContact(argv.nama)
    }
});

yargs.command({
    command: 'delete',
    describe: 'Menghapus sebuah contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        deleteContact(argv.nama)
    }
});

yargs.parse()
// const {tulisPertanyaan,simpanContact} = require('./contacts');

// const main = async () => {
//     const nama  = await tulisPertanyaan('Masukan nama anda: ');
//     const email = await tulisPertanyaan('Masukan email anda: ')
//     const noHP  = await tulisPertanyaan('Masukan noHP anda: ')

//     simpanContact(nama,email,noHP)
    
// };

// main()