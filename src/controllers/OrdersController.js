const OrderRepository = require('../repositories/OrderRepository')

const CreateServices = require('../services/order/user/CreateService')

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

}

module.exports = OrdersController