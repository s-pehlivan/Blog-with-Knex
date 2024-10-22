const knex = require("./knex");

const Category = {
  getAll: () => {
    return knex("categories").where("deleted_at");
  },
  getById: (id) => {
    return knex("categories").where({ id }).first();
  },
  create: (category) => {
    return knex("categories").insert(category).returning("*");
    // After it is inserted, the data is returned to the user.
    // '*' selector returns everything.
  },
  update: (id, category) => {
    return knex("categories").where({ id }).update(category).returning("*");
  },
  delete: (id) => {
    return knex("categories")
      .where({ id })
      .update({ deleted_at: new Date() })
      .returning("*");
  },
};

module.exports = Category;
