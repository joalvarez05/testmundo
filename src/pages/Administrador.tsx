import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import html2pdf from "html2pdf.js";
import Swal from "sweetalert2";
import {
  ClipboardList,
  MessageSquareWarning,
  Users,
  PencilIcon,
  PlusCircleIcon,
  CheckCircleIcon,
  Trash2Icon,
} from "lucide-react";
import { logout } from "../utils/auth";
import { Link } from "react-router-dom";

type MaintenanceStatus = "En Proceso" | "En Espera" | "Terminado";
type Priority = "Normal" | "Intermedio" | "Urgente";

interface Maintenance {
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

function Home() {
  const tableRef = useRef();
  const handleDownloadPDF = () => {
    const element = tableRef.current;

    const opt = {
      margin: 0.5,
      filename: "historial-mantenimiento.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
    };

    html2pdf().set(opt).from(element).save();
  };
  const maintenanceData: Maintenance[] = [
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
      fecha: "24/11/2023",
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
      fecha: "12/12/2023",
      descripcion: "La notebook solo funciona con el cargador conectado.",
    },
  ];
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [editedStatus, setEditedStatus] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Maintenance[]>([]);

  const [equipoSeleccionado, setEquipoSeleccionado] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [data, setData] = useState<Maintenance[]>([]);
  const [activeTab, setActiveTab] = useState("admin");
  const [check, setCheck] = useState<{ [key: string]: boolean }>({});
  const userData = JSON.parse(sessionStorage.getItem("currentUser") || "{}");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [priorityFilter, setPriorityFilter] = useState("Todas");
  const sortedData = [...data].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );
  useEffect(() => {
    const sorted = [...data].sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );
    const filtrado =
      priorityFilter === "Todas"
        ? sorted
        : sorted.filter((item) => item.priority === priorityFilter);
    setFilteredData(filtrado);
  }, [data, priorityFilter]);

  useEffect(() => {
    setData(maintenanceData);
    const initialCheckState: { [key: string]: boolean } = {};
    maintenanceData.forEach((item) => {
      initialCheckState[item.id] = false;
    });
    setCheck(initialCheckState);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Estás seguro de enviar la solicitud?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, enviar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "¡Enviado!",
          text: "La solicitud ha sido enviada correctamente.",
          icon: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 250);
      }
    });
  };
  const toggleCheck = (id: string) => {
    Swal.fire({
      title: "¿Completar mantenimiento?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, terminar",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, status: "Terminado" } : item
          )
        );
        setCheck((prev) => ({
          ...prev,
          [id]: !prev[id],
        }));
        Swal.fire(
          "Completado!",
          "El mantenimiento ha sido completado.",
          "success"
        );
      }
    });
  };
  const handleLogout = () => {
    logout();
    toast("Cerrando sesión", { icon: "👋🏻" });
    setTimeout(() => window.location.reload(), 350);
  };
  const toggleExpand = (id: number) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "Urgente":
        return "text-red-600";
      case "Intermedio":
        return "text-yellow-600";
      case "Normal":
        return "text-green-600";
    }
  };

  const getStatusBadgeColor = (status: MaintenanceStatus) => {
    switch (status) {
      case "En Proceso":
        return "bg-blue-100 text-blue-800";
      case "En Espera":
        return "bg-yellow-100 text-yellow-800";
      case "Terminado":
        return "bg-green-100 text-green-800";
    }
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prev) => prev.filter((item) => item.id !== id));
        Swal.fire("¡Eliminado!", "La solicitud ha sido eliminada.", "success");
      }
    });
  };
  const handleEdit = (id: string) => {
    const itemToEdit = filteredData.find((item) => item.id === id);
    setEditRowId(id);
    setEditedStatus(itemToEdit?.status || "");
  };
  const handleSaveStatus = (id: string) => {
    const updatedData = filteredData.map((item) =>
      item.id === id ? { ...item, status: editedStatus } : item
    );
    setFilteredData(updatedData);
    setEditRowId(null); // cerrar modo edición
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <div className="flex items-center">
                <Link to="/">
                  <img
                    src="https://elmundopanaderias.com.ar/wp-content/uploads/2022/06/logo-elmundo-panaderias.svg"
                    alt="logo de el mundo"
                    className="w-20 h-20"
                  />
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  className="px-3 py-2 rounded-md text-sm font-medium 
                bg-amber-100 text-amber-800 hover:text-gray-700"
                  to="/"
                >
                  <ClipboardList className="inline-block w-5 h-5 mr-1" />
                  Mantenimiento
                </Link>
                <Link
                  to="/reclamosAdmin"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "claims"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("claims")}
                >
                  <MessageSquareWarning className="inline-block w-5 h-5 mr-1" />
                  Reclamos
                </Link>

                <Link
                  to="/equipos"
                  className="px-3 py-2 rounded-md text-sm font-medium  text-gray-500 hover:text-gray-700"
                >
                  <Users className="inline-block w-5 h-5 mr-1" />
                  Equipos
                </Link>
                <Link
                  to="/sucursales"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  <Users className="inline-block w-5 h-5 mr-1" />
                  Sucursales
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600 font-semibold">
                {userData.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white py-2 px-4 text-md rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Panel de Mantenimientos
          </h1>
          <div className="space-x-3">
            <button
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              onClick={() => setIsFormOpen(true)}
            >
              <PlusCircleIcon className="inline-block w-5 h-5 mr-1" />
              Agregar
            </button>
          </div>
        </div>
        {isFormOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Nuevo Pedido de Mantenimiento
                </h2>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="empleado"
                  >
                    Empleado
                  </label>
                  <input
                    required
                    name="empleado"
                    id="empleado"
                    type="text"
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Ingrese el nombre del empleado"
                  />
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imagen del Problema
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-600">
                      Arrastra una imagen o haz clic para seleccionar
                    </p>
                    <input type="file" className="hidden" accept="image/*" />
                  </div>
                </div> */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Equipo Afectado
                  </label>
                  <select
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                    onChange={(e) => setEquipoSeleccionado(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Elegir un equipo
                    </option>
                    <option value="Heladera exhibidora">
                      Heladera exhibidora
                    </option>
                    <option value="Congelador">Congelador</option>
                    <option value="Aire acondicionado">
                      Aire acondicionado
                    </option>
                    <option value="Amasadora">Amasadora</option>
                    <option value="Sobadora">Sobadora</option>
                    <option value="Microondas">Microondas</option>
                    <option value="Freidora">Freidora</option>
                    <option value="Computadora">Computadora</option>
                  </select>

                  {/* Mostrar este select solo si eligieron aire acondicionado */}
                  {equipoSeleccionado === "Aire acondicionado" && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Parte del Aire Acondicionado
                      </label>
                      <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                        <option value="Unidad interior">Unidad interior</option>
                        <option value="Unidad exterior">Unidad exterior</option>
                      </select>
                    </div>
                  )}
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="sector"
                  >
                    Sector
                  </label>
                  <select
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                    id="sector"
                    name="sector"
                  >
                    <option disabled>Selecciona el sector</option>
                    <option value="Cocina">Cocina</option>
                    <option value="Oficina">Oficina</option>
                    <option value="Deposito">Deposito</option>
                    <option value="Salon">Salon</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción del Problema
                  </label>
                  <textarea
                    rows={4}
                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                    placeholder="Describe el problema que presenta el equipo..."
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Enviar Solicitud
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="bg-white shadow-md rounded-lg overflow-x-auto w-full">
          <div className="mb-4 flex justify-end items-center m-2">
            <label className="mr-2 font-medium text-gray-700">
              Filtrar por Prioridad:
            </label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-md font-medium"
            >
              <option
                value="Todas"
                className="bg-blue-100 text-blue-800  font-medium"
              >
                Todas
              </option>
              <option
                value="Urgente"
                className="bg-red-100 text-red-800 font-medium"
              >
                Urgente
              </option>
              <option
                value="Intermedio"
                className="bg-yellow-100 text-yellow-800 font-medium"
              >
                Intermedio
              </option>
              <option
                value="Normal"
                className=" bg-green-100 text-green-800 font-medium"
              >
                Normal
              </option>
            </select>
          </div>

          <div ref={tableRef}>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {/* Encabezados */}
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                    ID Equipo
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo de Equipo
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sucursal
                  </th>

                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prioridad
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>

                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item) => (
                  <React.Fragment key={item.id}>
                    <tr
                      onClick={() => toggleExpand(item.id)}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {item.equipmentType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {item.branch}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {editRowId === item.id ? (
                          <select
                            value={editedStatus}
                            onChange={(e) => setEditedStatus(e.target.value)}
                            className="border-gray-300 p-1 rounded-md text-sm"
                          >
                            <option value="En Espera">En Espera</option>
                            <option value="En Proceso">En Proceso</option>
                            <option value="Terminado">Terminado</option>
                          </select>
                        ) : (
                          <span
                            className={`px-2 inline-flex text-xs  leading-5 font-semibold rounded-full ${
                              check[item.id]
                                ? "bg-green-100 text-green-800"
                                : getStatusBadgeColor(item.status)
                            }`}
                          >
                            {item.status}
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span
                          className={`text-sm font-medium ${getPriorityColor(
                            item.priority
                          )}`}
                        >
                          {item.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="text-sm font-semibold text-gray-500">
                          {item.fecha}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 text-center">
                        {item.status === "Terminado" ? null : (
                          <button
                            onClick={() => toggleCheck(item.id)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <CheckCircleIcon className="w-5 h-5" />
                          </button>
                        )}

                        {editRowId === item.id ? (
                          <button
                            className="text-emerald-600 hover:text-emerald-800"
                            onClick={() => handleSaveStatus(item.id)}
                          >
                            Guardar
                          </button>
                        ) : (
                          <button
                            className="text-sky-600 hover:text-sky-900"
                            onClick={() => handleEdit(item.id)}
                          >
                            <PencilIcon className="w-5 h-5" />
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2Icon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                    {expandedRow === item.id && (
                      <tr>
                        <td
                          colSpan={9}
                          className="px-6 py-4 bg-gray-50 text-sm text-gray-700"
                        >
                          <div className="space-y-2">
                            <div>
                              <span className="font-semibold">
                                Descripción:
                              </span>
                              <span className="ms-2 tracking-wide">
                                {item.descripcion}
                              </span>
                            </div>
                            <div>
                              <span className="font-semibold">Sector:</span>
                              <span className="ms-2 tracking-wide">
                                {item.sector}
                              </span>
                            </div>
                            <div>
                              <span className="font-semibold">
                                Responsable:
                              </span>
                              <span className="ms-2 tracking-wide">
                                {item.responsible}
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button
          onClick={handleDownloadPDF}
          className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-600 mt-6"
        >
          Descargar PDF
        </button>
      </main>
    </div>
  );
}

export default Home;
