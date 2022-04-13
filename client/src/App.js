import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";

import Router from "./routes/router";
import { Store } from "./store";
import "./App.css";

const App = () => {
  return (
    <StoreProvider store={Store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
