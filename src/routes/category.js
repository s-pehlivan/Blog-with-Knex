const express = require("express");
const router = express.Router();
const Category = require("../models/category");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.json(categories);
  } catch {
    res.status(400).json({ message: "Hata oldu. Tekrar deneyiniz." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.getById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Böyle bir kategori bulunamadı" });
    }
    res.json(category);
  } catch {
    res.status(400).json({ message: "Bir hata oldu, tekrar deneyiniz." });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch {
    res.status(400).json({ message: "Bir hata oldu, tekrar deneyiniz." });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updated = await Category.update(req.params.id, req.body);
    res.json(updated);
  } catch {
    res.status(400).json({ message: "Bir hata oldu, tekrar deneyiniz." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Category.delete(req.params.id);
    res.json(deleted);
  } catch {
    res.status(400).json({ message: "Bir hata oldu, tekrar deneyiniz." });
  }
});

module.exports = router;
