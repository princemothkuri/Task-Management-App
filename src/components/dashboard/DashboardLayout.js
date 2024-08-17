import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import TaskFilters from "./TaskFilters";
import UserGreeting from "./UserGreeting";
import { Container, Grid, Box } from "@mui/material";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import {
  deleteTask,
  getTasks,
  updateTask,
} from "../../utils/ApiCalls/ApiCalls";
import { useDispatch } from "react-redux";
import {
  setUpdateTask,
  setTasks,
  setTasksEmpty,
  setDeleteTask,
} from "../../redux/managementReducer";
import { useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.taskManagement.token);
  const loggedIn = useSelector((state) => state.taskManagement.loggedIn);
  const tasks = useSelector((state) => state.taskManagement.tasks);

  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const fetchedTasks = await getTasks(token);
      dispatch(setTasks({ tasks: fetchedTasks.data }));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
    dispatch(setTasksEmpty({ tasks: [] }));
    fetchTasks();
  }, [token]);

  const handleEdit = async (
    id,
    title,
    description,
    dueDate,
    status,
    selectedPriority
  ) => {
    setLoading(true);
    try {
      const updatedTaskData = {
        title,
        description,
        dueDate,
        status,
        priority: selectedPriority,
      };

      const response = await updateTask(id, updatedTaskData, token);
      console.log("Task updated successfully:", response.data);

      dispatch(
        setUpdateTask({
          title,
          description,
          dueDate,
          status,
          priority: selectedPriority,
          id,
        })
      );
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteTask(id, token);
      console.log("Task updated successfully:", response.data);
      dispatch(setDeleteTask({ id: id }));
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
    }
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      selectedFilter === "All" || task.status === selectedFilter;
    const matchesSearchQuery = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearchQuery;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <NavBar />
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <UserGreeting />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TaskFilters
            selectedFilter={selectedFilter}
            onFilterChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box display="flex" justifyContent="flex-end">
            <AddTask />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TaskList
            tasks={filteredTasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardLayout;
