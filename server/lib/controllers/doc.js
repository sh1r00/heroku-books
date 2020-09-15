'use strict'

const Slugify = require('slug')
const { Doc } = require('../models')
// const { uploader } = require('../utils')

module.exports = {
  create: async (request, h) => {
    const data = request.payload
    // eslint-disable-next-line
    console.log('create ', data)
    const files = data.file

    // const fileOptions = { dest: `${UPLOAD_PATH}/`, fileFilter }
    // const filesDetails = await uploader(files, fileOptions)

    const result = await Doc.create({
      date: new Date(),
      title: data.title,
      slug: Slugify(data.title, { lower: true }),
      description: data.description,
      content: files,
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
    const data = request.payload
    // eslint-disable-next-line
    console.log('edit ', data)
    const values = {
      date: new Date(),
      title: data.title,
      description: data.description,
      content: data.file,
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
