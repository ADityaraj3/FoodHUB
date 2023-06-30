import Footer from "./Footer";
import Navbar from "./navbar";
import {Outlet} from "react-router-dom";

export default function Layout({setIsAuth}) {
 
  return (
    <main>
      <Navbar setIsAuth={setIsAuth}/>
      <Outlet />
      <Footer />
    </main>
  );
}