'use strict'

const consola = require('consola')
const Hapi = require('@hapi/hapi')
const HapiNuxt = require('@nuxtjs/hapi')
// const Bcrypt = require('bcrypt')
const Routes = require('./lib/routes')
const Models = require('./lib/models')
const { validateFunc } = require('./lib/utils')

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
      plugin: require('@hapi/cookie'),
    },
  ])

  server.auth.strategy('session', 'cookie', {
    cookie: {
      name: 'sid-example',
      password: 'password-should-be-32-characters',
      isSecure: false,
      ttl: 3 * 60 * 60 * 1000,
      clearInvalid: true,
    },
    validateFunc,
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
