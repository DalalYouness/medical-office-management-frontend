import { Plus, Search, MoreHorizontal } from "lucide-react";

const Users = () => {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-semibold">Gestion des utilisateurs</h1>
          <p className="text-sm text-gray-500">
            Gérez les comptes et les accès du cabinet médical
          </p>
        </div>

        <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700">
          <Plus size={16} />
          Nouvel utilisateur
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total utilisateurs", value: 8, extra: "+12% ce mois" },
          { label: "Utilisateurs actifs", value: 6 },
          { label: "Utilisateurs inactifs", value: 2 },
          { label: "Médecins", value: 3 },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <p className="text-xs text-gray-500">{item.label}</p>
              <p className="text-2xl font-semibold">{item.value}</p>
              {item.extra && (
                <p className="text-xs text-emerald-600">{item.extra}</p>
              )}
            </div>
            <div className="h-9 w-9 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
              👤
            </div>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {[
            "Tous",
            "Médecin",
            "Secrétaire",
            "Infirmier(e)",
            "Administrateur",
            "Comptable",
          ].map((role, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded-full text-xs border ${
                role === "Médecin"
                  ? "bg-emerald-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            className="pl-9 pr-3 py-2 text-sm border rounded-lg outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">
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
            {[
              {
                name: "Sophie Martin",
                email: "sophie.martin@cabinet-medical.fr",
                phone: "06 12 34 56 78",
                role: "Médecin",
                status: "Actif",
                date: "15 janv. 2024",
                initials: "SM",
              },
              {
                name: "Jean Dubois",
                email: "jean.dubois@cabinet-medical.fr",
                phone: "06 23 45 67 89",
                role: "Médecin",
                status: "Actif",
                date: "20 févr. 2024",
                initials: "JD",
              },
              {
                name: "Antoine David",
                email: "antoine.david@cabinet-medical.fr",
                phone: "06 89 01 23 45",
                role: "Médecin",
                status: "Inactif",
                date: "18 sept. 2023",
                initials: "AD",
              },
            ].map((user, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-3 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-semibold">
                    {user.initials}
                  </div>
                  <span className="font-medium">{user.name}</span>
                </td>

                <td className="px-4 py-3">
                  <p>{user.email}</p>
                  <p className="text-xs text-gray-500">{user.phone}</p>
                </td>

                <td className="px-4 py-3">
                  <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full">
                    {user.role}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      user.status === "Actif"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    ● {user.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-gray-500">
                  {user.date}
                </td>

                <td className="px-4 py-3 text-right">
                  <MoreHorizontal className="text-gray-400 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
