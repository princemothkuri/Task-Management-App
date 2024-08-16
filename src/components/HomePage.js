import React from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import NavBar from "./dashboard/NavBar";
import { useSelector } from "react-redux";

const HomePage = () => {
  const loggedIn = useSelector((state) => state.taskManagement.loggedIn);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {loggedIn ? <NavBar /> : null}

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('./images/2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          filter: "blur(6px)",
          zIndex: -1,
        }}
      ></div>

      <Container
        maxWidth="md"
        style={{
          textAlign: "center",
          padding: "40px 5px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box sx={{ mb: 5, mt: 10 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to Task Management App
          </Typography>
          <Typography variant="h6" component="p" color="textSecondary">
            Organize your tasks, collaborate with others, and get things done
            efficiently!
          </Typography>
        </Box>

        {loggedIn ? (
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            component={Link}
            to="/dashboard"
          >
            Go To Dashboard
          </Button>
        ) : (
          <Box sx={{ mb: 5 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/signup"
              sx={{ mr: 2 }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              component={Link}
              to="/login"
            >
              Login
            </Button>
          </Box>
        )}

        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Features
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Create and manage tasks with ease" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Track your progress" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Access your tasks on any device" />
            </ListItem>
          </List>
        </Box>
      </Container>
    </div>
  );
};

export default HomePage;
