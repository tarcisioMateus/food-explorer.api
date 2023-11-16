const AppError = require('../../../utils/AppError')

class IndexServices {
  constructor ({ userRepository }) {
    this.userRepository = userRepository
  }

  async execute ({ user_id }) {
    const user = await this.userRepository.findById({ id: user_id })

    if (!user) {
      throw new AppError("session inspired", 401)
    }
    return
  }
}

module.exports = IndexServices