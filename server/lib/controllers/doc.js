'use strict'

const Slugify = require('slug')
const Boom = require('@hapi/boom')
const { Doc } = require('../models')
const {
  imageFilter,
  docxFilter,
  uploader,
  fileRemover,
  tempFile,
} = require('../utils')
const imagePath = './static/uploads'
const tempPath = './static/temp'

module.exports = {
  create: async (request, h) => {
    const data = request.payload
    const file = data.file
    const image = data.image
    const filename = file.hapi.filename
    let imageDetails = {}

    if (image && image !== 'null' && image !== 'undefined') {
      const imageOptions = { dest: `${imagePath}/`, fileFilter: imageFilter }
      imageDetails = await uploader(image, imageOptions)
    }

    if (!docxFilter(filename)) {
      throw Boom.badRequest('File type not suported')
    }

    const fileExtArray = filename.split('.')
    const fileExt = fileExtArray[1]

    const result = await Doc.create({
      date: new Date(),
      title: data.title,
      slug: Slugify(data.title, { lower: true }),
      description: data.description,
      image: imageDetails.path,
      content: file._data,
      contentExt: fileExt,
    })
    return result
  },

  read: async (request, h) => {
    const doc = await Doc.findOne({
      where: {
        slug: request.params.slug,
      },
    })
    const data = doc.dataValues
    const file = data.content
    const extention = data.contentExt
    const path = tempPath
    const filePath = await tempFile(file, path, extention)
    doc.dataValues.content = filePath
    return doc
  },

  removeTempDoc: async (request, h) => {
    const tempFile = request.params.slug
    return await fileRemover(tempFile)
  },

  update: async (request, h) => {
    const data = request.payload
    // eslint-disable-next-line
    console.log('edit ', data)
    // const oldFiles = data.oldFile
    const newFile = data.file
    const oldImage = data.oldImage
    const newImage = data.image

    const values = {
      date: new Date(),
      title: data.title,
      description: data.description,
    }

    if (newFile && newFile !== 'null' && newFile !== 'undefined') {
      if (!docxFilter(newFile.hapi.filename)) {
        throw Boom.badRequest('File type not suported')
      }
      const newFilename = newFile.hapi.filename
      const fileExtArray = newFilename.split('.')
      const newFileExt = fileExtArray[1]

      values.content = newFile._data
      values.contentExt = newFileExt
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

    await Doc.update(values, options)

    const result = await Doc.findOne(options)

    return result
  },

  delete: async (request, h) => {
    const options = {
      where: {
        slug: request.params.slug,
      },
    }

    const entry = await Doc.findOne(options)
    const images = entry.image

    if (images && images !== 'null' && images !== 'undefined') {
      if (!fileRemover(images)) {
        throw Boom.badRequest('Could not remove image during delete process')
      }
    }
    return await Doc.destroy(options)
  },
}
