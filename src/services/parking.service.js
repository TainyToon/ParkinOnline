import pool from "../db.js";
export const findAllParkings = async () => {
  const { rows } = await pool.query(`
        SELECT
            id,
            name,
            address,
            total_spaces
        FROM parking_lots
    `);

  return rows;
};

export const findParkingById = async (id) => {
  const { rows } = await pool.query(
    `SELECT id, name, address, total_spaces
         FROM parking_lots
         WHERE id = $1`,
    [id],
  );

  return rows[0];
};

export const createParkingService = async (name, address, total_spaces) => {
  if (!name || !name.trim()) {
    return {
      error: "Parking name is required",
    };
  }

  // Validate total spaces
  if (!Number.isInteger(total_spaces) || total_spaces <= 0) {
    return {
      error: "Total spaces must be a positive integer",
    };
  }

  const { rows } = await pool.query(
    `INSERT INTO parking_lots
        (name, address, total_spaces)
        VALUES ($1, $2, $3)
        RETURNING *`,
    [name, address, total_spaces],
  );

  return {
    parking: rows[0],
  };
};

export const deletedParkingService = async (id) => {
  const { rows } = await pool.query(
    "DELETE FROM parking_lots WHERE id = $1 RETURNING *",
    [id],
  );
  if (rows.length === 0) {
    return null;
  }
  return rows[0];
};

export const updatedParkingService = async (
  id,
  name,
  address,
  total_spaces,
) => {
  const { rows } = await pool.query(
    `UPDATE parking_lots
         SET name = $1,
             address = $2,
             total_spaces = $3,
             updated_at = NOW()
         WHERE id = $4
         RETURNING *`,
    [name, address, total_spaces, id],
  );

  if (rows.length === 0) {
    return null;
  }

  return rows[0];
};
