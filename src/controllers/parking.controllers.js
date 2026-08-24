import pool from '../db.js';

export const getParking = async (req, res) => {
    const { rows } = await pool.query('SELECT id, name, address, total_spaces, created_at, updated_at FROM parking_lots');
    return res.json(rows);
};

export const getParkingById = async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT id, name, address, total_spaces, created_at, updated_at FROM parking_lots WHERE id = $1', [id]);
    return res.json(rows);
};

export const createParking = async (req, res) => {
    const { name, address, total_spaces } = req.body;
    const { rows } = await pool.query(' INSERT INTO parking_lots VALUES ($1, $2, $3) RETURNING *', [name, address, total_spaces]);
    return res.json(rows);
};

export const deleteParking = async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query('DELETE FROM parking_lots WHERE id = $1 RETURNING *', [id]);
    return res.json(rows);
};

export const updateParking = async (req, res) => {
    const { id } = req.params;
    const { name, address, total_spaces } = req.body;
    const { rows } = await pool.query('UPDATE parking_lots SET name = $1, address = $2, total_spaces = $3, updated_at = NOW() WHERE id = $4 RETURNING *', [name, address, total_spaces, id]);
    return res.json(rows);
};