const OrderRepository = require('../repositories/OrderRepository')

const UpdateServices = require('../services/order/admin/UpdateService')
const IndexServices = require('../services/order/admin/IndexService')

class OrdersAdminController {

  async update (request, response) {
    const { id, state } = request.body

    const updateServices = new UpdateServices({ 
      orderRepository: new OrderRepository()
    })
    const order = await updateServices.execute({ id, state })

    return response.status(201).json(order)
  }

  async index (request, response) {
    const indexServices = new IndexServices({
      orderRepository: new OrderRepository()
    })
    const orders = await indexServices.execute()

    return response.status(200).json(orders)
  }
}

module.exports = OrdersAdminController