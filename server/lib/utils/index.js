'ust strict'
const fs = require('fs')
const uuid = require('uuid')
const Boom = require('@hapi/boom')
const consola = require('consola')
const Models = require('../models')

const docxFilter = function (fileName) {
  // accept some text files only
  const filename = fileName.toLowerCase()
  if (!filename.match(/\.(docx|docm|dot|dotm|dotx|doc|pdf|rtf|txt)$/)) {
    return false
  }

  return true
}

const fileRemover = function (filePath) {
  fs.unlink(filePath, function (err) {
    if (err) {
      // eslint-disable-next-line
      console.log('remove ', err)
      return false
    }
    return true
  })
}

const imageFilter = function (fileName) {
  // accept image only

  const filename = fileName.toLowerCase()
  if (!filename.match(/\.(jpg|jpeg|png|gif)$/)) {
    return false
  }

  return true
}

const tempFile = function (file, path, extention) {
  return new Promise((resolve, reject) => {
    const data = file
    const filename = uuid.v1()
    const tempFile = `${path}/${filename}.${extention}`
    fs.writeFile(tempFile, data, (err) => {
      if (err) {
        reject(err)
      }
      const filePath = `temp/${filename}.${extention}`
      resolve(filePath)
    })
  })
}

const uploader = function (file, options) {
  if (!file) throw Boom.badRequest('no file(s')
  return Array.isArray(file)
    ? _filesHandler(file, options)
    : _fileHandler(file, options)
}

const _filesHandler = function (files, options) {
  if (!files || !Array.isArray(files)) throw Boom.badRequest('no files')

  const promises = files.map((x) => _fileHandler(x, options))
  return Promise.all(promises)
}

const _fileHandler = function (file, options) {
  if (!file) throw Boom.badRequest('no file')

  // apply filter if exists

  if (options.fileFilter && !options.fileFilter(file.hapi.filename)) {
    throw Boom.unsupportedMediaType('Image type not allowed')
  }

  const filename = uuid.v1()
  const mimetype = file.hapi.headers['content-type']
  const mimeArray = mimetype.split('/')
  const newMime = mimeArray[1]
  const path = `${options.dest}${filename}.${newMime}`

  return new Promise((resolve, reject) => {
    const data = file._data
    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err)
      }
      const fileDetails = {
        fieldname: file.hapi.filename,
        filename,
        mimetype: file.hapi.headers['content-type'],
        destintaion: `${options.dest}`,
        path: `uploads/${filename}.${newMime}`,
        size: fs.statSync(`${path}`).size,
      }
      resolve(fileDetails)
    })
  })
}

const validateFunc = (request, session) => {
  consola.info('Reporter: validating ', session.id)

  const account = Models.User.findOne({
    where: {
      id: session.id,
    },
  })

  if (!account) {
    Boom.badRequest('There is no user with the given email adress')
    return { credentials: null, valid: false }
  }

  return {
    valid: true,
    credentials: {
      id: account.id,
      name: account.name,
      email: account.email,
    },
  }
}

module.exports = {
  docxFilter,
  fileRemover,
  imageFilter,
  tempFile,
  uploader,
  validateFunc,
}
