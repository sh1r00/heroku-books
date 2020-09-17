'use strict'

// const { User } = require('../models')
const Boom = require('@hapi/boom')

const Users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'admin@admin.com',
    password: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

module.exports = {
  authenticate: async (request, h) => {
    const email = request.payload.email
    const password = request.payload.password

    if (!email || !password) {
      throw Boom.badRequest('Missing username or password')
    }

    /*
    const account = await User.findOne({
      where: {
        email: request.email,
      },
    })
    */

    const account = Users.find(
      (user) => user.email === email && user.password === password
    )

    if (!account) {
      throw Boom.unauthorized('Invalid email or password')
    }

    await request.cookieAuth.set({ id: account.id })

    const result = {
      login: true,
      message: 'Succesfull Login',
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
