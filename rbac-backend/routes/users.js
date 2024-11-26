const express = require("express");
const mockUsers = require("../data/mockUsers");

const router = express.Router();

// GET /api/users
router.get("/", (req, res) => {
    res.json(mockUsers);
});

module.exports = router;
