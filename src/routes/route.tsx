import { Routes, Route } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import About from "../pages/About";
import Compiler from "../pages/Compiler";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="compiler" element={<Compiler />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
