const { Router } = require('express')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const ordersAdminRoutes = require('./ordersAdmin.routes')

const OrdersController = require('../controllers/OrdersController')
const ordersController = new OrdersController()

const ordersRoutes = Router()

ordersRoutes.use(ensureAuthenticated)

ordersRoutes.use('/admin', ordersAdminRoutes)
ordersRoutes.post('/', ordersController.create)
ordersRoutes.get('/', ordersController.index)
ordersRoutes.get('/:id', ordersController.show)

module.exports = ordersRoutes