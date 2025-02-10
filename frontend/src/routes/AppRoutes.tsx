import { Route, Routes } from "react-router-dom";
import Room from "../pages/Room";
import Error404 from "../pages/Error404";
import MainGamePage from "../pages/MainGamePage";

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Room />} />
        <Route path="/games" element={<MainGamePage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
  );
};

export default AppRoutes;
