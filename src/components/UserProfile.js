import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Grid,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import NavBar from "./dashboard/NavBar";
import { getUserById, updateUserProfile } from "../utils/ApiCalls/ApiCalls";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const userDetails = useSelector((state) => state.taskManagement.user);
  const token = useSelector((state) => state.taskManagement.token);
  const loggedIn = useSelector((state) => state.taskManagement.loggedIn);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    username: "",
    gender: "",
  });

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await updateUserProfile(
        userDetails?._id,
        profileData,
        token
      );

      if (response.status === 200) {
        setAlert({
          open: true,
          severity: "success",
          message: "Profile Updated Successfully!",
        });
      } else if (
        response.data.message ===
        "Email already exists. Please enter a different email."
      ) {
        setAlert({
          open: true,
          severity: "error",
          message: "Email already exists. Please enter a different email.",
        });
      } else if (
        response.data.message ===
        "Username already exists. Please enter a different username."
      ) {
        setAlert({
          open: true,
          severity: "error",
          message:
            "Username already exists. Please enter a different username.",
        });
      }
    } catch (error) {
      console.error(error);
      setAlert({
        open: true,
        severity: "error",
        message: "An error occurred while updating the profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    setLoading(true);
    try {
      const response = await getUserById(userDetails?._id, token);

      setProfileData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
    getUserDetails();
  }, []);

  return (
    <>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ marginTop: "50px" }}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
        >
          {alert.message}
        </Alert>
      </Snackbar>
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <NavBar />
        <Container
          maxWidth="xs"
          sx={{
            textAlign: "center",
            padding: "30px 20px",
            backdropFilter: "blur(10px)",
            borderRadius: "8px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            border: "1px solid white",
          }}
        >
          <Typography variant="h4" sx={{ mb: 3 }}>
            Edit Profile
          </Typography>
          {loading ? (
            <CircularProgress sx={{ color: "white" }} />
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={profileData?.firstName}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={profileData?.lastName}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <TextField
                label="Username"
                name="username"
                value={profileData?.username}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Email"
                name="email"
                value={profileData?.email}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={profileData?.phoneNumber}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />

              <FormLabel component="legend" sx={{ textAlign: "start" }}>
                Gender
              </FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={profileData?.gender}
                onChange={handleChange}
                row
                sx={{ marginTop: "-12px" }}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </Box>
          )}
        </Container>
      </Container>
    </>
  );
};

export default UserProfile;
