import Footer from "./Footer";
import Navbar from "./navbar";
import {Outlet} from "react-router-dom";

export default function Layout({ setIsAuth, isAuth }) {
 
  return (
    <main>
      <Navbar setIsAuth={setIsAuth} isAuth={isAuth}/>
      <Outlet />
      <Footer />
    </main>
  );
}