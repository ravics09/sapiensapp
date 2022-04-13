import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Container } from "@mui/material";

import Navbar from "./../../components/navbar";

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn, themeColor, loggedInUser } = useSelector(
    (state) => state.AuthReducer
  );
  
  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <Container>
      <Navbar />
      <h3>Welcome {loggedInUser ? loggedInUser.fullName: null}</h3>
    </Container>
  );
};

export default Home;
