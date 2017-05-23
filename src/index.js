const uuid = require('uuid')
const faker = require('faker')

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

module.exports = {
  init,
  make
}
