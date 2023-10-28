const AppError = require('../../utils/AppError')

class CreateServices {
    constructor({ 
        dishRepository, ingredientRepository 
    }) {
        this.dishRepository = dishRepository
        this.ingredientRepository = ingredientRepository
    }

    async execute({ 
        name, description, ingredients, price, category 
    }) {
        inputValidation({ name, description, ingredients, price, category })

        const dish = await this.dishRepository.create({ 
          name: name.trim().toLowerCase(), description: description.trim().toLowerCase(), price, category 
        }) 

        if (ingredients.length) {
            await this.ingredientRepository.create({ ingredients, dish_id: dish.id })
        }

        return dish
    }
}

module.exports = CreateServices

function inputValidation ({ name, description, ingredients, price, category }) {
  if (!name || !description || !ingredients.length || !price || !category ) {
    throw new AppError("Fill in all fields.")
  }
  if ( !( /[\t ]*((\d{1,3}\.?)+(,\d{2}))/.test(price) ) ) {
    throw new AppError("Wrong formatted price, it must be like this: 00,00")
  }
}