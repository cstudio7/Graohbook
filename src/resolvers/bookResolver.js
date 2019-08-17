import models from '../db/models';

const { Book } = models;

export const getAllBooks = async () => {
  try {
    const bookList = await Book.findAll({});
    return bookList;
  } catch (error) {
    return error;
  }
};

export const findBookById = async (value) => {
  try {
    const { id } = value;
    const result = await Book.findOne({
      where: { id }
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const findAuthorsBooks = async (author) => {
  try {
    const { id } = author;
    const result = await Book.findAll({
      where: { authorId: id }
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const addBook = async (data) => {
  try {
    const { name, authorId } = data;
    const bookName = name.toLowerCase();
    const [book, created] = await Book.findOrCreate({
      where: { name: bookName },
      defaults: {
        name: bookName,
        authorId
      },
    });
    if (!created) {
      throw new Error('Book exist');
    }
    return book.dataValues;
  } catch (error) {
    return error;
  }
};
