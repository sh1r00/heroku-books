const { verifyJWT } = require('../utils')

const decodeHeader = (req, res, next) => {
  let token =
    req.headers['x-access-token'] || req.headers.authorization || req.body.token
  if (!token) {
    return Response.sendErrorResponse({
      res,
      message: 'No token provided',
      statusCode: 401,
    })
  }

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length)
    if (!token || token === '')
      Response.sendErrorResponse({
        res,
        message: 'No token provided',
        statusCode: 401,
      })
  }

  // call the verifyJWT method to verify the token is valid
  const decoded = verifyJWT(token)
  if (!decoded)
    Response.sendErrorResponse({
      res,
      message: 'invalid signature',
      statusCode: 403,
    })
  // attach the decoded token to the res.user object
  if (decoded) res.user = decoded
  res.token = token
  return next()
}

module.exports = { decodeHeader }
