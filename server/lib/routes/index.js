'use strict'

// const Joi = require('@hapi/joi')
// const Boom = require('@hapi/boom')
const Doc = require('../controllers/doc')
const Docs = require('../controllers/docs')
const User = require('../controllers/user')
const Users = require('../controllers/users')

const auth = {
  path: '/auth/login',
  method: 'POST',
  handler: User.authenticate,
  config: {
    auth: {
      strategy: 'session',
      mode: 'try',
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
  /** options: {
    validate: {
      payload: Joi.object({
        email: Joi.email,
        password: Joi.password,
      }),
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
  config: {
    auth: {
      strategy: 'session',
      mode: 'try',
    },
  },
  handler(request, h) {
    if (!request.auth.isAuthenticated) {
      return { statusCode: 401, message: 'Unauthorized access' }
    }
    const user = {
      id: request.auth.credentials.id,
      email: request.auth.credentials.email,
      name: request.auth.credentials.name,
    }
    return { user, auth: request.auth.isAuthenticated }
  },
}

const donation = {
  path: '/api/donation',
  method: 'POST',
  handler(request, h) {
    return {
      works: true,
    }
  },
}

const getAllUsers = {
  path: '/users',
  method: 'GET',
  handler: Users,
  config: {
    description: 'Gets all the users available',
  },
}

const getAllDocs = {
  path: '/docs',
  method: 'GET',
  handler: Docs,
  config: {
    description: 'Gets all the documents available',
  },
}

const saveDoc = {
  path: '/doc',
  method: 'POST',
  handler: Doc.create,
  config: {
    auth: {
      strategy: 'session',
      mode: 'try',
    },
    description: 'Add a document',
    payload: {
      multipart: true,
    },
  },
}

const getDoc = {
  path: '/doc/{slug}',
  method: 'GET',
  handler: Doc.read,
  config: {
    description: 'Get a document',
  },
}

const editDoc = {
  path: '/doc/{slug}',
  method: 'PUT',
  handler: Doc.update,
  config: {
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
  config: {
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
  donation,
  getAllUsers,
  getAllDocs,
  getDoc,
  saveDoc,
  editDoc,
  deleteDoc,
]
