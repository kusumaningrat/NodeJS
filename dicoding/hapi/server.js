const Hapi = require('@hapi/hapi');
const routes = require('./routes/routes')

const init = async() => {
    const server = Hapi.Server({
        host: 'localhost',
        port: 3000,
    });

    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
}

init();