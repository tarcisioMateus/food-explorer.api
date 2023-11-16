const UserRepository = require('../repositories/UserRepository')

const CreateServices = require('../services/session/CreateService')

class SessionsController {

  async create(request, response) {
    const { email, password } = request.body

    const createServices = new CreateServices({
      userRepository: new UserRepository()
    })
    const { token, user } = await createServices.execute({ email, password })

    response.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 1 * 60 * 1000
    })
    return response.status(201).json({user})
  }
}

module.exports = SessionsController