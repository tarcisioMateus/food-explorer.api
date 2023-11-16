const UserRepository = require('../repositories/UserRepository')
const IndexService = require('../services/user/validate/IndexService')

class UsersValidateController {
  async index (request, response) {
    const { id } = request.user

    const userRepository = new UserRepository()
    const indexService = new IndexService({userRepository})
    await indexService.execute({ user_id: id })

    return response.status(200).json()
  }
}

module.exports = UsersValidateController