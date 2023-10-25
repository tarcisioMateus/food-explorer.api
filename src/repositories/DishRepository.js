const knex = require('../database/knex')

class DishRepository {
    async create({ name, description, price, category }) {
        const [ id ] = await knex('dishes').insert({ 
            name, description, price, category 
        })
        return { id }
    }

    async getById({ id }) {
        const dish = await knex('dishes').where({ id }).first()
        return dish
    }

    async getDishesByname({ name }) {
        const dishes = knex('dishes').whereLike('name', `%${name}%`).orderBy('dishes.name')
        return dishes
    }

    async getDishesByIngredients({ ingredients }) {
        const dishes = await knex('ingredients').select([
            'dishes.id', 'dishes.name', 'dishes.avatar',
            'dishes.description', 'dishes.price'
        ])
        .whereIn('ingredients.name', ingredients)
        .innerJoin('dishes', 'dishes.id', 'ingredients.dish_id')
        .groupBy('dishes.id')
        .orderBy('dishes.name')

        return dishes
    }

    async groupDishesByCategories( 
        categories = ['dinner', 'lunch', 'breakfast', 'dessert', 'vegetarian', 'barbecue', 'drink'] 
    ) {
        const dishes = await Promise.all( 
            categories.map( async (category) => {
                return ({ [category]: await knex('dishes').where({category}).orderBy('dishes.name') })
            })
        )
        return dishes
    }

    async delete({ id }) {
        await knex('dishes').where({ id }).delete()
    }

    async update ({ id, dish }) {
        const updated = await knex('dishes').where({ id }).update({ 
            name: dish.name, description: dish.description, 
            avatar: dish.avatar, price: dish.price, 
            category: dish.category, updated_at: knex.fn.now() 
        }, ['name', 'description', 'avatar', 'price', 'category'])

        return updated
    }
}

module.exports = DishRepository