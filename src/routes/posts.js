const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.getAll(req.query);
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

router.delete("/:id", async (req, res) => {
  console.log("req.params.id", req.params.id);
  try {
    const deleted = await Post.delete(req.params.id);

    if (!deleted) {
      res.status(404).json("Böyle bir kayıt bulunamadı.");
    }
    res.json(deleted);
  } catch (err) {
    console.log("err", err);
    res.status(400).json({ message: "Hata oldu. Tekrar deneyiniz." });
  }
});

module.exports = router;
