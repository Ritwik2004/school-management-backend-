import { body, query } from "express-validator";

export const addSchoolValidator = [
  body("name").isString().trim().notEmpty().isLength({ max: 255 }),
  body("address").isString().trim().notEmpty().isLength({ max: 500 }),
  body("latitude").isFloat({ min: -90, max: 90 }).toFloat(),
  body("longitude").isFloat({ min: -180, max: 180 }).toFloat()
];

export const listSchoolsValidator = [
  query("lat").exists().withMessage("lat is required")
    .isFloat({ min: -90, max: 90 }).toFloat(),
  query("lng").exists().withMessage("lng is required")
    .isFloat({ min: -180, max: 180 }).toFloat()
];
