const category = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: {
          msg: 'Category name is required.'
        },
        isAlpha: {
          msg: 'Category can only be a string.'
        }
      }
    }
  });

  Category.associate = (models) => {
    Category.hasMany(models.Book, {
      foreignKey: 'categoryId',
      as: 'category'
    });
  };
  return Category;
};
export default category;
