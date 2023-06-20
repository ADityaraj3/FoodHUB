import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Layout from "./Layout";
import Home from "./Home";
import SearchByImage from "./SearchByImage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { UserContextProvider } from "./UserContext";

function App() {
  return (
    <UserContextProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path='/SearchByImage' element={<SearchByImage />}/>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage/>}/>
        </Route>
      </Routes>
    </Router>
    </UserContextProvider>
  );
}

export default App;
