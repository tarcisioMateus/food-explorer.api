const OrderRepository = require('../repositories/OrderRepository')

const CreateServices = require('../services/order/user/CreateService')
const IndexServices = require('../services/order/user/IndexService')

class OrdersController {

  async create (request, response) {
    const user_id = request.user.id
    const { description } = request.body

    const createServices = new CreateServices({ 
      orderRepository: new OrderRepository()
    })
    const order = await createServices.execute({ user_id, description })

    return response.status(201).json(order)
  }

  async index (request, response) {
    const user_id = request.user.id

    const indexServices = new IndexServices({
      orderRepository: new OrderRepository()
    })
    const orders = await indexServices.execute({ user_id })

    return response.status(200).json(orders)
}
}

module.exports = OrdersController