'use strict'

const Slugify = require('slug')
const { Doc } = require('../models')

module.exports = {
  create: async (request, h) => {
    const newDoc = request.payload
    const result = await Doc.create({
      date: new Date(),
      title: newDoc.title,
      slug: Slugify(newDoc.title, { lower: true }),
      description: newDoc.description,
      content: newDoc.file,
    })
    return result
  },

  read: async (request, h) => {
    const doc = await Doc.findOne({
      where: {
        slug: request.params.slug,
      },
    })
    return doc
  },

  update: async (request, h) => {
    const newDoc = request.payload
    const values = {
      date: new Date(),
      title: newDoc.title,
      description: newDoc.description,
      content: newDoc.file,
    }

    const options = {
      where: {
        slug: request.params.slug,
      },
    }

    await Doc.update(values, options)

    const result = await Doc.findOne(options)

    return result
  },

  delete: async (request, h) => {
    await Doc.destroy({
      where: {
        slug: request.params.slug,
      },
    })
    return h.redirect('/books')
  },
}
