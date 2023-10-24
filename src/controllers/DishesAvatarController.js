const DiskStorage = require("../providers/DiskStorage")
const DishRepository = require('../repositories/DishRepository')

const UpdateServices = require('../services/dish/avatar/UpdateService')

class DishesAvatarController { 

    async update(request, response) {
        const { dish_id } = request.params 
        const avatarFileName = request.file.filename
    
        const updateServices = new UpdateServices ({
            dishRepository: new DishRepository(), 
            diskStorage: new DiskStorage()
        })
        const dish = await updateServices.execute({ id: dish_id, avatarFileName })

        return response.status(200).json(dish)
    }
}

module.exports = DishesAvatarController