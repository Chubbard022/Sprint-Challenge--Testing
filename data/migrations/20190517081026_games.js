exports.up = function(knex) {
    return knex.schema.createTable("games", table=>{
       table
          .increments()//primary key ID
       table
          .string("title")//title field
          .notNullable()
      table   
          .string("genre")//genre field
          .notNullable()
      table  
          .integer("releaseYear")//releaseYear field
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("games")
  };
  
  
  // title: 'Pacman', // required
  //   genre: 'Arcade', // required
  //   releaseYear: 1980 // not required