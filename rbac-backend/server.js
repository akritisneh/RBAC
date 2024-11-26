const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import mock data from the respective files
const mockUsers = require("./data/mockUsers");
const mockRoles = require("./data/mockRoles");
const mockPermissions = require("./data/mockPermissions");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes for users, roles, and permissions
app.get("/", (req, res) => { 
  res.json(mockUsers);  // Serve users at the root route
});

app.get("/api/roles", (req, res) => {
  res.json(mockRoles);  // Serve roles at /api/roles
});

app.get("/api/permissions", (req, res) => {
  res.json(mockPermissions);  // Serve permissions at /api/permissions
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
