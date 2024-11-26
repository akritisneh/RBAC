import React, { useEffect, useState } from "react";
import { fetchPermissions } from "../services/apiService";
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
  Card,
  CardContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const PermissionsPage = () => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [editedActions, setEditedActions] = useState([]);
  const [newPermission, setNewPermission] = useState({ module: "", actions: "" });

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const permissionsData = await fetchPermissions();
        setPermissions(permissionsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getPermissions();
  }, []);

  const handleEditClick = (permission) => {
    setSelectedPermission(permission);
    setEditedActions(permission.actions);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setSelectedPermission(null);
    setEditedActions([]);
  };

  const handleActionChange = (event) => {
    const { value } = event.target;
    setEditedActions(value.split(",").map((action) => action.trim()));
  };

  const handleSaveChanges = () => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((permission) =>
        permission.id === selectedPermission.id
          ? { ...permission, actions: editedActions }
          : permission
      )
    );
    handleEditDialogClose();
  };

  const handleAddPermissionChange = (event) => {
    const { name, value } = event.target;
    setNewPermission((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
    setNewPermission({ module: "", actions: "" });
  };

  const handleAddNewPermission = () => {
    const newPermissionObject = {
      id: permissions.length + 1, // Generate a simple unique id
      module: newPermission.module,
      actions: newPermission.actions.split(",").map((action) => action.trim()),
    };
    setPermissions([...permissions, newPermissionObject]);
    handleAddDialogClose();
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Permissions Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px" }}
        onClick={handleAddDialogOpen}
      >
        Add Permission
      </Button>

      <div>
        {permissions.map((permission) => (
          <Card key={permission.id} style={{ marginBottom: "20px" }}>
            <CardContent>
              <Typography variant="h6">{permission.module}</Typography>
              <Typography variant="body2" color="textSecondary">
                Actions:
              </Typography>
              <ul>
                {permission.actions.map((action, index) => (
                  <li key={index}>{action}</li>
                ))}
              </ul>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleEditClick(permission)}
              >
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Permission Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Permissions for {selectedPermission?.module}</DialogTitle>
        <DialogContent>
          <TextField
            label="Actions"
            fullWidth
            value={editedActions.join(", ")}
            onChange={handleActionChange}
            helperText="Enter actions separated by commas"
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Permission Dialog */}
      <Dialog open={addDialogOpen} onClose={handleAddDialogClose}>
        <DialogTitle>Add New Permission</DialogTitle>
        <DialogContent>
          <TextField
            label="Module"
            name="module"
            fullWidth
            value={newPermission.module}
            onChange={handleAddPermissionChange}
            margin="normal"
          />
          <TextField
            label="Actions"
            name="actions"
            fullWidth
            value={newPermission.actions}
            onChange={handleAddPermissionChange}
            helperText="Enter actions separated by commas"
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddNewPermission} color="primary">
            Add Permission
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PermissionsPage;
