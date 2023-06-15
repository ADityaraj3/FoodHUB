import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Layout from "./Layout";
import Home from "./Home";
import SearchByImage from "./SearchByImage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path='/SearchByImage' element={<SearchByImage />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
