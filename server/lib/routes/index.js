'use strict'

const Joi = require('@hapi/joi')
const Boom = require('@hapi/boom')
const Categories = require('../controllers/categories')
const Category = require('../controllers/category')
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
  method: 'post',
  handler: User.authenticate,
  options: {
    auth: {
      strategy: 'jwt',
      mode: 'try',
    },
    validate: {
      failAction,
      payload: Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      }),
    },
    description: 'Log In',
  },
}

const user = {
  path: '/auth/user',
  method: 'GET',
  handler: User.read,
  options: {
    auth: {
      strategy: 'jwt',
      mode: 'try',
    },
    description: 'Get User',
  },
}

const getAllUsers = {
  path: '/users',
  method: 'GET',
  handler: Users,
  options: {
    description: 'Gets all the users available',
  },
}

const getAllCategories = {
  path: '/categories',
  method: 'GET',
  handler: Categories.read,
  options: {
    description: 'Gets all the categories available',
  },
}

const addMultipleCategories = {
  path: '/categories',
  method: 'PUSH',
  handler: Categories.create,
  options: {
    description: 'Add multiple categories',
  },
}

const saveCategory = {
  path: '/category',
  method: 'POST',
  handler: Category.create,
  options: {
    auth: {
      strategy: 'jwt',
      mode: 'try',
    },
    description: 'Add a category',
    validate: {
      failAction,
      payload: Joi.object({
        title: Joi.string().required(),
      }),
    },
  },
}

const getCategory = {
  path: '/category/{id}',
  method: 'GET',
  handler: Category.read,
  options: {
    description: 'Get a category',
  },
}

const editCategory = {
  path: '/category/{id}',
  method: 'PUT',
  handler: Category.update,
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

const deleteCategory = {
  path: '/category/{id}/remove',
  method: 'GET',
  handler: Category.delete,
  options: {
    auth: {
      strategy: 'jwt',
      mode: 'try',
    },
    description: 'Remove category',
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
  Apis,
  auth,
  addMultipleCategories,
  deleteDoc,
  deleteCategory,
  getAllUsers,
  getAllDocs,
  getAllCategories,
  getCategory,
  getDoc,
  editDoc,
  editCategory,
  removeTempDoc,
  saveCategory,
  saveDoc,
  user,
]
