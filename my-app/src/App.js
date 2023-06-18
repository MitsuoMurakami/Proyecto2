// import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Login from "./Login";
import Register from "./Register";
import Operations from "./Operations";
import Friends from "./Friends";
import History from "./History";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Profile" element={<Profile/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/Register" element={<Register/>}></Route>
        <Route path="/Operations" element={<Operations/>}></Route>
        <Route path="/Friends" element={<Friends/>}></Route>
        <Route path="/History" element={<History/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
