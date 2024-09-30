const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.getAll();
    res.json(posts);
  } catch {
    res.status(400).json({ message: "Hata oldu. Tekrar deneyiniz." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.getById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Böyle bir post bulunamadı." });
    }
    res.json(post);
  } catch (err) {
    console.log("err", err);
    res.status(400).json({ message: "Hata oldu. Tekrar deneyiniz." });
  }
});

//CREATE
router.post("/", async (req, res) => {
  try {
    const posts = await Post.create(req.body);
    res.json(posts);
  } catch (err) {
    console.log("err", err);
    res.status(400).json({ message: "Hata oldu. Tekrar deneyiniz." });
  }
});

//UPDATE
router.post("/:id", async (req, res) => {
  try {
    const posts = await Post.update(req.params.id, req.body);
    res.json(posts);
  } catch (err) {
    console.log("err", err);
    res.status(400).json({ message: "Hata oldu. Tekrar deneyiniz." });
  }
});

router.delete("/", async (req, res) => {
  try {
    const posts = await Post.getAll();
    res.json(categories);
  } catch {
    res.status(400).json({ message: "Hata oldu. Tekrar deneyiniz." });
  }
});

module.exports = router;
