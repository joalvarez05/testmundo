import { useState, useEffect, useRef } from "react";
import {
  MessageSquareWarning,
  ClipboardList,
  Users,
  Trash2,
  Filter,
  Search,
  Plus,
  X,
  Check,
} from "lucide-react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import html2pdf from "html2pdf.js";
// Types
type EquipmentCategory =
  | "refrigeracion"
  | "coccion"
  | "preparacion"
  | "caja"
  | "otro";

interface Equipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  status: "Nuevo" | "Usado";
  dateAdded: string;
}

// Utility function for creating a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

function Equipos() {
  // State management
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [newEquipment, setNewEquipment] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<EquipmentCategory>("refrigeracion");
  const [selectedStatus, setSelectedStatus] = useState<"Nuevo" | "Usado">(
    "Nuevo"
  );
  const [filterCategory, setFilterCategory] = useState<
    EquipmentCategory | "todos"
  >("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingEquipment, setIsAddingEquipment] = useState(false);
  const [equipmentToDelete, setEquipmentToDelete] = useState<string | null>(
    null
  );
  const tableRef = useRef();
  const handleDownloadPDF = () => {
    const element = tableRef.current;

    const opt = {
      margin: 0.5,
      filename: "equipos-general.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
    };

    html2pdf().set(opt).from(element).save();
  };
  // Load from localStorage on component mount
  useEffect(() => {
    const savedEquipment = localStorage.getItem("bakeryEquipment");
    if (savedEquipment) {
      setEquipmentList(JSON.parse(savedEquipment));
    }
  }, []);

  // Save to localStorage whenever equipmentList changes
  useEffect(() => {
    localStorage.setItem("bakeryEquipment", JSON.stringify(equipmentList));
  }, [equipmentList]);

  // Handle logout
  const handleLogout = () => {
    logout();
    toast("Cerrando sesión", {
      icon: "👋🏻",
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 350);
  };

  // Add new equipment
  const handleAddEquipment = () => {
    if (newEquipment.trim() === "") {
      toast.error("Por favor ingrese un nombre de equipo");
      return;
    }

    const equipment: Equipment = {
      id: generateId(),
      name: newEquipment.trim(),
      category: selectedCategory,
      status: selectedStatus,
      dateAdded: new Date().toISOString(),
    };

    setEquipmentList([...equipmentList, equipment]);
    setNewEquipment("");
    setIsAddingEquipment(false);
    toast.success(`${newEquipment} agregado correctamente`);
  };

  // Delete equipment
  const confirmDelete = (id: string) => {
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
        const updatedList = equipmentList.filter((item) => item.id !== id);
        setEquipmentList(updatedList);
        setEquipmentToDelete(null);
        toast.success("Equipo eliminado correctamente");
      }
    });
  };

  const cancelDelete = () => {
    setEquipmentToDelete(null);
  };

  // Filter equipment list based on category and search term
  const filteredEquipment = equipmentList.filter((item) => {
    const matchesCategory =
      filterCategory === "todos" || item.category === filterCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Category display names
  const categoryNames: Record<EquipmentCategory, string> = {
    refrigeracion: "Refrigeración",
    coccion: "Cocción",
    preparacion: "Preparación",
    otro: "Otro",
  };

  // Status display colors
  const statusColors: Record<string, string> = {
    Nuevo: "bg-green-100 text-green-800",
    Usado: "bg-yellow-100 text-yellow-800",
  };

  // Category display colors
  const categoryColors: Record<string, string> = {
    refrigeracion: "bg-blue-100 text-blue-800",
    coccion: "bg-orange-100 text-orange-800",
    preparacion: "bg-purple-100 text-purple-800",
    otro: "bg-gray-100 text-gray-800",
  };

  // Mock function for logout (replace with actual implementation)
  const logout = () => {
    // Actual logout implementation would go here
    console.log("Logging out");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-12">
              <div>
                <Link to="/">
                  <img
                    src="https://elmundopanaderias.com.ar/wp-content/uploads/2022/06/logo-elmundo-panaderias.svg"
                    alt="logo de el mundo"
                    className="w-20 h-20"
                  />
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="px-3 py-2 flex rounded-md text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  <ClipboardList className="w-5 h-5 mr-1" />
                  Mantenimiento
                </Link>
                <Link
                  to="/reclamosAdmin"
                  className="px-3 py-2 flex rounded-md text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  <MessageSquareWarning className="w-5 h-5 mr-1" />
                  Reclamos
                </Link>

                <Link
                  to="/equipos"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-amber-100 text-amber-800"
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
            <div className="flex items-center space-x-4">
              <p className="mx-2 text-l font-semibold text-gray-900">
                Administrador{" "}
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Gestión de Equipos
          </h1>
        </div>

        {/* Control Panel */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search bar */}
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                placeholder="Buscar equipos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter dropdown */}
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                value={filterCategory}
                onChange={(e) =>
                  setFilterCategory(
                    e.target.value as EquipmentCategory | "todos"
                  )
                }
              >
                <option value="todos">Todas las categorías</option>
                <option value="refrigeracion">Refrigeración</option>
                <option value="coccion">Cocción</option>
                <option value="preparacion">Preparación</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            {/* Add button */}
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-200"
              onClick={() => setIsAddingEquipment(true)}
            >
              <Plus className="h-5 w-5 mr-2" />
              Agregar Equipo
            </button>
          </div>
        </div>

        {/* Add Equipment Form */}
        {isAddingEquipment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all animate-fadeIn">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Agregar Nuevo Equipo
                </h2>
                <button
                  onClick={() => setIsAddingEquipment(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="equipment-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nombre del Equipo
                  </label>
                  <input
                    type="text"
                    id="equipment-name"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                    placeholder="Ej: Heladera Mostrador"
                    value={newEquipment}
                    onChange={(e) => setNewEquipment(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="equipment-category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Categoría
                  </label>
                  <select
                    id="equipment-category"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                    value={selectedCategory}
                    onChange={(e) =>
                      setSelectedCategory(e.target.value as EquipmentCategory)
                    }
                  >
                    <option value="refrigeracion">Refrigeración</option>
                    <option value="coccion">Cocción</option>
                    <option value="preparacion">Preparación</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="equipment-status"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Estado
                  </label>
                  <select
                    id="equipment-status"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                    value={selectedStatus}
                    onChange={(e) =>
                      setSelectedStatus(e.target.value as "Nuevo" | "Usado")
                    }
                  >
                    <option value="Nuevo">Nuevo</option>
                    <option value="Usado">Usado</option>
                  </select>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    onClick={() => setIsAddingEquipment(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    onClick={handleAddEquipment}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Equipment List */}
        <div
          className="bg-white shadow overflow-hidden sm:rounded-md"
          ref={tableRef}
        >
          {filteredEquipment.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filteredEquipment.map((equipment) => (
                <li
                  key={equipment.id}
                  className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <p className="text-lg font-medium text-gray-900 truncate">
                        {equipment.name}
                      </p>
                      <span
                        className={`ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          categoryColors[equipment.category]
                        }`}
                      >
                        {categoryNames[equipment.category]}
                      </span>
                      <span
                        className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[equipment.status]
                        }`}
                      >
                        {equipment.status === "Nuevo"
                          ? "Nuevo"
                          : equipment.status === "Usado"
                          ? "Usado"
                          : ""}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Agregado el{" "}
                      {new Date(equipment.dateAdded).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {equipmentToDelete === equipment.id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDeleteEquipment(equipment.id)}
                          className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={cancelDelete}
                          className="inline-flex items-center p-1.5 border border-gray-300 rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => confirmDelete(equipment.id)}
                        title="Eliminar producto"
                        className="inline-flex items-center p-1.5 border border-transparent rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500 text-lg">
                {searchTerm || filterCategory !== "todos"
                  ? "No se encontraron equipos con los criterios especificados."
                  : "No hay equipos registrados. Agrega equipos usando el botón 'Agregar Equipo'."}
              </p>
            </div>
          )}
        </div>
        <button
          onClick={handleDownloadPDF}
          className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-600 mt-6"
        >
          Descargar PDF
        </button>

        {equipmentList.length > 0 && (
          <div className="mt-4 text-right text-sm text-gray-500">
            Total: {filteredEquipment.length}{" "}
            {filteredEquipment.length === 1 ? "equipo" : "equipos"}
            {filterCategory !== "todos" || searchTerm
              ? ` (de un total de ${equipmentList.length})`
              : ""}
          </div>
        )}
      </main>
    </div>
  );
}

export default Equipos;
