const AppError = require('../../utils/AppError')

class UpdateServices {
  constructor ({
    orderRepository,
  }) {
    this.orderRepository = orderRepository
  }

  async execute ({ 
    id, state
  }) {
    const updated = await this.orderRepository.update({ id, state }) 

    return updated
  }
}

module.exports = UpdateServices
