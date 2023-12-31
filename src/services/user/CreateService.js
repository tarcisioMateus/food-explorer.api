const AppError = require('../../utils/AppError')
const { hash } = require('bcryptjs')

class CreateServices {
    constructor ({ userRepository }) {
        this.userRepository = userRepository
    }

    async execute ({ name, email, password }) {
        const userWithEmail = await this.userRepository.findByEmail({ email })

        if (userWithEmail) {
            throw new AppError("Email unavailable! ")
        }

        const encryptedPassword = await hash(password, 8)

        const user = await this.userRepository.create({ name, email, password: encryptedPassword }) 

        return user
    }
}

module.exports = CreateServices