import { LayoutDashboard, Users, Calendar, Settings } from "lucide-react";

export const adminMenu = [
  {
    label: "Tableau de bord",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Utilisateurs",
    path: "/admin/users",
    icon: Users,
  },
  {
    label: "Paramètres",
    path: "/admin/settings",
    icon: Settings,
  },
];

export const patientMenu = [
  {
    label: "Tableau de bord",
    path: "/patient/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Patients",
    path: "/patient/patients",
    icon: Users,
  },
  {
    label: "Rendez-vous",
    path: "/patient/appointments",
    icon: Calendar,
  },
  {
    label: "Paramètres",
    path: "/patient/settings",
    icon: Settings,
  },
];
