// src/components/Users.tsx
import { useState, useEffect } from "react";
import {
  Plus,
  MoreHorizontal,
  UserCheck,
  UserX,
  User,
  ClipboardList,
} from "lucide-react";
import AddUser from "./AddUser";
import { getUsers } from "../../api/UserApis";

const Users = () => {
  const [showAddUser, setShowAddUser] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    medecin: 0,
    secretaire: 0,
  });

  // Calculer les stats
  const calculateStats = (usersList: any[]) => {
    const total = usersList.length;
    const active = usersList.filter(
      (u) => (u.status ?? "").toLowerCase() === "actif"
    ).length;
    const inactive = usersList.filter(
      (u) => (u.status ?? "").toLowerCase() === "inactif"
    ).length;
    const medecin = usersList.filter(
      (u) => (u.roleName ?? "").toString().toLowerCase() === "medecin"
    ).length;
    const secretaire = usersList.filter(
      (u) => (u.roleName ?? "").toString().toLowerCase() === "secretaire"
    ).length;

    setStats({ total, active, inactive, medecin, secretaire });
  };

  // Fetch users depuis le backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        setUsers(res.data);
        calculateStats(res.data);
      } catch (err) {
        console.error("Erreur fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  // Ajouter un nouvel utilisateur
  const handleUserAdded = (newUser: any) => {
    const userToAdd = {
      fullName: newUser.fullName || `${newUser.prenom} ${newUser.nom}`,
      email: newUser.email || "",
      roleName: newUser.roleName || "MEDECIN",
      status: newUser.status || "Actif",
      creationDate: newUser.creationDate || new Date().toISOString(),
    };

    setUsers((prev) => {
      const updatedUsers = [userToAdd, ...prev];
      calculateStats(updatedUsers);
      return updatedUsers;
    });
  };

  return (
    <div className="space-y-6 relative p-4">
      {/* STATISTIQUES PROFESSIONNELLES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        {/* Total utilisateurs */}
        <div className="flex items-center bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition-shadow duration-300">
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Utilisateurs</p>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          </div>
        </div>

        {/* Actifs */}
        <div className="flex items-center bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition-shadow duration-300">
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-green-100 rounded-full">
            <UserCheck className="w-6 h-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Actifs</p>
            <p className="text-2xl font-bold text-gray-800">{stats.active}</p>
          </div>
        </div>

        {/* Inactifs */}
        <div className="flex items-center bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition-shadow duration-300">
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-red-100 rounded-full">
            <UserX className="w-6 h-6 text-red-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Inactifs</p>
            <p className="text-2xl font-bold text-gray-800">{stats.inactive}</p>
          </div>
        </div>

        {/* Médecins */}
        <div className="flex items-center bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition-shadow duration-300">
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
            <ClipboardList className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Médecins</p>
            <p className="text-2xl font-bold text-gray-800">{stats.medecin}</p>
          </div>
        </div>

        {/* Secrétaires */}
        <div className="flex items-center bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition-shadow duration-300">
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-full">
            <ClipboardList className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Secrétaires</p>
            <p className="text-2xl font-bold text-gray-800">
              {stats.secretaire}
            </p>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-xl font-semibold">Gestion des utilisateurs</h1>
        <button
          onClick={() => setShowAddUser(true)}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700"
        >
          <Plus size={16} />
          Nouvel utilisateur
        </button>
      </div>

      {/* TABLE DES UTILISATEURS */}
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="text-left px-4 py-3">UTILISATEUR</th>
              <th className="text-left px-4 py-3">CONTACT</th>
              <th className="text-left px-4 py-3">RÔLE</th>
              <th className="text-left px-4 py-3">STATUT</th>
              <th className="text-left px-4 py-3">DATE DE CRÉATION</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => {
              const initials = user.fullName
                ? user.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                : "";
              return (
                <tr
                  key={i}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-semibold">
                      {initials}
                    </div>
                    <span className="font-medium">{user.fullName}</span>
                  </td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full">
                      {user.roleName}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        (user.status ?? "Actif").toLowerCase() === "actif"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      ● {user.status ?? "Actif"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {user.creationDate
                      ? new Date(user.creationDate).toLocaleDateString("fr-FR")
                      : ""}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <MoreHorizontal className="text-gray-400 cursor-pointer" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL AddUser */}
      {showAddUser && (
        <AddUser
          onClose={() => setShowAddUser(false)}
          onUserAdded={handleUserAdded}
        />
      )}
    </div>
  );
};

export default Users;
