class IndexServices {
    constructor({ 
        dishRepository 
    }) {
        this.dishRepository = dishRepository
    }

    async execute({ 
        name, ingredients 
    }) {
        
        let dishes
        if (ingredients) {
            dishes = await this.dishRepository.getDishesByIngredients({ 
                ingredients: ingredients.split(',').map(ingredient => ingredient.trim().toLowerCase()) 
            })
        } else {
            dishes = await this.dishRepository.getDishesByname({ name }) 
        }

        return dishes
    }
}

module.exports = IndexServices