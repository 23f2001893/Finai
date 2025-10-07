import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";

const App: React.FC = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/Register">Register</Link> |{" "}
        <Link to="/Login">Login</Link>
      </nav>
      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
