const express = require("express");
const router = express.Router();
const db = require("../database/config/database");


router.get("/", (req, res) => {
  db.query("SELECT * FROM category", (err, result) => {
    if (err) return res.status(500).json(err);
    return res.json(result);
  });
});

router.post("/", (req, res) => {
  const { name } = req.body;
  db.query("INSERT INTO category (name) VALUES (?)", [name], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Category Add", id: result.insertId });
  });
});

router.put("/:id", (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  db.query("UPDATE category SET name=? WHERE id=?", [name, id], (err) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Category Update" });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM category WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Category Delete" });
  });
});

module.exports = router;
