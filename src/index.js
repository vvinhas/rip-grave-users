const uuid = require('uuid')
const faker = require('faker')
const { Map } = require('immutable')

const generateFakeUser = () => ({
  _id: faker.random.uuid(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
})

const init = (fake) => {
  let data = []

  while (data.length < fake) {
    data.push(generateFakeUser())
  }

  return { data }
}

const make = (router, store) => {
  // Get all users
  router.get('/all', (req, res) => {
    res.json(store.getState().get('data').toJSON())
  })
  // Save a user
  router.post('/', (req, res) => {
    const { email, name } = req.body
    const newState = store.getState()
      .update('data', users => users.push(Map({
        _id: uuid.v4(),
        email,
        name
      })))
    store.updateState(newState)
    res.status(200).end()
  })

  return router
}

module.exports = {
  init,
  make
}
