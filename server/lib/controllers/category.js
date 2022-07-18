'use strict'

const Slugify = require('slug')
const Boom = require('@hapi/boom')
const { Category, Doc } = require('../models')
const { imageFilter, uploader, fileRemover } = require('../utils')
const imagePath = './static/uploads'

module.exports = {
  create: async (request, h) => {
    const data = request.payload
    const image = data.image

    let imageDetails = {}

    if (image && image !== 'null' && image !== 'undefined') {
      const imageOptions = { dest: `${imagePath}/`, fileFilter: imageFilter }
      imageDetails = await uploader(image, imageOptions)
    }

    const result = await Category.create({
      date: new Date(),
      title: data.title,
      slug: Slugify(data.title, { lower: true }),
      image: imageDetails.path,
      totCount: data.totCount,
    })
    return result
  },

  read: async (request, h) => {
    // eslint-disable-next-line
    console.log(request.params.id)
    const results = await Category.findByPk(request.params.id, {})

    // eslint-disable-next-line
    console.log('find pk results ', results)
    return {
      data: {
        files: results,
      },
      page: 'Category -- List of available items in this category',
      description: 'Enjoy these files',
    }
  },

  update: async (request, h) => {
    const data = request.payload
    // eslint-disable-next-line
    console.log('edit ', data)
    // const oldFiles = data.oldFile
    const oldImage = data.oldImage
    const newImage = data.image

    const values = {
      date: new Date(),
      title: data.title,
      slug: Slugify(data.title, { lower: true }),
      totCount: data.totCount,
    }

    if (newImage && newImage !== 'null' && newImage !== 'undefined') {
      if (!fileRemover(oldImage)) {
        throw Boom.badRequest('Could not remove image')
      }
      const imageOptions = { dest: `${imagePath}/`, imageFilter }
      const imageDetails = await uploader(newImage, imageOptions)

      values.image = imageDetails.path
    }

    const options = {
      where: {
        slug: request.params.slug,
      },
    }

    await Category.update(values, options)

    const result = await Category.findOne(options)

    return result
  },

  delete: async (request, h) => {
    const options = {
      where: {
        slug: request.params.slug,
      },
    }

    const entry = await Category.findOne(options)
    const images = entry.image

    if (images && images !== 'null' && images !== 'undefined') {
      if (!fileRemover(images)) {
        throw Boom.badRequest('Could not remove image during delete process')
      }
    }
    return await Category.destroy(options)
  },
}
