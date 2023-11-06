class IndexServices {
  constructor({ 
      orderRepository
  }) {
      this.orderRepository = orderRepository
  }

  async execute({ user_id }) {
      const user_orders = await this.orderRepository.getById({ user_id })

      return user_orders
  }
}

module.exports = IndexServices