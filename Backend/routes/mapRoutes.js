const express = require("express");
const router = express.Router();
const { query } = require("express-validator");
const mapsController = require("../controllers/mapsController");
const authenticateUser =
  require("../middlewares/OuthMiddleware").authenticateUser;

router.get(
  "/get-coordinates",
  query("address")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Location is required"),
  authenticateUser,
  mapsController.getCoordinates
);

router.get(
  "/get-distance-time",
  query("origin")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Origin is required"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Destination is required"),
  authenticateUser,
  mapsController.getDistanceTime
);

// Change from "query" to "input"
router.get(
  "/get-suggestions",
  query("input")  // Changed from "query" to "input"
    .isString()
    .isLength({ min: 3 })
    .withMessage("Input must be at least 3 characters"),
  authenticateUser,
  mapsController.getSuggestions
);

module.exports = router;
