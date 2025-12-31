import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { useState } from "react";
import LogoutModal from "../Components/admin/LogoutModal";

const Sideba = ({ menu }: { menu: any[] }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ${
      isActive
        ? "bg-emerald-50 text-emerald-600 font-medium"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside
        className={`bg-white border-r flex flex-col transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* LOGO + COLLAPSE BUTTON */}
        <div className="flex items-center justify-between px-3 py-4 border-b">
          <div
            className={`flex items-center gap-3 ${
              collapsed ? "justify-center w-full" : ""
            }`}
          >
            <div className="h-9 w-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
              MC
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-semibold">MediCab</p>
                <p className="text-xs text-gray-500">Interface</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-1 py-4 space-y-1">
          {menu.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClass}>
              <item.icon size={18} />
              {!collapsed && item.label}
            </NavLink>
          ))}
        </nav>

        {/* LOGOUT */}
        <div className="px-3 py-4 border-t">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex hover:text-red-700 items-center gap-3 w-full px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-lg"
          >
            <LogOut size={18} />
            {!collapsed && "Déconnexion"}
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

export default Sideba;
