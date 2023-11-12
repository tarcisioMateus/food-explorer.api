class ShowServices {
  constructor({ 
    orderRepository 
  }) {
    this.orderRepository = orderRepository
  }

  async execute({ id }) {
    const order = await this.orderRepository.getById({ id }) 
    
    return order
  }
}

module.exports = ShowServices