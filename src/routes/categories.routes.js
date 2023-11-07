const { Router } = require('express')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const CategoriesController = require('../controllers/CategoriesController')
const categoriesController = new CategoriesController()

const categoriesRoutes = Router()

categoriesRoutes.get('/', ensureAuthenticated, categoriesController.index)

module.exports = categoriesRoutes