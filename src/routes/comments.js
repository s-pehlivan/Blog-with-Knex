const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.getAll(req.query);
    res.json(comments);
  } catch {
    res.status(400).json({ message: "Hata oldu. Tekrar deneyiniz." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.getById(req.params.id);
    if (!comment) {
      res.status(404).json({ message: "Böyle bir kayıt bulunamadı." });
    }
    res.json(comment);
  } catch {
    res.status(400).json({ message: "Hata oldu. Tekrar deneyiniz." });
  }
});

router.post("/", async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch {
    res.status(400).json({ message: "Hata oldu. Tekrar deneyiniz." });
  }
});

router.post("/:id", async (req, res) => {
  try {
    const updated = await Comment.update(req.params.id, req.body);
    res.json(updated);
  } catch {
    res.status(400).json({ message: "Hata oldu. Tekrar deneyiniz." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Comment.delete(req.params.id);
    res.json(deleted);
  } catch (err) {
    console.log("err", err);
    res.status(400).json({ message: "Hata oldu. Tekrar deneyiniz." });
  }
});

module.exports = router;
