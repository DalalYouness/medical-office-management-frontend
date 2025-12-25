import { useEffect, useState } from "react";

const roles = [
  { value: "medecin", label: "Médecin" },
  { value: "secretaire", label: "Secrétaire" },
  { value: "admin", label: "Administrateur" },
];

export default function AddUser({ editingUserProp = null, onClose }) {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    role: "medecin",
    status: "actif",
  });
  const [errors, setErrors] = useState({});
  const [existingEmails] = useState([
    "marie.dupont@cabinet.fr",
    "jean.bernard@cabinet.fr",
  ]);

  useEffect(() => {
    if (editingUserProp) {
      setFormData({
        nom: editingUserProp.nom,
        prenom: editingUserProp.prenom,
        email: editingUserProp.email,
        telephone: editingUserProp.telephone,
        role: editingUserProp.role,
        status: editingUserProp.status,
      });
    }
  }, [editingUserProp]);

  const validateForm = () => {
    const newErrors = {};

    const emailExists = existingEmails.some(
      (email) =>
        email.toLowerCase() === formData.email.toLowerCase() &&
        (!editingUserProp ||
          editingUserProp.email.toLowerCase() !== formData.email.toLowerCase())
    );

    if (emailExists) {
      newErrors.email = "Cet email est déjà utilisé par un autre utilisateur";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (
      !formData.nom ||
      !formData.prenom ||
      !formData.email ||
      !formData.telephone
    ) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    if (!validateForm()) return;

    console.log("Utilisateur soumis:", formData);
    alert(`Utilisateur ${editingUserProp ? "modifié" : "créé"} avec succès!`);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* fond semi-transparent */}
      <div
        className="absolute inset-0 bg-black bg-opacity-20"
        onClick={onClose}
      ></div>

      {/* modal */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {editingUserProp ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
        </h1>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prénom
              </label>
              <input
                type="text"
                value={formData.prenom}
                onChange={(e) =>
                  setFormData({ ...formData, prenom: e.target.value })
                }
                placeholder="Youness"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D90]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <input
                type="text"
                value={formData.nom}
                onChange={(e) =>
                  setFormData({ ...formData, nom: e.target.value })
                }
                placeholder="Dalal"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D90]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder="younessdalal1@gmail.com"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#2A9D90]"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone
            </label>
            <input
              type="tel"
              value={formData.telephone}
              onChange={(e) =>
                setFormData({ ...formData, telephone: e.target.value })
              }
              placeholder="06 12 34 56 78"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D90]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rôle
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A9D90]"
            >
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-[#2A9D90] text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {editingUserProp ? "Enregistrer" : "Créer l'utilisateur"}
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
