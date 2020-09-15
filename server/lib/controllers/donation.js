const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

module.exports = {
  create: async (request, h) => {
    const { token, email, name, address, city, amount, items } = request.payload
    await stripe.customers
      .create({
        email,
      })
      .then(function (customer) {
        return stripe.customer.createSource(customer.id, {
          source: token,
        })
      })
      .then(function (source) {
        return stripe.charges.create({
          amount,
          currency: 'usd',
          receipt_email: email,
          customer: source.customer,
        })
      })
      .then(function (charge) {
        let content = ''
        items.forEach((item) => {
          content += `${item.title} x ${item.conut},`
        })
        const params = {
          type_slug: 'donations',
          title: name,
          content,
          metafields: [
            {
              key: 'Address',
              type: 'text',
              value: address,
            },
            {
              key: 'City',
              type: 'text',
              value: city,
            },
          ],
        }
        Request.addForms(params)
          .then((data) => {
            // eslint-disable-next-line
            console.log(data)
            Response.json({ success: true })
          })
          .catch((err) => {
            // eslint-disable-next-line
            console.log(err)
          })
      })
      .then((customer) => {
        return stripe.invoiceItems
          .create({
            customer: token,
            amount,
            currency: 'usd',
            description: 'One-time donation',
          })
          .then((invoiceItem) => {
            return stripe.invoices
              .create({
                collection_method: 'send_invoice',
                customer: invoiceItem.customer,
              })
              .then((invoice) => {
                // New invoice created on a new customer
                // eslint-disable-next-line
                console.log(invoice)
              })
              .catch((err) => {
                // eslint-disable-next-line
                console.log(err)
              })
          })
      })
  },
}
