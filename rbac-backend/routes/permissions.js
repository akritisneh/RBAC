const express = require("express");
const router = express.Router();
const mockPermissions = require("../data/mockPermissions");

// GET: Fetch all permissions
router.get("/", (req, res) => {
  res.json(mockPermissions);
});

// GET: Fetch permissions for a specific module
router.get("/:module", (req, res) => {
  const modulePermissions = mockPermissions.filter(
    p => p.module.toLowerCase() === req.params.module.toLowerCase()
  );
  if (modulePermissions.length > 0) {
    res.json(modulePermissions);
  } else {
    res.status(404).send("Permissions not found for this module");
  }
});

module.exports = router;
