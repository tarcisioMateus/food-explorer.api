const authConfig = require('../configs/auth')
const { verify } = require('jsonwebtoken')
const AppError = require('../utils/AppError')

function ensureAuthenticated (request, response, next) {
    const authHeader = request.headers.authorization

    if (!authHeader) throw new AppError('jwt not informed')
    const [, token] = authHeader.split(' ')

    try {
        const { sub: user_id } = verify(token, authConfig.jwt.secret)

        request.user = {
        id: Number(user_id)
        }
        return next()
        
    } catch (error) {
        throw new AppError('invalid jwt')
    }
}

module.exports = ensureAuthenticated