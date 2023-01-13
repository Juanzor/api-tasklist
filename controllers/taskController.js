import { pool } from "../db.js";

export const getTasks = async (req, res) => {
    try {
        const [result] = await pool.query(
            "SELECT * FROM task ORDER BY createAt ASC"
        );

        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const getTask = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query("SELECT * FROM task WHERE id = ?", [
            id,
        ]);

        if (result.length == 0)
            return res.status(404).json({ message: "Task not found" });

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const createTask = async (req, res) => {
    const { title, description } = req.body;

    try {
        const [result] = await pool.query(
            "INSERT INTO task (title, description) VALUES (?, ?)",
            [title, description]
        );

        return res.json({
            id: result.insertId,
            title: title,
            description: description,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const updateTask = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("UPDATE task SET ? WHERE id = ?", [
            req.body,
            id,
        ]);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("DELETE FROM task WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
        }
};
