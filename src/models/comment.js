const knex = require("./knex");

const Comment = {
  getAll: () => {
    return knex("comments").whereNull("deleted_at");
  },
  getById: (id) => {
    return knex("comments").where({ id }).first();
  },
  create: (comment) => {
    return knex("comments").insert(comment).returning("*");
  },
  update: (id, comment) => {
    return knex("comments").where({ id }).update(comment).returning("*");
  },
  delete: (id) => {
    return knex("comments")
      .where({ id })
      .update({ deleted_at: new Date() })
      .returning("*");
  },
};

module.exports = Comment;
