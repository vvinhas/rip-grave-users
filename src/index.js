const uuid = require('uuid')

const make = (router, store) => {
  // Get all users
  router.get('/all', (req, res) => {
    const data = store.getDeep('users', 'data')
    res.json(data)
  })
  // Save a user
  router.post('/', (req, res) => {
    const { email, name } = req.body
    const data = store.getDeep('users', 'data')
    store.setDeep('users', 'data', [
      ...data,
      {
        _id: uuid.v4(),
        email,
        name
      }
    ])
    
    res.status(200).end()
  })

  return router
}

const init = (fake) => {
  return {
    data: []
  }
}

module.exports = {
  init,
  make
}
