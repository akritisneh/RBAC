const express = require("express");
const router = express.Router();
const mockRoles = require("../data/mockRoles");

// GET: Fetch all roles
router.get("/", (req, res) => {
  res.json(mockRoles);
});

// GET: Fetch a specific role
router.get("/:id", (req, res) => {
  const role = mockRoles.find(r => r.id === parseInt(req.params.id));
  if (role) {
    res.json(role);
  } else {
    res.status(404).send("Role not found");
  }
});

module.exports = router;
