'use strict'

const Moment = require('moment')
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
      date: {
        type: DataTypes.DATE,
        get() {
          return Moment(this.getDataValue('date')).format('MMMM Do, YYYY')
        },
      },
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.STRING,
      content: DataTypes.BLOB,
    },
    {
      sequelize,
      modelName: 'Doc',
    }
  )
  return Doc
}

/*
const Moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const Doc = sequelize.define('Doc', {
    date: {
      type: DataTypes.DATE,
      get() {
        return Moment(this.getDataValue('date')).format('MMMM Do, YYYY')
      },
    },
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.BLOB,
  })
  return Doc
}
*/
