import React, { useEffect, useState } from "react";
import { fetchUsers } from "../services/apiService";  // Assumed API service to fetch users
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
  Grid,
} from "@mui/material";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();
        if (Array.isArray(usersData)) {
          
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
        onClick={() => alert("Add User functionality goes here")}
      >
        Add User
      </Button>
      
      {/* User Management Table */}
      <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell align="center"><strong>Status</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="center">{user.status}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="secondary"
                    style={{ marginRight: "10px" }}
                    onClick={() => alert(`Edit User ${user.name}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => alert(`Delete User ${user.name}`)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* User Summary Card (Optional) */}
      <Card>
        <CardContent>
          <Typography variant="h6">Active Users: {users.filter(user => user.status === 'Active').length}</Typography>
          <Typography variant="h6">Inactive Users: {users.filter(user => user.status === 'Inactive').length}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPage;
