const { Router } = require('express')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const dishesAdminRoutes = require('./dishesAdmin.routes')

const DishesController = require('../controllers/DishesController')
const dishesController = new DishesController()

const dishesRoutes = Router()

dishesRoutes.use(ensureAuthenticated)

dishesRoutes.use('/admin', dishesAdminRoutes)
dishesRoutes.get('/', dishesController.index)
dishesRoutes.get('/:id', dishesController.show)

module.exports = dishesRoutes