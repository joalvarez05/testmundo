export type MaintenanceItem = {
  id: number;
  imagen: string;
  equipmentType: string;
  branch: string;
  sector: string;
  status: string;
  priority: string;
  responsible: string;
  fecha: string;
  descripcion: string;
};

export interface Maintenance {
  id: string;
  equipmentType: string;
  branch: string;
  sector: string;
  status: MaintenanceStatus;
  priority: Priority;
  responsible: string;
  fecha: string;
  descripcion: string;
}
type MaintenanceStatus = "En Proceso" | "En Espera" | "Terminado";
type Priority = "Normal" | "Intermedio" | "Urgente";

export const maintenanceData: Maintenance[] = [
  {
    id: "EQ001",
    equipmentType: "Heladera Mostrador",
    branch: "Suc 9 de Julio",
    sector: "Salón",
    status: "En Proceso",
    priority: "Urgente",
    responsible: "Juan Pérez",
    fecha: "14/10/2023",
    descripcion: "La heladera se enciende pero no enfría, queda en 25 grados",
  },
  {
    id: "EQ002",
    equipmentType: "Aire acondicionado 15000F",
    branch: "Suc Aconquija",
    sector: "Cocina",
    status: "Terminado",
    priority: "Normal",
    responsible: "María González",
    fecha: "07/11/2023",
    descripcion: "Hizo un ruido y dejó de funcionar.",
  },
  {
    id: "EQ003",
    equipmentType: "Computadora",
    branch: "Suc 25 de Mayo",
    sector: "Depósito",
    status: "En Espera",
    priority: "Intermedio",
    responsible: "Carlos Rodríguez",
    fecha: "12/11/2023",
    descripcion: "La notebook solo funciona con el cargador conectado.",
  },
];
export const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case "Urgente":
      return "text-red-600";
    case "Intermedio":
      return "text-yellow-600";
    case "Normal":
      return "text-green-600";
  }
};

export const getStatusBadgeColor = (status: MaintenanceStatus) => {
  switch (status) {
    case "En Proceso":
      return "bg-blue-100 text-blue-800";
    case "En Espera":
      return "bg-yellow-100 text-yellow-800";
    case "Terminado":
      return "bg-green-100 text-green-800";
  }
};
