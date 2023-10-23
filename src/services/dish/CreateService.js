const AppError = require('../../utils/AppError')

class CreateServices {
    constructor({ 
        dishRepository, ingredientRepository 
    }) {
        this.dishRepository = dishRepository
        this.ingredientRepository = ingredientRepository
    }

    async execute({ 
        name, description, ingredients, price, category, avatar 
    }) {
        inputValidation( name, description, ingredients, price, category, avatar )

        const dish = await this.dishRepository.create({ name, description, price, avatar, category }) 

        if (ingredients.length) {
            await this.ingredientRepository.create({ ingredients, dish_id: dish.id })
        }

        return dish
    }
}

module.exports = CreateServices

function inputValidation ( name, description, ingredients, price, category, avatar  ) {
  if (!name || !description || !ingredients.length || !price || !category || !avatar ) {
    throw new AppError("Fill in all fields.")
  }
  if ( !( /R\$[\t ]*((\d{1,3}\.?)+(,\d{2}))/.test(price) ) ) {
    throw new AppError("Wrong formatted price.")
  }
}