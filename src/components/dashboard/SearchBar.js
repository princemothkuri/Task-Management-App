import React from "react";
import { TextField, Box } from "@mui/material";

const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <Box sx={{ mb: 2 }}>
    <TextField
      label="Search Tasks"
      variant="standard"
      fullWidth
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </Box>
);

export default SearchBar;
