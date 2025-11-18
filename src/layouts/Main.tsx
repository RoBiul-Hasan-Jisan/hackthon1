import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navber from "../components/Navber";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-7xl mx-auto">
      <Navber />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
