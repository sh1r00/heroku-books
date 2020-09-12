'use strict'

const Moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const Docs = sequelize.define('Docs', {
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
  return Docs
}
