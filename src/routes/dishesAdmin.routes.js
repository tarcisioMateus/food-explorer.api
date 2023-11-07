const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization')

const DishesController = require('../controllers/DishesController')
const DishesAvatarController = require('../controllers/DishesAvatarController')
const dishesController = new DishesController()
const dishesAvatarController = new DishesAvatarController()


const upload = multer(uploadConfig.MULTER)
const dishesAdminRoutes = Router()

dishesAdminRoutes.use(verifyUserAuthorization(['admin']))

dishesAdminRoutes.post('/', dishesController.create)
dishesAdminRoutes.delete('/:id', dishesController.delete)
dishesAdminRoutes.put('/:id', dishesController.update)

dishesAdminRoutes.patch('/avatar/:dish_id', upload.single("avatar"), dishesAvatarController.update)

module.exports = dishesAdminRoutes