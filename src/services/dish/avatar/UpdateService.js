const AppError = require("../../../utils/AppError")

class UpdateServices {
    constructor({ 
        dishRepository, diskStorage 
    }) {
        this.dishRepository = dishRepository
        this.diskStorage = diskStorage
    }

    async execute({ 
        id, avatarFileName 
    }) {
        const dish = await this.dishRepository.getById ({ id })

        if (dish.avatar) await this.diskStorage.deleteFile(dish.avatar)

        dish.avatar = await this.diskStorage.saveFile(avatarFileName)
        await this.dishRepository.update ({ id, dish })

        return dish
    }
}

module.exports = UpdateServices