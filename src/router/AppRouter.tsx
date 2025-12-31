import { Routes, Route } from "react-router-dom";
import Dashboard from "../Components/admin/Dashboard";
import Users from "../Components/admin/Users";
import Settings from "../Components/admin/Settings";
import Auth from "../Components/admin/Auth";
import Sideba from "../layouts/SideBa";
import { adminMenu, patientMenu } from "../config/sidebar.config";
import Patients from "../Components/admin/Patients";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/admin" element={<Sideba menu={adminMenu} />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/patient" element={<Sideba menu={patientMenu} />}>
        <Route path="patients" element={<Patients />} />
        {/* <Route path="dashboard" element={<PatientDashboard />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="settings" element={<PatientSettings />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRouter;
