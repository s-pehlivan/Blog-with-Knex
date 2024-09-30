const knex = require("./knex");

const Post = {
  getAll: () => {
    return knex("posts").whereNull("deleted_at");
  },
  getById: (id) => {
    return knex("posts").where({ id }).first();
  },
  create: (post) => {
    return knex("posts").insert(post).returning("*");
  },
  update: (id, post) => {
    return knex("posts").where({ id }).update(post).returning("*");
  },
  delete: () => {
    return knex("posts")
      .where({ id })
      .update({ deleted_at: new Date() })
      .returning("*");
  },
};

module.exports = Post;
