const Slugify = require('slug')
const { Category } = require('../models')
const { imageFilter, uploader } = require('../utils')
const imagePath = './static/uploads'

module.exports = {
  create: async (request, h) => {
    const data = request.payload

    const newData = []

    for (let i = 0; i < data.length; i++) {
      const image = data[i].image

      let cleanData = {}
      let imageDetails = {}

      if (image && image !== 'null' && image !== 'undefined') {
        const imageOptions = { dest: `${imagePath}/`, fileFilter: imageFilter }
        imageDetails = await uploader(image, imageOptions)
      }

      cleanData = {
        date: new Date(),
        title: data[i].title,
        slug: Slugify(data[i].title, { lower: true }),
        image: imageDetails.path,
        totCount: data[i].totCount,
      }

      newData.push(cleanData)
    }

    const result = await Category.bulkCreate(newData)
    return result
  },

  read: async (request, h) => {
    const results = await Category.findAll({
      attributes: ['id', 'title', 'slug', 'image', 'totCount', 'createdAt'],
      order: [['title', 'DESC']],
    })

    return {
      data: {
        files: results,
      },
      page: 'Categories -- List of available Categories',
      description: 'Enjoy these files',
    }
  },
}
