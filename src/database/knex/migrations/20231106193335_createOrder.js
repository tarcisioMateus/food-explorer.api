exports.up = knex => knex.schema.createTable('order', table => {
  table.increments('id')

  table.integer('user_id').references('id').inTable('users')
  table.text('description').notNullable()

  table
    .enum( 'state', ['pending', 'preparing', 'delivered'], { useNative: true, enumName: 'state' })
    .notNullable().default('pending')

  table.timestamp('created_at').default(knex.fn.now())

})


exports.down = knex => knex.schema.dropTable('order')
