import Footer from "./Footer";
import Navbar from "./navbar";
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    <main>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}