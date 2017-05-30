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

const createUser = (email, password, firstName, lastName) => Map({
  _id: uuid.v4(),
  email,
  password,
  firstName,
  lastName
})
const sameId = (user, id) => user.get('_id') === id

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
    const users = store.output().get('data')
    res.json(users ? users.toJSON() : [])
  })
  // Get a single user
  router.get('/:id', (req, res) => {
    const user = store.output()
      .get('data')  
      .find(user => sameId(user, req.params.id))
    res.json(user ? user.toJSON() : {})
  })
  // Save a user
  router.post('/', (req, res) => {
    const { email, password, firstName, lastName } = req.body
    const newState = store.getState()
      .update('data', users => users.push(createUser(email, password, firstName, lastName)))
    store.setState(newState)
    res.status(200).end()
  })
  // Delete a user
  router.delete('/delete/:id', (req, res) => {
    const newState = store.getState()
      .update('data', users => users.filter(user => {
        return !sameId(user, req.params.id)
      }))
    store.setState(newState)
    res.status(200).end()
  })

  return router
}

module.exports = {
  init,
  make
}
