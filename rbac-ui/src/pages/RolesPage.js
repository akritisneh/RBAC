import React, { useEffect, useState } from "react";
import { fetchRoles } from "../services/apiService"; // Assuming you have an API service to fetch roles
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const RolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit Popup States
  const [editRole, setEditRole] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Add Popup States
  const [newRole, setNewRole] = useState({ name: "", description: "", permissions: [] });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Delete Confirmation States
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  useEffect(() => {
    const getRoles = async () => {
      try {
        const rolesData = await fetchRoles();
        if (Array.isArray(rolesData)) {
          setRoles(rolesData);
        } else {
          throw new Error("Roles data is not in the expected format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getRoles();
  }, []);

  // Edit Handlers
  const handleEditClick = (role) => {
    setEditRole(role);
    setIsEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
    setEditRole(null);
  };

  const handleEditSave = () => {
    setRoles((prevRoles) =>
      prevRoles.map((role) => (role.id === editRole.id ? { ...editRole } : role))
    );
    handleEditDialogClose();
  };

  const handleEditInputChange = (field, value) => {
    setEditRole({ ...editRole, [field]: value });
  };

  const handleEditPermissionsChange = (permission) => {
    setEditRole((prevRole) => {
      const newPermissions = prevRole.permissions.includes(permission)
        ? prevRole.permissions.filter((perm) => perm !== permission)
        : [...prevRole.permissions, permission];
      return { ...prevRole, permissions: newPermissions };
    });
  };

  // Add Handlers
  const handleAddDialogOpen = () => {
    setIsAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setIsAddDialogOpen(false);
    setNewRole({ name: "", description: "", permissions: [] });
  };

  const handleAddInputChange = (field, value) => {
    setNewRole({ ...newRole, [field]: value });
  };

  const handleAddPermissionsChange = (permission) => {
    const newPermissions = newRole.permissions.includes(permission)
      ? newRole.permissions.filter((perm) => perm !== permission)
      : [...newRole.permissions, permission];
    setNewRole({ ...newRole, permissions: newPermissions });
  };

  const handleAddSave = () => {
    const id = Math.max(...roles.map((role) => role.id)) + 1; // Generate a new ID
    setRoles([...roles, { ...newRole, id }]);
    handleAddDialogClose();
  };

  // Delete Handlers
  const handleDeleteClick = (id) => {
    setRoleToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    setRoles(roles.filter((role) => role.id !== roleToDelete));
    setDeleteDialogOpen(false);
    setRoleToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setRoleToDelete(null);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Role Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px" }}
        onClick={handleAddDialogOpen}
      >
        Add Role
      </Button>

      {/* Roles Table */}
      <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Permissions</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>{Array.isArray(role.permissions) ? role.permissions.join(", ") : "No Permissions"}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="secondary"
                    style={{ marginRight: "10px" }}
                    onClick={() => handleEditClick(role)} // Open edit dialog
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteClick(role.id)} // Open delete confirmation dialog
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Role Summary Card */}
      <Card>
        <CardContent>
          <Typography variant="h6">
            Total Roles: {roles.length}
          </Typography>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Role</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            value={editRole?.name || ""}
            onChange={(e) => handleEditInputChange("name", e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            value={editRole?.description || ""}
            onChange={(e) => handleEditInputChange("description", e.target.value)}
          />
          <div>
            <Typography variant="h6">Permissions</Typography>
            {["Read", "Write", "Delete", "Manage Users", "Configure Systems", 
            "View Payroll", "View Financial Reports", "Export Data", "Update Profile"].map((permission) => (
              <FormControlLabel
                key={permission}
                control={
                  <Checkbox
                    checked={editRole?.permissions.includes(permission)}
                    onChange={() => handleEditPermissionsChange(permission)}
                  />
                }
                label={permission}
              />
            ))}
          </div>
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

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onClose={handleAddDialogClose}>
        <DialogTitle>Add Role</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            value={newRole.name}
            onChange={(e) => handleAddInputChange("name", e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            value={newRole.description}
            onChange={(e) => handleAddInputChange("description", e.target.value)}
          />
          <div>
            <Typography variant="h6">Permissions</Typography>
            {["Read", "Write", "Delete", "Manage Users", "Configure Systems", 
            "View Payroll", "View Financial Reports", "Export Data", "Update Profile"].map((permission) => (
              <FormControlLabel
                key={permission}
                control={
                  <Checkbox
                    checked={newRole.permissions.includes(permission)}
                    onChange={() => handleAddPermissionsChange(permission)}
                  />
                }
                label={permission}
              />
            ))}
          </div>
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
        <DialogTitle>Delete Role</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this role?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RolesPage;
