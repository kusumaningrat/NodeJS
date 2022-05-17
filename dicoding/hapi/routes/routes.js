const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Homepage';
        }
    },
    {
        method: 'GET',
        path: '/about',
        handler: (request, h) => {
            return 'About';
        }
    },
    {
        method: 'GET',
        path: '/user/{name?}',
        handler: (request, h) => {
            const { name = 'admin' } = request.params;
            return `Hello, ${name}!`;
        }
    }
];

module.exports = routes;
