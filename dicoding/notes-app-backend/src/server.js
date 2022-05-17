const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async() => {

    const server = Hapi.server({
        host: 'localhost',
        port: 3000,
        routes: {
            cors: {
                origin: ['*'],
            }
        }
    });

    await server.start();

    server.route(routes);

    console.log('Server running on %s', server.info.uri);
}

init();