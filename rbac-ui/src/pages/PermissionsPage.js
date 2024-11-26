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
} from "@mui/material";

const PermissionsPage = () => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Permissions Management
      </Typography>
      <Button variant="contained" color="primary" style={{ marginBottom: "20px" }}>
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
              <Button variant="outlined" color="primary">
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PermissionsPage;
