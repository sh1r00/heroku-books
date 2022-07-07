'use strict'

const Boom = require('@hapi/boom')
const { User } = require('../models')
const user = require('../models/user')

module.exports = {
  authenticate: async (request, h) => {
    const email = request.payload.email
    const password = request.payload.password

    if (!email || !password) {
      throw Boom.badRequest('Missing username or password')
    }

    const account = await User.findOne({
      where: {
        email,
      },
    })

    if (!account) {
      throw Boom.unauthorized('Invalid Email')
    }

    if (password !== account.password) {
      throw Boom.unauthorized('Invalid Password')
    }

    await request.cookieAuth.set({ id: account.id })

    const result = {
      login: true,
      message: 'Succesfull Login',
      user: {
        id: user.id,
        name: user.name,
        email: account.email,
      },
      auth: request.auth.isAuthenticated,
    }
    return result
  },

  read: (request, h, err) => {
    if (!request.auth.isAuthenticated) {
      throw Boom.unauthorized('Unauthorized access')
    }
    const user = {
      id: request.auth.credentials.id,
      email: request.auth.credentials.email,
      name: request.auth.credentials.name,
    }
    return { user, auth: request.auth.isAuthenticated }
  },
}
