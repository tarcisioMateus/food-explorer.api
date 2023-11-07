const { Router } = require('express')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const OrdersController = require('../controllers/OrdersController')
const ordersController = new OrdersController()

const ordersRoutes = Router()

ordersRoutes.use(ensureAuthenticated)

ordersRoutes.post('/', ordersController.create)

module.exports = ordersRoutes