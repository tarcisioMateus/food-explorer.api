class IndexServices {
    constructor({ 
        dishRepository 
    }) {
        this.dishRepository = dishRepository
    }

    async execute() {
        
        const categorizedDishes = await this.dishRepository.groupDishesByCategories() 
        
        return categorizedDishes
    }
}

module.exports = IndexServices