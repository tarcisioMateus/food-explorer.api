const { Router } = require('express')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const UsersController = require('../controllers/UsersController')
const UsersValidateController = require('../controllers/UsersValidateController')
const usersController = new UsersController()
const usersValidateController = new UsersValidateController()

const usersRoutes = Router()

usersRoutes.post('/', usersController.create)
usersRoutes.get('/validated', ensureAuthenticated, usersValidateController.index)

module.exports = usersRoutes