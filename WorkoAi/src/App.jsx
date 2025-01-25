import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./componets/Login";
import Signup from "./componets/Signup";
import Home from "./componets/Home";
import Navbar from "./componets/Navbar";

function App() {
  return (
    <>
      {" "}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
