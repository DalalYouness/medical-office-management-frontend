import { Plus, Search } from "lucide-react";
import { useState } from "react";

const Patients = () => {
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const patientsData = [
    {
      name: "Dupont Marie",
      contact: "0612345678",
      age: 40,
      sex: "Féminin",
      address: "12 Rue des Lilas, Paris",
    },
    {
      name: "Martin Pierre",
      contact: "0698765432",
      age: 47,
      sex: "Masculin",
      address: "45 Avenue Victor Hugo, Lyon",
    },
    // ... plus de patients
  ];

  // Filtrage des patients selon searchQuery
  const filteredPatients = patientsData.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.contact.includes(searchQuery) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 relative">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-semibold">Gestion des Patients</h1>
          <p className="text-sm text-gray-500">
            Créer, modifier et rechercher des patients
          </p>
        </div>
        <button
          onClick={() => setShowAddPatient(true)}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700"
        >
          <Plus size={16} /> Nouveau Patient
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="relative w-full max-w-sm mb-4">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Rechercher un patient..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-3 py-2 text-sm border rounded-lg outline-none focus:ring-1 focus:ring-emerald-500 w-full"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="text-left px-4 py-3">Patient</th>
              <th className="text-left px-4 py-3">Contact</th>
              <th className="text-left px-4 py-3">Âge</th>
              <th className="text-left px-4 py-3">Sexe</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-3">
                  {patient.name}
                  <br />
                  <span className="text-xs text-gray-500">
                    {patient.address}
                  </span>
                </td>
                <td className="px-4 py-3">{patient.contact}</td>
                <td className="px-4 py-3">{patient.age} ans</td>
                <td className="px-4 py-3">{patient.sex}</td>
                <td className="px-4 py-3 text-right">{/* icons actions */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL AddPatient */}
      {/*
      {showAddPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <AddPatient onClose={() => setShowAddPatient(false)} />
        </div>
      )}
      */}
    </div>
  );
};

export default Patients;
