class DeleteServices {
    constructor({ 
        dishRepository, diskStorage 
    }) {
        this.dishRepository = dishRepository
        this.diskStorage = diskStorage
    }

    async execute({ id }) {

        const dish = await this.dishRepository.getById ({ id })

        if (dish.avatar) await this.diskStorage.deleteFile(dish.avatar)
        
        await this.dishRepository.delete({ id })
    }
}

module.exports = DeleteServices