import { BrowserRouter as Router, Route, Routes,Link } from "react-router-dom";
import './App.css';
import Layout from "./Layout";
import Home from "./Home";
import SearchByImage from "./SearchByImage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import SearchByName from "./Pages/SearchByName";
import Pages from "./Pages/Pages";
import Searched from "./Pages/Searched";
import Cuisine from "./Pages/Cuisine";
import Recipe from "./Pages/Recipe";
import CreatePost from "./Pages/CreatePost"
import { useState } from "react";
import ViewPost from "./Pages/ViewPost";
function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <UserContextProvider>
      <Router>
      <Routes>
        
        <Route path="/" element={<Layout setIsAuth={setIsAuth} isAuth={isAuth}/>}>
          <Route index element={<Home />}/>
          <Route path='/SearchByName' element={<SearchByName/>}/>
          <Route path='/SearchByImage' element={<SearchByImage />}/>
          <Route path='/login' element={<LoginPage setIsAuth={setIsAuth}/>} /> 
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path="/pages/*" element={<Pages />} />
          <Route path="/cuisine/:type" element={<Cuisine/>}/>
          <Route path="/searched/:search" element={<Searched/>}/>
          <Route path="/recipe/:name" element={<Recipe/>}/>
          <Route path="/createpost" element={<CreatePost/>}/>
          <Route path="/viewpost" element={<ViewPost isAuth={isAuth}/>}/>
        </Route>
      </Routes>
    </Router>
    </UserContextProvider>
  );
}

export default App;
