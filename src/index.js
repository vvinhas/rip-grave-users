const uuid = require('uuid')

const make = (router, store) => {
  // Get all users
  router.get('/all', (req, res) => {
    res.json(store.data)
  })
  // Save a user
  router.post('/', (req, res) => {
    const { email, name } = req.body
    store.data = [
      ...store.data,
      {
        _id: uuid.v4(),
        email,
        name
      }
    ]
    res.status(200).end()
  })

  return router
}

const init = (fake) => {
  return {
    data: [{
      _id: 1,
      email: 'rip@admin.localhost',
      name: 'RIP Admin'
    }]
  }
}

module.exports = {
  init,
  make
}
