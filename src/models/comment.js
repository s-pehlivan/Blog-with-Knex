const knex = require("./knex");

const Comment = {
  getAll: (queryObj) => {
    const { post, commenter } = queryObj;
    const query = knex("comments");

    if (post) {
      query.where({ post_id: post });
    }

    if (commenter) {
      query.where({ commenter_name: commenter });
    }

    return query;
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
