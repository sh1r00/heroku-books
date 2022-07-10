'use strict'

const consola = require('consola')
const Hapi = require('@hapi/hapi')
const HapiNuxt = require('@nuxtjs/hapi')
const HapiAuthJWT = require('hapi-auth-jwt2')
// const Bcrypt = require('bcrypt')
const Routes = require('./lib/routes')
const Models = require('./lib/models')
const { decodeHeader } = require('./lib/middleware/verifyAuth.js')

async function start() {
  const server = new Hapi.Server({
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || '3000',
    routes: { cors: true },
  })

  await server.register([
    {
      plugin: HapiNuxt,
    },
    {
      plugin: HapiAuthJWT,
    },
  ])

  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_SECRET,
    validate: decodeHeader,
    verifyOptions: {
      ignoreExpirations: true,
      algorithms: ['HS256'],
    },
  })

  await server.route(Routes)

  await Models.sequelize.sync()

  await server.start()

  consola.ready({
    message: `Server running at: ${server.info.uri}`,
    badge: true,
  })
}

process.on('unhandledRejection', (error) => {
  consola.error(error)
  process.exit(1)
})

start()
