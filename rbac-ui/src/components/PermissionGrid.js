import React from "react";
import { Grid, Paper, Typography, Button, Box } from "@mui/material";
import mockPermissions from "../data/mockPermissions"; // Assuming mock data for permissions

const PermissionGrid = () => {
  return (
    <Grid container spacing={3} style={{ marginTop: "20px" }}>
      {mockPermissions.map((permission) => (
        <Grid item xs={12} sm={6} md={4} key={permission.id}>
          <Paper style={{ padding: "20px" }}>
            <Typography variant="h6">{permission.name}</Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              {permission.description}
            </Typography>
            <Box>
              <Button variant="outlined" color="primary" style={{ marginRight: "10px" }}>
                Edit
              </Button>
              <Button variant="outlined" color="error">
                Delete
              </Button>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default PermissionGrid;
