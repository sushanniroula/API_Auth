const express = require("express");
const router = express.Router();
const {
  getAllCohort,
  createCohort,
  viewCohort,
  updateCohort,
  deleteCohort,
} = require("../controllers/Cohort.controllers");

router.get("/:proId", getAllCohort);
router.post("/", createCohort);
router.get("/:proId/:cohortId", viewCohort);
router.put("/:proId/:cohortId", updateCohort);
router.delete("/:proId/:cohortId", deleteCohort);
module.exports = router;
