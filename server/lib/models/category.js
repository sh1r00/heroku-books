'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsToMany(models.Doc, {
        as: 'docs',
        through: 'category_doc',
        foreignKey: 'category_id',
      })
    }
  }
  Category.init(
    {
      title: DataTypes.TEXT,
      slug: DataTypes.TEXT,
      image: DataTypes.TEXT,
      totCount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Category',
    }
  )
  return Category
}
