import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@mui/material";

const EditTaskModal = ({ open, onClose, task, onSave, loading }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");

  const [selectedPriority, setSelectedPriority] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(
        task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : ""
      );
      setStatus(task.status);
      setSelectedPriority(task.priority);
    }
  }, [task]);

  const handlePriorityChange = (e) => {
    setSelectedPriority(e.target.value);
  };

  const handleSave = () => {
    onSave(task._id, title, description, dueDate, status, selectedPriority);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Edit Task
        </Typography>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Status
        </Typography>
        <RadioGroup
          row
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ mb: 2 }}
        >
          <FormControlLabel
            value="Pending"
            control={<Radio />}
            label="Pending"
          />
          <FormControlLabel
            value="Completed"
            control={<Radio />}
            label="Completed"
          />
          <FormControlLabel
            value="In Progress"
            control={<Radio />}
            label="In Progress"
          />
        </RadioGroup>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Priority
        </Typography>
        <RadioGroup
          row
          name="priority"
          value={selectedPriority}
          onChange={handlePriorityChange}
          sx={{ mb: 2, marginTop: "-10px" }}
        >
          <FormControlLabel
            value="High"
            control={<Radio color="error" />}
            label="High"
          />
          <FormControlLabel
            value="Medium"
            control={<Radio color="warning" />}
            label="Medium"
          />
          <FormControlLabel
            value="Low"
            control={<Radio color="primary" />}
            label="Low"
          />
        </RadioGroup>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ mr: 1 }}
          startIcon={loading ? <CircularProgress size={20} /> : null}
          disabled={loading}
        >
          {loading ? "Editing..." : "Done"}
        </Button>
        <Button variant="outlined" color="error" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default EditTaskModal;
