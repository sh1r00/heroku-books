'use strict'

const Models = require('../models')

module.exports = async (request, h) => {
  const result = await Models.User.findAll({
    order: [['id', 'DESC']],
  })

  return {
    data: {
      users: result,
    },
    page: 'Users -- List of available Users',
    description: 'Heres a list of users',
  }
}
