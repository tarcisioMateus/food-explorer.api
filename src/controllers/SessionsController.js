const UserRepository = require('../repositories/UserRepository')

const CreateServices = require('../services/session/CreateService')

class SessionsController {

  async create(request, response) {
    const { email, password } = request.body

    const createServices = new CreateServices({
      userRepository: new UserRepository()
    })
    const data = await createServices.execute({ email, password })

    return response.json(data)
  }
}

module.exports = SessionsController