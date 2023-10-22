const UserRepository = require('../repositories/UserRepository')
const CreateServices = require('../services/user/CreateService')

class UsersController {
    async create (request, response) {
        const { name, email, password } = request.body

        const userRepository = new UserRepository()
        const createServices = new CreateServices({userRepository})
        await createServices.execute({ name, email, password })

        return response.status(201).json()
    }
}

module.exports = UsersController