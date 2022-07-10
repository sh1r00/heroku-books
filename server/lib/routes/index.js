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
      strategy: 'jwt',
      mode: 'try',
    },
    validate: {
      payload: Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      }),
    },
  },
}

const user = {
  path: '/auth/user',
  method: 'GET',
  options: {
    auth: {
      strategy: 'jwt',
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
      strategy: 'jwt',
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

const removeTempDoc = {
  path: '/doc/{slug}/remove',
  method: 'GET',
  handler: Doc.removeTempDoc,
  options: {
    description: 'Remove temp document',
  },
}

const editDoc = {
  path: '/doc/{slug}',
  method: 'PUT',
  handler: Doc.update,
  options: {
    auth: {
      strategy: 'jwt',
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
      strategy: 'jwt',
      mode: 'try',
    },
    description: 'Delete a document',
  },
}

module.exports = [
  auth,
  user,
  getAllUsers,
  getAllDocs,
  getDoc,
  removeTempDoc,
  saveDoc,
  editDoc,
  deleteDoc,
  Apis,
]
