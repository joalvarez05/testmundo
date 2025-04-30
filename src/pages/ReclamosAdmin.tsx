import {
  MessageSquareWarning,
  ClipboardList,
  Users,
  Trash2Icon,
  PencilIcon,
  CheckCircleIcon,
} from "lucide-react";
import { logout } from "../utils/auth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";

type Reclamo = {
  id: number;
  estado: "En Proceso" | "Terminado" | "En Espera";
  sucursal:
    | "Barrio Norte"
    | "Barrio Sur"
    | "Yerba Buena I"
    | "Yerba Buena II"
    | "Microcentro I";
  fecha: string;
  responsable: string;
};

function ReclamosAdmin() {
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [editedStatus, setEditedStatus] = useState<string>("");
  const [filteredData, setFilteredData] = useState([]);
  const reclamosAbiertos: Reclamo[] = [
    {
      id: 101,
      estado: "Terminado",
      fecha: "04-15-2025",
      responsable: "Juan Pérez",
      sucursal: "Barrio Norte",
    },
    {
      id: 102,
      estado: "Terminado",
      fecha: "04-15-2025",
      responsable: "María López",
      sucursal: "Barrio Sur",
    },
    {
      id: 103,
      estado: "Terminado",
      fecha: "04-15-2025",
      responsable: "Carlos Gómez",
      sucursal: "Yerba Buena I",
    },
    {
      id: 104,
      estado: "Terminado",
      fecha: "04-15-2025",
      responsable: "Ana Martínez",
      sucursal: "Yerba Buena II",
    },
    {
      id: 105,
      estado: "Terminado",
      fecha: "04-15-2025",
      responsable: "Pedro Sánchez",
      sucursal: "Microcentro I",
    },
  ];
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
  const [data, setData] = useState(reclamosAbiertos);
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

  const handleLogout = () => {
    logout();
    toast("Cerrando sesión", {
      icon: "👋🏻",
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 350);
  };
  return (
    <>
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
                  to="/"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  <ClipboardList className="inline-block w-5 h-5 mr-1" />
                  Mantenimiento
                </Link>
                <Link
                  to="/reclamosAdmin"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-amber-100 text-amber-800"
                >
                  <MessageSquareWarning className="inline-block w-5 h-5 mr-1" />
                  Reclamos
                </Link>

                <Link
                  to="/equipos"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700"
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
              <span className="text-gray-600 font-semibold">Administrador</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white py-2 px-4 text-md rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </nav>{" "}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Panel de Reclamos
          </h1>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* Encabezados */}
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  ID de Reclamo
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sucursal
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Responsable
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                    {item.id}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-500  text-center">
                      {item.fecha}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {item.sucursal}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {item.responsable}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {item.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 text-center">
                    {item.estado === "Terminado" ? null : (
                      <button
                        className="text-green-600 hover:text-green-800"
                        onClick={() => toggleCheck(item.id)}
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
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2Icon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export default ReclamosAdmin;
