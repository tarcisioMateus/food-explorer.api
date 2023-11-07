class ShowServices {
    constructor({ 
        dishRepository, ingredientRepository 
    }) {
        this.dishRepository = dishRepository
        this.ingredientRepository = ingredientRepository
    }

    async execute({ id }) {
        const dish = await this.dishRepository.getById({ id })

        const ingredients = await this.ingredientRepository.getByDishId({ dish_id: dish.id })


        return {
        ...dish,
        ingredients,
        }
    }
}

module.exports = ShowServices