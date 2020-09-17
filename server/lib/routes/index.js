'use strict'

const Joi = require('@hapi/joi')
const Boom = require('@hapi/boom')
const Doc = require('../controllers/doc')
const Docs = require('../controllers/docs')
const User = require('../controllers/user')
const Users = require('../controllers/users')
const Apis = require('./api')

const failAction = function (request, h, err) {
  if (process.env.NODE_ENV === 'production') {
    // In prod, log a limited error message and throw the default Bad Request error.
    // eslint-disable-next-line no-console
    console.error('ValidationError:', err.message)
    throw Boom.badRequest(`Invalid request payload input`)
  } else {
    // During development, log and respond with the full error.
    // eslint-disable-next-line no-console
    console.error(err)
    throw err
  }
}

const auth = {
  path: '/auth/login',
  method: 'POST',
  handler: User.authenticate,
  options: {
    auth: {
      strategy: 'session',
      mode: 'try',
    },
    validate: {
      payload: Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      }),
    },
  },
  /*
      const email = request.payload.email
      const password = request.payload.password
      const users = [
        {
          id: '1',
          name: 'admin',
          email: 'admin@admin.com',
          password: 'admin',
        },
      ]

      if (!email || !password) {
        return { statusCode: 500, message: 'Missing username or password' }
      }

      const account = users.find(
        (user) => user.email === email && user.password === password
      )

      if (!account) {
        return { statusCode: 401, message: 'Invalid email or password' }
      }

      request.cookieAuth.set({ id: account.id })

      return {
        login: true,
        message: 'Succesfull Login',
        auth: request.auth.isAuthenticated,
      }
    },
  },
  */
}

const logout = {
  path: '/logout',
  method: 'GET',
  handler(request, h) {
    request.cookieAuth.clear()
    return { logout: true, message: 'Logout successfull' }
  },
}

const user = {
  path: '/auth/user',
  method: 'GET',
  options: {
    auth: {
      strategy: 'session',
      mode: 'try',
    },
  },
  handler: User.read,
}

const getAllUsers = {
  path: '/users',
  method: 'GET',
  handler: Users,
  options: {
    description: 'Gets all the users available',
  },
}

const getAllDocs = {
  path: '/docs',
  method: 'GET',
  handler: Docs,
  options: {
    description: 'Gets all the documents available',
  },
}

const saveDoc = {
  path: '/doc',
  method: 'POST',
  handler: Doc.create,
  options: {
    auth: {
      strategy: 'session',
      mode: 'try',
    },
    description: 'Add a document',
    payload: {
      output: 'stream',
      parse: true,
      multipart: true,
    },
    validate: {
      failAction,
      payload: Joi.object({
        title: Joi.string().required(),
        description: Joi.string(),
        image: Joi.any(),
        file: Joi.any().required(),
      }),
    },
  },
}

const getDoc = {
  path: '/doc/{slug}',
  method: 'GET',
  handler: Doc.read,
  options: {
    description: 'Get a document',
  },
}

const editDoc = {
  path: '/doc/{slug}',
  method: 'PUT',
  handler: Doc.update,
  options: {
    auth: {
      strategy: 'session',
      mode: 'try',
    },
    description: 'Edit a document',
    payload: {
      multipart: true,
    },
  },
}

const deleteDoc = {
  path: '/doc/{slug}/delete',
  method: 'GET',
  handler: Doc.delete,
  options: {
    auth: {
      strategy: 'session',
      mode: 'try',
    },
    description: 'Delete a document',
  },
}

module.exports = [
  auth,
  user,
  logout,
  getAllUsers,
  getAllDocs,
  getDoc,
  saveDoc,
  editDoc,
  deleteDoc,
  Apis,
]
