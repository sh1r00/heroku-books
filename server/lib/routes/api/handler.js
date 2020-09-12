const Handler = {
  authenticate: {
    auth: 'sessions',
    handler: (request, h) => {
      return 'Auth passed'
    },
  },
}

module.exports = Handler
