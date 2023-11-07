const authConfig = require('../configs/auth')
const { verify } = require('jsonwebtoken')
const AppError = require('../utils/AppError')

function ensureAuthenticated (request, response, next) {
    const { cookie } = request.headers

    if (!cookie) throw new AppError('jwt not informed', 401)
    const [, token] = cookie.split('token=')

    try {
        const { role, sub: user_id } = verify(token, authConfig.jwt.secret)

        request.user = {
        id: Number(user_id),
        role
        }
        return next()
        
    } catch (error) {
        throw new AppError('invalid jwt', 401)
    }
}

module.exports = ensureAuthenticated