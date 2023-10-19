exports.up = knex => knex.schema.createTable('dishes', table => {
    table.increments('id')
    
    table.text('name').notNullable()
    table.text('price').notNullable()
    table.text('description').notNullable()

    table
        .enum(
            'category', ['dinner', 'lunch', 'breakfast', 'dessert', 'vegetarian', 'barbecue', 'drink'], 
            { useNative: true, enumName: 'category' }
        ).notNullable().default('lunch')

    table.text('avatar')
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable('dishes')
