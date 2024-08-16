import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Link,
  FormHelperText,
  CircularProgress,
  Alert,
  Snackbar,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  useMediaQuery,
} from "@mui/material";
import { signup } from "../utils/ApiCalls/ApiCalls";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width:600px)");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [emailError, setEmailError] = useState("");

  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      setFormData({
        ...formData,
        [name]: value.replace(/[^0-9]/g, "").slice(0, 10),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleEmailBlur = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setEmailError("Entered email is invalid");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);

    try {
      await signup(formData);

      setAlert({
        open: true,
        severity: "success",
        message: "Sign up successful:",
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/login");
    } catch (error) {
      setAlert({
        open: true,
        severity: "error",
        message: "Sign up failed. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: 'url("./images/3.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
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
      <Container
        maxWidth="sm"
        style={{
          textAlign: "center",
          padding: "20px 25px",
          borderRadius: "8px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          border: "1px solid white",
          backdropFilter: "blur(10px)",
          color: "white",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={2} direction={isMobile ? "column" : "row"}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  variant="standard"
                  margin="normal"
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={loading}
                  sx={{
                    input: { color: "white" },
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "white",
                    },
                    "& .MuiInput-underline:before": {
                      borderBottom: "1px solid white",
                    },
                    "& .MuiInput-underline:hover:before": {
                      borderBottom: "2px solid white",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottom: "2px solid white",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="standard"
                  margin="normal"
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={loading}
                  sx={{
                    input: { color: "white" },
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "white",
                    },
                    "& .MuiInput-underline:before": {
                      borderBottom: "1px solid white",
                    },
                    "& .MuiInput-underline:hover:before": {
                      borderBottom: "2px solid white",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottom: "2px solid white",
                    },
                  }}
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="Username"
              variant="standard"
              margin="normal"
              required
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
              sx={{
                input: { color: "white" },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "white",
                },
                "& .MuiInput-underline:before": {
                  borderBottom: "1px solid white",
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottom: "2px solid white",
                },
                "& .MuiInput-underline:after": {
                  borderBottom: "2px solid white",
                },
              }}
            />
            <TextField
              fullWidth
              label="Email"
              variant="standard"
              margin="normal"
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleEmailBlur}
              disabled={loading}
              sx={{
                input: { color: "white" },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "white",
                },
                "& .MuiInput-underline:before": {
                  borderBottom: "1px solid white",
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottom: "2px solid white",
                },
                "& .MuiInput-underline:after": {
                  borderBottom: "2px solid white",
                },
              }}
            />
            {emailError && <FormHelperText error>{emailError}</FormHelperText>}
            <TextField
              fullWidth
              label="Phone Number"
              variant="standard"
              margin="normal"
              required
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={loading}
              sx={{
                input: { color: "white" },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "white",
                },
                "& .MuiInput-underline:before": {
                  borderBottom: "1px solid white",
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottom: "2px solid white",
                },
                "& .MuiInput-underline:after": {
                  borderBottom: "2px solid white",
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              variant="standard"
              margin="normal"
              required
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              sx={{
                input: { color: "white" },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "white",
                },
                "& .MuiInput-underline:before": {
                  borderBottom: "1px solid white",
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottom: "2px solid white",
                },
                "& .MuiInput-underline:after": {
                  borderBottom: "2px solid white",
                },
              }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              variant="standard"
              margin="normal"
              required
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              sx={{
                input: { color: "white" },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "white",
                },
                "& .MuiInput-underline:before": {
                  borderBottom: "1px solid white",
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottom: "2px solid white",
                },
                "& .MuiInput-underline:after": {
                  borderBottom: "2px solid white",
                },
              }}
            />
            <Grid
              sx={{
                display: "flex",
                alignItems: "self-start",
                justifyContent: "flex-start",
              }}
            >
              <FormControl
                component="fieldset"
                margin="normal"
                required
                sx={{ width: "100%", color: "white" }}
              >
                <FormLabel
                  component="legend"
                  sx={{
                    display: "flex",
                    alignItems: "self-start",
                    justifyContent: "flex-start",
                    width: "100%",
                    color: "white",
                    "&.Mui-focused": {
                      color: "white",
                    },
                  }}
                >
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="male"
                    control={
                      <Radio
                        disabled={loading}
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "white",
                          },
                        }}
                      />
                    }
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={
                      <Radio
                        disabled={loading}
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "white",
                          },
                        }}
                      />
                    }
                    label="Female"
                  />
                  <FormControlLabel
                    value="other"
                    control={
                      <Radio
                        disabled={loading}
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "white",
                          },
                        }}
                      />
                    }
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign Up"
              )}
            </Button>
          </Box>

          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ mt: 2, color: "white" }}
          >
            Already have an account? <Link href="/login">Login</Link>
          </Typography>
        </form>
      </Container>
    </div>
  );
};

export default SignUpPage;
