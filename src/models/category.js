const knex = require("./knex");
const { SHOW_DELETED } = require("../const");

const Category = {
  getAll: (query) => {
    const { showDeleted } = query;
    console.log("showDeleted", showDeleted);
    if (showDeleted === SHOW_DELETED.TRUE) {
      console.log("showDeleted === true");
      return knex("categories");
    } else if (showDeleted === SHOW_DELETED.ONLY_DELETED) {
      console.log("showDeleted === onlydeleted");
      return knex("categories").whereNotNull("deleted_at");
    } else {
      return knex("categories").whereNull("deleted_at");
    }
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
