const knex = require('../database/knex')

class IngredientRepository {
  async create({ Ingredients, dish_id }) {
    const IngredientsInfo = Ingredients.map(ingredient => {
      return {
        name: ingredient.trim(),
        dish_id,
      }
    })
    await knex('ingredients').insert(IngredientsInfo)
  }

  async getByDishId({ dish_id }) {
    const ingredients = await knex('ingredients').where({dish_id}).orderBy("name")
    return ingredients
  }

}

module.exports = IngredientRepository