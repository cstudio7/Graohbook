const books = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'Book',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      authorId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true
        }
      },
    },
    {}
  );
  Book.associate = (models) => {
    Book.belongsTo(models.Author, {
      foreignKey: 'id',
      as: 'author',
      onDelete: 'CASCADE'
    });
  };
  return Book;
};

export default books;
