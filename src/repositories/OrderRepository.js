const knex = require('../database/knex')

class OrderRepository {
  async create({ user_id, description }) {
    const [ id ] = await knex('order').insert({ 
      description: JSON.stringify( description ), user_id 
    })
    return { id }
  }

  async getUserOrders({ user_id }) {
    const orders = await knex('order').where({ user_id })
    for (let index in orders) {
      const unreadableDescription = JSON.parse(orders[index].description)
      orders[index].description = await makeDescriptionReadable({ description: unreadableDescription})
    }
    return orders
  }

  async getAllOrders() {
    const orders = await knex('order').orderBy('created_at')
    for (let index in orders) {
      const unreadableDescription = JSON.parse(orders[index].description)
      orders[index].description = await makeDescriptionReadable({ description: unreadableDescription})
    }
    return orders
  }

  async update ({ id, state }) {
    const updated = await knex('order').where({ id })
      .update({ state }, ['state'])

    return updated
  }
}

module.exports = OrderRepository

async function makeDescriptionReadable({ description }) {

  let readableDescription = ''
  for (dish_id in description) {
    const { name } = await knex('dishes').where({ id: dish_id }).first()
    const amount = description[dish_id]
    readableDescription = readableDescription + `${amount} x ${name}, `
  }
  return readableDescription.slice(0, -2)
}