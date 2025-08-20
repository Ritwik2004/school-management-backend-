import { Router } from "express";
import { addSchoolValidator, listSchoolsValidator } from "../validator/school.validator.js";
import { AddSchoolData, ListSchool } from "../controllers/controller.js";

const router = Router();

/**
 * POST /addSchool
 * Body: { name, address, latitude, longitude }
 */
router.post("/addSchool", addSchoolValidator, AddSchoolData);

/**
 * GET /listSchools?lat=..&lng=..
 * Returns: [{ id, name, address, latitude, longitude, distance_km }]
 */
router.get("/listSchools", listSchoolsValidator, ListSchool);

export default router;
