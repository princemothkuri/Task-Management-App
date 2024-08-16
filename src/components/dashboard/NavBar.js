import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const NavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(10px)",
        color: "white",
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleMenuClick}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={Link} to="/" onClick={handleMenuClose}>
                Home
              </MenuItem>
              <MenuItem
                component={Link}
                to="/dashboard"
                onClick={handleMenuClose}
              >
                Dashboard
              </MenuItem>
              <MenuItem
                component={Link}
                to="/profile"
                onClick={handleMenuClose}
              >
                Profile
              </MenuItem>
              <MenuItem component={Link} to="/logout" onClick={handleMenuClose}>
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button
              component={Link}
              to="/"
              color="inherit"
              sx={{ color: "white" }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/dashboard"
              color="inherit"
              sx={{ color: "white" }}
            >
              Dashboard
            </Button>
            <Button
              component={Link}
              to="/profile"
              color="inherit"
              sx={{ color: "white" }}
            >
              Profile
            </Button>
            <Button
              component={Link}
              to="/logout"
              color="inherit"
              sx={{ color: "white" }}
            >
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
