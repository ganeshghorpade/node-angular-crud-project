const express = require("express");
const router = express.Router();
const db = require("../database/config/database");



router.get("/", (req, res) => {
  db.query(
    `SELECT p.name AS productName, c.id AS categoryId, c.name AS categoryName ,p.id AS productId
     FROM product p 
     JOIN category c ON p.category = c.id`,  
    (err, result) => {
      if (err) return res.status(500).json({ error: "Database error", details: err });
      res.json(result);
    }
  );
});

router.post("/", (req, res) => {
  const { name, category } = req.body;

  db.query("INSERT INTO product (name, category) VALUES (?, ?)", [name, category], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    res.json({ message: "Product Added", id: result.insertId });
  });
});

router.put("/:id", (req, res) => {
  const { name, category } = req.body;
  const { id } = req.params;

  db.query("UPDATE product SET name=?, categoryId=? WHERE id=?", [name, category, id], (err) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    res.json({ message: "Product Updated" });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM product WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });
    res.json({ message: "Product Deleted" });
  });
});

module.exports = router;
