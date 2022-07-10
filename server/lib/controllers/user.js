'use strict'

const Boom = require('@hapi/boom')
const moment = require('moment')
const { User } = require('../models')
const { generateJWT } = require('../utils')
const { decodeHeader } = require('../middleware/verifyAuth')
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

    const userAccount = account.dataValues

    if (!user) {
      throw Boom.unauthorized('Invalid Email')
    }

    if (password !== userAccount.password) {
      throw Boom.unauthorized('Invalid Password')
    }

    const token = await generateJWT(userAccount)
    const refreshExpiry = moment().utc().add(3, 'days').endOf('day').format('X')
    const refreshToken = await generateJWT({
      exp: parseInt(refreshExpiry),
      data: userAccount,
    })

    const result = {
      login: true,
      message: 'Succesfull Login',
      user: {
        id: userAccount.id,
        name: userAccount.name,
        email: userAccount.email,
        token,
        refresh: refreshToken,
      },
      auth: request.auth.isAuthenticated,
    }
    return result
  },

  read: (request, h, err) => {
    if (!decodeHeader) {
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
