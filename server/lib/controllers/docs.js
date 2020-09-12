'use strict'

const Models = require('../models/')

module.exports = async (request, h) => {
  const result = await Models.Docs.findAll({
    order: [['date', 'DESC']],
  })

  return {
    data: {
      notes: result,
    },
    page: 'Documents -- List of available Documents',
    description: 'Enjoy these files',
  }
}
