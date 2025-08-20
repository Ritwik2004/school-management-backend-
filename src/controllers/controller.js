


import sql from "../database/db.js";
import { validationResult } from "express-validator";

export const AddSchoolData = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation failed", errors: errors.array() });
    }

    const { name, address, latitude, longitude } = req.body;

    try {
        const [school] = await sql`
            INSERT INTO schools (name, address, latitude, longitude)
            VALUES (${name}, ${address}, ${latitude}, ${longitude})
            RETURNING id, name, address, latitude, longitude, created_at
        `;

        return res.status(201).json({
            message: "School added",
            school
        });
    } catch (err) {
        // console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};



export const ListSchool = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation failed", errors: errors.array() });
    }

    const userLat = parseFloat(req.query.lat);
    const userLng = parseFloat(req.query.lng);

    try {
        const rows = await sql`
            SELECT
              id, name, address, latitude, longitude,
              (6371 * 2 * ASIN(
                SQRT(
                  POWER(SIN(RADIANS((${userLat} - latitude) / 2)), 2) +
                  COS(RADIANS(${userLat})) * COS(RADIANS(latitude)) *
                  POWER(SIN(RADIANS((${userLng} - longitude) / 2)), 2)
                )
              )) AS distance_km
            FROM schools
            ORDER BY distance_km ASC
        `;

        return res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
