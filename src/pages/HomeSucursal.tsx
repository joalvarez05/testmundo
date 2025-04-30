import React, { useState, useEffect } from "react";
import {
  MessageSquareWarning,
  Plus,
  ClipboardList,
  PencilIcon,
  ChevronDown,
  ChevronUp,
  Trash2Icon,
} from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  maintenanceData,
  getPriorityColor,
  getStatusBadgeColor,
  MaintenanceItem,
} from "../data/productos";
import { logout } from "../utils/auth";

function HomeSucursal() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [data, setData] = useState<MaintenanceItem[]>([]);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState("");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  useEffect(() => {
    setData(maintenanceData);
  }, []);

  const handleDelete = (id: number) => {
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
        setData((prevData) => prevData.filter((item) => item.id !== id));

        Swal.fire({
          title: "¡Eliminado!",
          text: "La solicitud ha sido eliminada.",
          icon: "success",
        });
      }
    });
  };

  const handleLogout = () => {
    logout();
    toast("Cerrando sesión", {
      icon: "👋🏻",
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 350);
  };
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
  const toggleExpand = (id: number) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-12">
              <div>
                <Link to="/">
                  <img
                    src="https://elmundopanaderias.com.ar/wp-content/uploads/2022/06/logo-elmundo-panaderias.svg"
                    className="h-8 w-auto object-contain"
                  />
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <button className="px-3 py-2 flex rounded-md text-sm font-medium bg-amber-100 text-amber-800">
                  <ClipboardList className=" w-5 h-5 mr-1" />
                  Mantenimiento
                </button>
                <Link
                  to="/reclamos"
                  className="px-3 py-2 flex rounded-md text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  <MessageSquareWarning className="  w-5 h-5 mr-1" />
                  Reclamos
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <p className="mx-2 text-l font-semibold text-gray-900">
                Barrio Norte
              </p>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Solicitudes de Mantenimiento
          </h1>
          <p className="mt-2 text-gray-600">
            Gestión de pedidos de mantenimiento de equipos
          </p>
        </div>

        {/* New Request Button */}
        <div className="mb-8">
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center"
          >
            <Plus className="mr-2 h-5 w-5" />
            Nuevo Pedido de Mantenimiento
          </button>
        </div>

        {/* Maintenance Request Form Modal */}
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
                  {equipoSeleccionado === "Heladera exhibidora" && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Parte de Heladera exhibidora
                      </label>
                      <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                        <option value="Unidad interior">Interior</option>
                        <option value="Unidad exterior">Motor</option>
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

        {/* Maintenance History */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Historial de Solicitudes
            </h2>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-x-auto w-full">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6  py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID Equipo
                  </th>
                  <th className="px-6  py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo de Equipo
                  </th>

                  {/* <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sector
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th> */}
                  <th className="px-6  py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6  py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prioridad
                  </th>

                  <th className="px-6  py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Detalles
                  </th>
                  <th className="px-6  py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <React.Fragment key={item.id}>
                    <tr
                      onClick={() => toggleExpand(item.id)}
                      className="cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex justify-center ">
                        <span>{item.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {item.equipmentType}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {item.fecha}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex justify-center ">
                        <span
                          className={`text-sm font-medium ${getPriorityColor(
                            item.priority
                          )}`}
                        >
                          {item.priority}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                        {expandedRow ? (
                          <span className="flex justify-center ">
                            Ver Menos
                            <ChevronUp />
                          </span>
                        ) : (
                          <span className="flex justify-center ">
                            Ver Más
                            <ChevronDown />
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 flex justify-center">
                        <button className="text-sky-600 hover:text-sky-900 ">
                          <PencilIcon className="w-5 h-5" />
                        </button>

                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2Icon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                    {expandedRow === item.id && (
                      <tr>
                        <td
                          colSpan={9}
                          className="px-6 py-4 font-semibold bg-gray-50 text-sm text-gray-700"
                        >
                          <div className=" w-full space-y-4">
                            <div className="min-w-[150px]">
                              <span className="font-medium tracking-wide">
                                Sector:
                              </span>
                              <span className="ps-2 text-sm text-gray-500">
                                {item.sector}
                              </span>
                            </div>
                            <div className="min-w-[150px]">
                              <span className="font-medium tracking-wide">
                                Estado:
                              </span>
                              <span className="ps-2">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(
                                    item.status
                                  )}`}
                                >
                                  {item.status}
                                </span>
                              </span>
                            </div>
                            <div className="flex-1 min-w-[200px]">
                              <span className="font-medium tracking-wide">
                                Descripción:
                              </span>
                              <span className="ps-2 text-sm text-gray-500">
                                {item.descripcion}
                              </span>
                            </div>
                            <div className="flex-1 min-w-[200px]">
                              <span className="font-medium tracking-wide">
                                Responsable:
                              </span>
                              <span className="ps-2 text-sm text-gray-500">
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
      </div>
    </div>
  );
}

export default HomeSucursal;
