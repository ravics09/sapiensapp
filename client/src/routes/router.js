import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { Home, Login } from "../pages/index";

const Router = () => {
  const { themeColor } = useSelector((state) => state.AuthReducer);

  const setThemePreferenece = (color) => {
    switch (color) {
      case "black":
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        break;
      case "green":
        document.body.style.backgroundColor = "green";
        document.body.style.color = "black";
        break;
      case "yellow":
        document.body.style.backgroundColor = "yellow";
        document.body.style.color = "black";
        break;
      case "red":
        document.body.style.backgroundColor = "red";
        document.body.style.color = "white";
        break;
      case "blue":
        document.body.style.backgroundColor = "blue";
        document.body.style.color = "white";
        break;
      default:
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
    }
  };

  useEffect(() => {
    setThemePreferenece(themeColor);
  }, [themeColor]);

  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/home" element={<Home />} />
    </Routes>
  );
};

export default Router;