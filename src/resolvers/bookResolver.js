import models from '../db/models';

const { Book, Author, Category } = models;

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

export const addBook = async (parent, args, context) => {
  if (!context.user) {
    throw new Error('You are not authenticated');
  }
  try {
    const {
      name, authorId, categoryId, coverImage
    } = args;
    const author = await Author.findByPk(authorId);
    const category = await Category.findByPk(categoryId);
    if (!author) {
      throw new Error('Author does not exist');
    }
    if (!category) {
      throw new Error('Category does not exist');
    }
    const bookName = name.toLowerCase();
    const [book, created] = await Book.findOrCreate({
      where: { name: bookName },
      defaults: {
        name: bookName,
        coverImage,
        authorId,
        categoryId
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
