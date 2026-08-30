import pool from "../db.js";

export const findAllParkingSpacesService = async () => {
  const { rows } = await pool.query(
    "SELECT id AS space_id, parking_lot_id AS parking_id, space_number, type AS space_type, status FROM parking_spaces",
  );
  return rows;
};

export const findParkingSpaceByIdService = async (id) => {
    const { rows } = await pool.query(
        `SELECT 
            id AS space_id,
            parking_lot_id AS parking_id,
            space_number,
            type AS space_type,
            status
         FROM parking_spaces
         WHERE id = $1`,
        [id]
    );

    return rows[0];
};

export const createParkingSpaceService = async (
    parking_lot_id,
    space_number,
    type
) => {

    // Check if the space already exists
    const existingSpace = await pool.query(
        `SELECT id
         FROM parking_spaces
         WHERE parking_lot_id = $1
         AND space_number = $2`,
        [parking_lot_id, space_number]
    );

    if (existingSpace.rows.length > 0) {
        return {
            error: 'A parking space with this number already exists in this parking lot'
        };
    }

    const { rows } = await pool.query(
        `INSERT INTO parking_spaces
        (parking_lot_id, space_number, type)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [parking_lot_id, space_number, type]
    );

    return {
        parkingSpace: rows[0]
    };
};

export const deleteParkingSpaceService = async (id) => {
    const { rows } = await pool.query(
        `DELETE FROM parking_spaces
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    if (rows.length === 0) {
        return null;
    }

    return rows[0];
};

export const updateParkingSpaceService = async (
    id,
    parking_lot_id,
    space_number,
    type,
    status
) => {
    const { rows } = await pool.query(
        `UPDATE parking_spaces
         SET parking_lot_id = $2,
             space_number = $3,
             type = $4,
             status = $5,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $1
         RETURNING *`,
        [id, parking_lot_id, space_number, type, status]
    );

    return rows[0];
};

export const updateParkingSpaceStatusService = async (id, status) => {

    const { rows } = await pool.query(
        `UPDATE parking_spaces
         SET status = $1,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $2
         RETURNING *`,
        [status, id]
    );

    if (rows.length === 0) {
        return null;
    }

    return rows[0];
};