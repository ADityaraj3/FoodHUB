import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from "./navbar";
import Layout from "./Layout";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
