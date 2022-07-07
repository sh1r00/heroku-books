'use strict'

const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Doc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Doc.init(
    {
      title: DataTypes.TEXT,
      slug: DataTypes.TEXT,
      description: DataTypes.TEXT,
      image: DataTypes.TEXT,
      content: DataTypes.BLOB,
      contentMime: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Doc',
    }
  )
  return Doc
}
