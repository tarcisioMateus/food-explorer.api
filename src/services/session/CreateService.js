const AppError = require('../../utils/AppError')
const authConfig = require("../../configs/auth")

const { compare } = require("bcryptjs")
const { sign } = require("jsonwebtoken")

class CreateServices {

    constructor({ 
        userRepository 
    }) {
        this.userRepository = userRepository
    }

    async execute({ email, password }) {
        const user = await this.userRepository.findByEmail({ email })

        if (!user) throw new AppError('wrong email or password', 401)

        const passwordMatched = await compare(password, user.password)

        if (!passwordMatched) throw new AppError('wrong email or password', 401)

        const { secret, expiresIn } = authConfig.jwt
        const token = sign({ role: user.role }, secret, {
        subject: String(user.id),
        expiresIn
        })

        delete user.password
        return { token, user }
    }
}

module.exports = CreateServices