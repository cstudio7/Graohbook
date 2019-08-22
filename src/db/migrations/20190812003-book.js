const book = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Books', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      unique: true
    },
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id',
        as: 'categoryId'
      }
    },
    coverImage: {
      type: Sequelize.STRING,
      allowNull: true
    },
    authorId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Authors',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Authors')
};

export default book;
