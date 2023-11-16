const { Router } = require('express')

const UsersController = require('../controllers/UsersController')
const UsersValidateController = require('../controllers/UsersValidateController')
const usersController = new UsersController()
const usersValidateController = new UsersValidateController()

const usersRoutes = Router()

usersRoutes.post('/', usersController.create)
usersRoutes.get('/validate', usersValidateController.index)

module.exports = usersRoutes