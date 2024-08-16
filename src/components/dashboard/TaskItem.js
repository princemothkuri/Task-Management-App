import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const TaskItem = ({ task, handleEditClick, onDelete }) => {
  const formattedDueDate = new Date(task.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card
      sx={{
        backgroundColor: "#333",
        color: "white",
        mb: 2,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {task.description}
        </Typography>

        <Typography variant="body2">Status: {task.status}</Typography>
        <Typography variant="body2">Priority: {task.priority}</Typography>
        <Typography variant="body2">Due Date: {formattedDueDate}</Typography>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          mt: "auto",
          pb: 2,
          px: 2,
        }}
      >
        <Button
          variant="outlined"
          sx={{
            mr: 1,
            borderColor: "#ADD8E6",
            color: "#ADD8E6",
          }}
          onClick={() => handleEditClick(task)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ backgroundColor: "red" }}
          onClick={() => onDelete(task._id)}
        >
          Delete
        </Button>
      </Box>
    </Card>
  );
};

export default TaskItem;
