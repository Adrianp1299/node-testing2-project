/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex('characters').truncate()
   .then(function () {
    return knex('characters').insert([
      {character_name: "Jeff", character_class:"wizard"},
      {character_name: "Mitchel", character_class:"paladin"},
      {character_name: "Jessica", character_class:"cleric"},
      {character_name: "Fred", character_class:"barbarian"},
    ])
   })
};
