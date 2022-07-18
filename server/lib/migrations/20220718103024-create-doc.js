'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Docs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.TEXT,
      },
      slug: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT,
      },
      image: {
        type: Sequelize.TEXT,
      },
      totCount: {
        type: Sequelize.INTEGER,
      },
      favourite: {
        type: Sequelize.TEXT,
      },
      content: {
        type: Sequelize.BLOB,
      },
      contentMime: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Docs')
  },
}
