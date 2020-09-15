const Donation = require('../../controllers/donation')
const donation = {
  path: '/api/donation',
  method: 'POST',
  handler: Donation.create,
}

module.exports = donation
