import React from "react";
import { Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";

const UserGreeting = () => {
  const user = useSelector((state) => state.taskManagement.user);

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" color="Black">
        Welcome back, {user?.firstName}!
      </Typography>
    </Box>
  );
};

export default UserGreeting;
