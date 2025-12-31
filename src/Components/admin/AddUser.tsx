// src/components/AddUser.jsx
import { useState } from "react";
import { registerUser } from "../../api/UserApis";
import { toast } from "react-toastify";

const roles = [
  { value: "MEDECIN", label: "Médecin" },
  { value: "SECRETAIRE", label: "Secrétaire" },
  { value: "ADMIN", label: "Administrateur" },
];

export default function AddUser({ onClose, onUserAdded }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    phoneNumber: "",
    dateNaissance: "",
    password: "",
    roleName: "MEDECIN",
  });

  const handleSubmit = async () => {
    if (
      !formData.nom ||
      !formData.prenom ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.password ||
      !formData.dateNaissance
    ) {
      toast.error("Veuillez remplir tous les champs !", {
        position: "top-right",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await registerUser(formData);

      // créer fullName si backend ma returnash
      const newUser = {
        ...res.data,
        fullName: res.data.fullName || `${formData.prenom} ${formData.nom}`,
      };

      toast.success("Utilisateur créé avec succès !", {
        position: "top-right",
      });

      onUserAdded?.(newUser);
      onClose?.();
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la création !", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field, value) =>
    setFormData({ ...formData, [field]: value });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-30"
        onClick={onClose}
      ></div>
      <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-lg p-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Nouvel utilisateur
        </h1>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={(e) => updateField("prenom", e.target.value)}
              className="px-3 py-2 border rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="Nom"
              value={formData.nom}
              onChange={(e) => updateField("nom", e.target.value)}
              className="px-3 py-2 border rounded-lg w-full"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="px-3 py-2 border rounded-lg w-full"
          />
          <input
            type="tel"
            placeholder="06 12 34 56 78"
            value={formData.phoneNumber}
            onChange={(e) => updateField("phoneNumber", e.target.value)}
            className="px-3 py-2 border rounded-lg w-full"
          />
          <input
            type="date"
            value={formData.dateNaissance}
            onChange={(e) => updateField("dateNaissance", e.target.value)}
            className="px-3 py-2 border rounded-lg w-full"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={(e) => updateField("password", e.target.value)}
            className="px-3 py-2 border rounded-lg w-full"
          />
          <select
            value={formData.roleName}
            onChange={(e) => updateField("roleName", e.target.value)}
            className="px-3 py-2 border rounded-lg w-full"
          >
            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full mt-2 px-4 py-2 rounded-lg text-white ${
              loading ? "bg-gray-400" : "bg-[#2A9D90] hover:bg-[#23877d]"
            }`}
          >
            {loading ? "Chargement..." : "Créer l'utilisateur"}
          </button>
          <button
            onClick={onClose}
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
