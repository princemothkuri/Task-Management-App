import React, { useState } from "react";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import TaskItem from "./TaskItem";
import EditTaskModal from "./EditTaskModal";

const TaskList = ({ tasks, onEdit, onDelete, loading }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSave = (
    id,
    title,
    description,
    dueDate,
    status,
    selectedPriority
  ) => {
    onEdit(id, title, description, dueDate, status, selectedPriority);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {loading ? (
          <Grid item xs={12}>
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <CircularProgress />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Loading tasks...
              </Typography>
            </Box>
          </Grid>
        ) : tasks.length > 0 ? (
          tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <TaskItem
                task={task}
                handleEditClick={handleEditClick}
                onDelete={onDelete}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography variant="h6">There are no tasks available</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
      {editingTask && (
        <EditTaskModal
          open={isModalOpen}
          onClose={handleModalClose}
          task={editingTask}
          onSave={handleSave}
          loading={loading}
        />
      )}
    </>
  );
};

export default TaskList;
