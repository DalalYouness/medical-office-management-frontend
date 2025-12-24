import { Routes, Route } from "react-router-dom";
import SideBa from "../layouts/SideBa";
import Dashboard from "../Components/admin/Dashboard";
import Users from "../Components/admin/Users";
import Settings from "../Components/admin/Settings";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/admin" element={<SideBa />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
