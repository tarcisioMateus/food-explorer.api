const { Router } = require('express')

const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization')

const OrdersAdminController = require('../controllers/OrdersAdminController')
const ordersAdminController = new OrdersAdminController()

const ordersAdminRoutes = Router()

ordersAdminRoutes.use(verifyUserAuthorization(['admin']))

ordersAdminRoutes.get('/', ordersAdminController.index)
ordersAdminRoutes.put('/', ordersAdminController.update)

module.exports = ordersAdminRoutes