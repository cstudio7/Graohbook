import books from './../model/books';

export const getAllBooks = () => {
  return books;
};

export const findBookById = value => {
  const result = books.find(book => book.id === value.id);
  return result;
};

export const findBookByName = value => {
  return books.filter(book => book.name === value.name);
};

export const findAuthorsBooks = author => {
  return books.filter(book => book.authorId === author.id);
};

export const addBook = data => {
  const book = {
    id: books.length + 1,
    name: data.name,
    authorId: data.authorId
  };
  books.push(book);
  return book;
};
