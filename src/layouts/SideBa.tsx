import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import LogoutModal from "../Components/admin/LogoutModal";

const SideBa = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ${
      isActive
        ? "bg-emerald-50 text-emerald-600 font-medium"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // hna t9dr t7yd token/localStorage si kayn
    navigate("/login"); // redirection llogin
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r flex flex-col">
        {/* LOGO */}
        <div className="flex items-center gap-3 px-6 py-5 border-b">
          <div className="h-9 w-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
            MC
          </div>
          <div>
            <p className="text-sm font-semibold">MediCab</p>
            <p className="text-xs text-gray-500">Administration</p>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <NavLink to="/admin/dashboard" className={linkClass}>
            <LayoutDashboard size={18} />
            Tableau de bord
          </NavLink>

          <NavLink to="/admin/users" className={linkClass}>
            <Users size={18} />
            Utilisateurs
          </NavLink>

          <NavLink to="/admin/settings" className={linkClass}>
            <Settings size={18} />
            Paramètres
          </NavLink>
        </nav>

        {/* LOGOUT */}
        <div className="px-3 py-4 border-t">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-lg"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

      {/* LOGOUT MODAL */}
      {showLogoutModal && (
        <LogoutModal
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
};

export default SideBa;
