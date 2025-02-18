import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RoutesPath from "./routesPath";

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path={RoutesPath.LOGIN} element={<Login />} />
      <Route path={RoutesPath.HOME} element={<Home />} />
      <Route path="*" element={<Navigate to={RoutesPath.LOGIN} />} />
    </Routes>
  );
};

export default AppRoutes;
