const connection = require("../database/config/database");

exports.createCategory = async (req, res) => {    
    const { name } = req.body;
    
    if (!name) {
        return res.status(400).json({ error: "Please provide name" });
    }

    const sql = "INSERT INTO category (name) VALUES (?)";

    try {
        const [result] = await connection.query(sql, [name]);
        res.status(200).json({ message: "Category Added", id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: "Database error", details: err });
    }
};

exports.getCategories = async (req, res) => {
    const sql = "SELECT * FROM category";

    try {
        const [result] = await connection.query(sql);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: "Database error", details: err });
    }
};

exports.updateCategory = async (req, res) => {    
    const { name } = req.body;
    const { id } = req.params;

    if (!name) {
        return res.status(400).json({ error: "Please provide name" });
    }

    const sql = "UPDATE category SET name=? WHERE id=?";

    try {
        await connection.query(sql, [name, id]);
        res.status(200).json({ message: "Category Updated" });
    } catch (err) {
        res.status(500).json({ error: "Database error", details: err });
    }
};

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM category WHERE id=?";

    try {
        await connection.query(sql, [id]);
        res.status(200).json({ message: "Category Deleted" });
    } catch (err) {
        res.status(500).json({ error: "Database error", details: err });
    }
};
