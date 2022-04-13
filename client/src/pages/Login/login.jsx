import React, { useState, useEffect, Redirect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Typography,
  Box,
  Checkbox,
  Paper,
  Alert,
} from "@mui/material";

import { login } from "./../../actions/authAction";

const Login = () => {
  const { isLoggedIn } = useSelector((state) => state.AuthReducer);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/home");
    }
  }, []);

  const onLogIn = async (e) => {
    e.preventDefault();
    let user = {
      email: email,
      password: password,
    };

    dispatch(login(user)).then((response) => {
      if (response.status === "success") {
        navigate("/home");
      } else if (response.status === "failed") {
        setLoginStatus(true);
        setMessage(response.message);
        setTimeout(() => {
          setLoginStatus(false);
          setMessage("");
          navigate("/");
        }, 2000);
      }
    });
  };

  return (
    <>
      {loginStatus ? (
        <Alert variant="filled" severity="error">
          {message}
        </Alert>
      ) : null}
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Typography component="h1" variant="h5">
          Login to your account
        </Typography>
        <Box component="form" onSubmit={onLogIn}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }}>
            Log In
          </Button>
        </Box>
      </Grid>
    </>
  );
};
export default Login;
