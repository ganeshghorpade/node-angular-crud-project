const connection = require("../database/config/database");

exports.createProduct = async (req, res) => {
    const { name, category } = req.body;

    if (!name || !category) {
        return res.status(400).json({ error: "Please provide name and category" });
    }

    const sql = "INSERT INTO product (name, category) VALUES (?, ?)";
    
    try {
        const [result] = await connection.query(sql, [name, category]);
        res.status(200).json({ message: "Product Added", id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: "Database error", details: err });
    }
};

exports.getProducts = async (req, res) => {
    const sql = `
        SELECT p.name AS productName, c.id AS categoryId, 
               c.name AS categoryName, p.id AS productId
        FROM product p 
        JOIN category c ON p.category = c.id
    `;

    try {
        const [result] = await connection.query(sql);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: "Database error", details: err });
    }
};

exports.updateProduct = async (req, res) => {
    const { name, category } = req.body;
    const { id } = req.params;

    if (!name || !category) {
        return res.status(400).json({ error: "Please provide name and category" });
    }

    const sql = "UPDATE product SET name=?, category=? WHERE id=?";
    
    try {
        await connection.query(sql, [name, category, id]);
        res.status(200).json({ message: "Product Updated" });
    } catch (err) {
        res.status(500).json({ error: "Database error", details: err });
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM product WHERE id=?";

    try {
        await connection.query(sql, [id]);
        res.status(200).json({ message: "Product Deleted" });
    } catch (err) {
        res.status(500).json({ error: "Database error", details: err });
    }
};
