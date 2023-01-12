import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import "@fontsource/poppins/400.css";
import { Home, Login, Portal, Register } from "./Pages";
import PrivateRoutes from "./utils/privateRoutes";

ReactDOM.render(
  <Router>
    <Routes>
      <Route index element={<Home />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/portal/*" element={<Portal />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
