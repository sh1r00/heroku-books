'use strict'

const Slugify = require('slug')
const { Doc } = require('../models/')

module.exports = {
  create: async (request, h) => {
    const result = await Doc.create({
      date: new Date(),
      title: request.payload.docTitle,
      slug: Slugify(request.payload.docTitle, { lower: true }),
      description: request.payload.docDescription,
      content: request.payload.docContent,
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
    const values = {
      date: new Date(),
      title: request.payload.docTitle,
      description: request.payload.docDescription,
      content: request.payload.docContent,
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
