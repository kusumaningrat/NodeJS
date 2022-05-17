const http = require('http');


const requestListener = (request, response) => {

    // Destructing Object
    const { method, url } = request;

    // Response

    if(url === '/') {
        // Todo
        if(method === 'GET') {
            response.end('Ini adalah homepage');
        } else {
            response.end(`Halaman ini tidak dapat diakses dengan ${method} request`);
        }
    } else if(url === '/about') {
        // Todo
        if(method === 'GET') {
            response.end('Ini adalah halaman about');
        } else if (method === 'POST') {
            const name = request.body;
            response.end(`Halo ${name}!, ini adalah halaman about`)
        }
    } else {
        response.end(`Halaman tidak ditemukan`);
    }

}

const server = http.createServer(requestListener);
server.listen(3000, () => {
    console.log('Server berjalan di port 3000');
});