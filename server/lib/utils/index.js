'ust strict'
const fs = require('fs')
const uuid = require('uuid')

const imageFilter = function (fileName) {
  // accept image only

  if (!fileName.match(/\.(jpg|jpeg|png|gif)$/)) {
    return false
  }

  return true
}
const uploader = function (file, options) {
  if (!file) throw new Error('no file(s')
  return Array.isArray(file)
    ? _filesHandler(file, options)
    : _fileHandler(file, options)
}

const _filesHandler = function (files, options) {
  if (!files || !Array.isArray(files)) throw new Error('no files')

  const promises = files.map((x) => _fileHandler(x, options))
  return Promise.all(promises)
}

const _fileHandler = function (file, options) {
  if (!file) throw new Error('no file')

  // apply filter if exists

  if (options.fileFilter && !options.fileFilter(file.hapi.filename)) {
    throw new Error('type not allowed')
  }

  const filename = uuid.v1()
  const path = `${options.dest}${filename}`
  const fileStream = fs.createWriteStream(path)

  return new Promise((resolve, reject) => {
    file.on('error', function (err) {
      reject(err)
    })

    file.pipe(fileStream)

    file.on('end', function () {
      const fileDetails = {
        fieldname: file.hapi.filename,
        filename,
        mimetype: file.hapi.headers['content-type'],
        destintaion: `${options.dest}`,
        path,
        size: fs.statSync(path).size,
      }

      resolve(fileDetails)
    })
  })
}

module.exports = [imageFilter, uploader]
