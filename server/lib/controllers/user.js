'use strict'

// const { User } = require('../models')
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
      return { statusCode: 500, message: 'Missing username or password' }
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
      return { statusCode: 401, message: 'Invalid email or password' }
    }

    await request.cookieAuth.set({ id: account.id })

    const result = {
      login: true,
      message: 'Succesfull Login',
      auth: request.auth.isAuthenticated,
    }
    return result
  },
}
