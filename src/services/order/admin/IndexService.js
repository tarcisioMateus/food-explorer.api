class IndexServices {
  constructor({ 
      orderRepository
  }) {
      this.orderRepository = orderRepository
  }

  async execute() {
      const all_orders = await this.orderRepository.getAllOrders()

      return all_orders
  }
}

module.exports = IndexServices