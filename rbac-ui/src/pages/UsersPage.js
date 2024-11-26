import React, { useEffect, useState } from "react";
import { fetchUsers } from "../services/apiService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Button,
  Card,
  CardContent,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit Popup States
  const [editUser, setEditUser] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Add Popup States
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    department: "",
    roles: [""],
    status: "Active",
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Delete Confirmation States
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();

        if (Array.isArray(usersData)) {
          setUsers(usersData);
        } else {
          throw new Error("Users data is not in the expected format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const toggleUserStatus = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
          : user
      )
    );
  };

  // Edit Handlers
  const handleEditClick = (user) => {
    setEditUser(user);
    setIsEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
    setEditUser(null);
  };

  const handleEditSave = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === editUser.id ? { ...editUser } : user
      )
    );
    handleEditDialogClose();
  };

  const handleEditInputChange = (field, value) => {
    setEditUser({ ...editUser, [field]: value });
  };

  // Add Handlers
  const handleAddDialogOpen = () => {
    setIsAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setIsAddDialogOpen(false);
    setNewUser({
      name: "",
      email: "",
      department: "",
      roles: [""],
      status: "Active",
    });
  };

  const handleAddInputChange = (field, value) => {
    setNewUser({ ...newUser, [field]: value });
  };

  const handleAddSave = () => {
    const id = Math.max(...users.map((user) => user.id)) + 1; // Generate a new ID
    setUsers([...users, { ...newUser, id }]);
    handleAddDialogClose();
  };

  // Delete Handlers
  const handleDeleteClick = (id) => {
    setUserToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    setUsers(users.filter((user) => user.id !== userToDelete));
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px" }}
        onClick={handleAddDialogOpen}
      >
        Add User
      </Button>

      {/* Buttons to navigate to RolesPage and PermissionsPage */}
      <Button
        variant="contained"
        color="secondary"
        style={{ marginBottom: "20px", marginRight: "10px" }}
        onClick={() => navigate("/roles")}
      >
        Go to Roles
      </Button>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginBottom: "20px" }}
        onClick={() => navigate("/permissions")}
      >
        Go to Permissions
      </Button>

      {/* User Management Table */}
      <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Department</strong></TableCell>
              <TableCell><strong>Roles</strong></TableCell>
              <TableCell align="center"><strong>Status</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>{user.roles.join(", ")}</TableCell>
                <TableCell align="center">
                  <Switch
                    checked={user.status === "Active"}
                    onChange={() => toggleUserStatus(user.id)}
                    color="primary"
                  />
                  {user.status}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="secondary"
                    style={{ marginRight: "10px" }}
                    onClick={() => handleEditClick(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteClick(user.id)} // Open delete confirmation dialog
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* User Summary Card */}
      <Card>
        <CardContent>
          <Typography variant="h6">
            Active Users: {users.filter((user) => user.status === "Active").length}
          </Typography>
          <Typography variant="h6">
            Inactive Users: {users.filter((user) => user.status === "Inactive").length}
          </Typography>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            value={editUser?.name || ""}
            onChange={(e) => handleEditInputChange("name", e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={editUser?.email || ""}
            onChange={(e) => handleEditInputChange("email", e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Department"
            value={editUser?.department || ""}
            onChange={(e) => handleEditInputChange("department", e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            select
            label="Roles"
            value={editUser?.roles?.[0] || ""}
            onChange={(e) => handleEditInputChange("roles", [e.target.value])}
          >
            <MenuItem value="IT Admin">IT Admin</MenuItem>
            <MenuItem value="HR Manager">HR Manager</MenuItem>
            <MenuItem value="Finance Analyst">Finance Analyst</MenuItem>
          </TextField>
          <TextField
            fullWidth
            margin="normal"
            select
            label="Status"
            value={editUser?.status || ""}
            onChange={(e) => handleEditInputChange("status", e.target.value)}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onClose={handleAddDialogClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            value={newUser.name}
            onChange={(e) => handleAddInputChange("name", e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={newUser.email}
            onChange={(e) => handleAddInputChange("email", e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Department"
            value={newUser.department}
            onChange={(e) => handleAddInputChange("department", e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            select
            label="Roles"
            value={newUser.roles?.[0] || ""}
            onChange={(e) => handleAddInputChange("roles", [e.target.value])}
          >
            <MenuItem value="IT Admin">IT Admin</MenuItem>
            <MenuItem value="HR Manager">HR Manager</MenuItem>
            <MenuItem value="Finance Analyst">Finance Analyst</MenuItem>
          </TextField>
          <TextField
            fullWidth
            margin="normal"
            select
            label="Status"
            value={newUser.status}
            onChange={(e) => handleAddInputChange("status", e.target.value)}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserPage;
