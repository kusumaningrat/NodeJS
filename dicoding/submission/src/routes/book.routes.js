const {
  getAll, addBook, getOne, modifyBook, deleteBook,
} = require('../controller/book.controller');

const routes = [
  {
    method: 'GET',
    path: '/books/',
    handler: getAll,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getOne,
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: modifyBook,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBook,
  },
];

module.exports = routes;
