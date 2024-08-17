import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { createTask } from "../../utils/ApiCalls/ApiCalls";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAddTask } from "../../redux/managementReducer";

const AddTask = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [selectedPriority, setSelectedPriority] = useState("Medium");

  const token = useSelector((state) => state.taskManagement.token);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setLoading(false);
    setOpen(false);
  };

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePriorityChange = (e) => {
    setSelectedPriority(e.target.value);
  };

  const handleAddTask = async () => {
    setLoading(true);
    try {
      const taskWithPriority = {
        ...taskData,
        priority: selectedPriority,
        status: "Pending",
      };

      const response = await createTask(taskWithPriority, token);

      if (response.status === 201) {
        dispatch(setAddTask({ task: response.data.task }));

        setTaskData({
          title: "",
          description: "",
          dueDate: "",
        });
        setSelectedPriority("Medium");
        handleClose();
      } else {
        console.error("Failed to add task. Status:", response.status);
      }
    } catch (error) {
      console.error("Error occurred while adding task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Button
        onClick={handleOpen}
        color="primary"
        variant="contained"
        startIcon={<AddIcon />}
      >
        Add New Task
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Add New Task
          </Typography>
          <TextField
            label="Title"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Due Date"
            name="dueDate"
            type="date"
            value={taskData.dueDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2 }}
          />
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
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddTask}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? "Adding..." : "Add Task"}
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleClose}
              disabled={loading}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddTask;
