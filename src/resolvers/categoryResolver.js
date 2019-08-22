import models from '../db/models';


const { Book, Category } = models;

export const getAllCategory = async () => {
  try {
    const categoryList = await Category.findAll({});
    return categoryList;
  } catch (error) {
    return error;
  }
};

export const findCategoryById = async (data) => {
  try {
    if (data) {
      const { id } = data;
      const result = await Category.findOne({
        where: { id }
      });
      return result;
    }
  } catch (error) {
    return error;
  }
};

export const addCategory = async (parent, args, context) => {
  if (!context.user) {
    throw new Error('You are not authenticated');
  }
  try {
    const { name } = args;
    const categoryName = name.toLowerCase();
    const [category, created] = await Category.findOrCreate({
      where: { name: categoryName },
      defaults: {
        name: categoryName,
      },
    });
    if (!created) {
      throw new Error('Book exist');
    }
    return category.dataValues;
  } catch (error) {
    return error;
  }
};

export const findCategoryBooks = async (category) => {
  try {
    const { id } = category;
    const result = await Book.findAll({
      where: { categoryId: id }
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const findBookCategory = async (data) => {
  try {
    if (data) {
      const { categoryId } = data;
      const result = await Category.findOne({
        where: { id: categoryId }
      });
      return result;
    }
  } catch (error) {
    return error;
  }
};
