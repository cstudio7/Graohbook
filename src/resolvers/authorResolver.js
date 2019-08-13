import models from '../db/models';

const { Author } = models;

export const getAllAuthors = async () => {
  try {
    const authorList = await Author.findAll({});
    return authorList;
  } catch (error) {
    return error;
  }
};

export const findAuthorById = async (value) => {
  try {
    const { id } = value;
    const result = await Author.findOne({
      where: { id }
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const findBookAuthor = async (book) => {
  try {
    const { authorId } = book;
    const result = await Author.findOne({
      where: { id: authorId }
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const addAuthor = async (data) => {
  try {
    const { name } = data;
    const authorName = name.toLowerCase();
    const [author, created] = await Author.findOrCreate({
      where: { name: authorName },
      defaults: {
        name: authorName
      },
    });
    if (!created) {
      throw new Error('author exist');
    }
    return author.dataValues;
  } catch (error) {
    return error;
  }
};
