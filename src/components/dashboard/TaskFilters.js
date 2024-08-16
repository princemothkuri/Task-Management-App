import React from "react";
import { ToggleButton, ToggleButtonGroup, Box } from "@mui/material";

const TaskFilters = ({ selectedFilter, onFilterChange }) => (
  <Box sx={{ mb: 3 }}>
    <ToggleButtonGroup
      value={selectedFilter}
      exclusive
      onChange={(_, newFilter) => onFilterChange(newFilter || "All")}
      aria-label="task filter"
    >
      <ToggleButton value="All" aria-label="all">
        All
      </ToggleButton>
      <ToggleButton value="Completed" aria-label="completed">
        Completed
      </ToggleButton>
      <ToggleButton value="Pending" aria-label="pending">
        Pending
      </ToggleButton>
      <ToggleButton value="In Progress" aria-label="in-progress">
        In Progress
      </ToggleButton>
    </ToggleButtonGroup>
  </Box>
);

export default TaskFilters;
