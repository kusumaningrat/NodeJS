const { nanoid } = require('nanoid');
const books = require('../models/Books');

const getAll = (request, h) => {
  // eslint-disable-next-line no-unused-vars
  const { name } = request.query;
  const response = h.response({
    status: 'success',
    data: books,
  });
  response.code(200);
  return response;
};

const getOne = (request, h) => {
  const { id } = request.params;

  // eslint-disable-next-line no-shadow
  const book = books.filter((book) => book.id === id)[0];

  if (book) {
    const response = h.response({
      status: 'success',
      data: book,
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const addBook = (request, h) => {
  const { payload } = request;
  const id = nanoid(16);
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = payload;

  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt,
    id,
  };

  // Property name is cannot be empty
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // if readPage is more than pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  // if book is successfully saved
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil di tambahkan',
      data: {
        bookId: newBook.id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });

  response.code(505);
  return response;
};

const modifyBook = (request, h) => {
  const { id } = request.params;
  const { payload } = request;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = payload;

  // if propery name is empty
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // if readPage is more than pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();

  // eslint-disable-next-line no-shadow
  const book = books.findIndex((book) => book.id === id);

  if (book !== -1) {
    books[book] = {
      ...books[book],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    // When book is successfully updated
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbaharui',
    });
    response.code(200);
    return response;
  }

  // When book id is not found
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBook = (request, h) => {
  const { id } = request.params;

  // eslint-disable-next-line no-shadow
  const book = books.findIndex((book) => book.id === id);

  if (book !== -1) {
    books.splice(book, 1);

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  getAll, getOne, addBook, modifyBook, deleteBook,
};
