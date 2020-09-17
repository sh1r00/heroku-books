'use strict'

const Models = require('../models')

module.exports = async (request, h) => {
  const result = await Models.Doc.findAll({
    attributes: ['date', 'title', 'slug', 'description', 'image'],
    order: [['date', 'DESC']],
  })

  return {
    data: {
      files: result,
    },
    page: 'Documents -- List of available Documents',
    description: 'Enjoy these files',
  }
}
