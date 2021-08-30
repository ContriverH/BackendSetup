const express = require("express");
const router = express.Router();
const Book = require("../models/book");

// All books route
router.get("/", async (req, res) => {});

// new books route
router.get("/new", (req, res) => {});

// create books route
router.post("/", async (req, res) => {});

module.exports = router;
