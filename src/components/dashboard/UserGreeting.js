import React from "react";
import { Typography, Box } from "@mui/material";

const UserGreeting = ({ userDetails }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" color="Black">
        Welcome back, {userDetails?.firstName}!
      </Typography>
    </Box>
  );
};

export default UserGreeting;
