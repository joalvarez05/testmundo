import { getStatusBadgeColor } from "../data/productos";
import React, { useState } from "react";
import { logout } from "../utils/auth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  MessageSquareWarning,
  ClipboardList,
  FileCheck,
  AlertCircle,
  Plus,
  Trash2Icon,
  PencilIcon,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { Claim, FormErrors } from "../types/claim";
import FormInput from "../components/ui/FormInput";
import FormTextarea from "../components/ui/FormTextarea";
import FormSelect from "../components/ui/FormSelect";

interface ReclamosProps {
  onLogout: () => void; // onLogout es una función que no recibe argumentos y no retorna nada
}

const producto = [
  {
    id: "R323",
    name: "Panificados",
    fecha: "10/03/2025",
    empleado: "Juan Pablo Roque",
    sector: "Producción",
  },
  {
    id: "R2323",
    name: "Congelados",
    fecha: "10/03/2025",
    empleado: "Juan Pablo Roque",
    sector: "Sistemas",
  },
  {
    id: "R3323",
    name: "Pastelería",
    fecha: "10/03/2025",
    empleado: "Juan Pablo Roque",
    sector: "Ventas",
  },
  {
    id: "R4323",
    name: "Sandwichería",
    fecha: "10/03/2025",
    empleado: "Juan Pablo Roque",
    sector: "Salón",
  },
  {
    id: "R5323",
    name: "Sin TACC",
    fecha: "10/03/2025",
    empleado: "Juan Pablo Roque",
    sector: "Cocina",
  },
  {
    id: "R6323",
    name: "Tortilla Gruesa",
    fecha: "10/03/2025",
    empleado: "Juan Pablo Roque",
    sector: "Deposito",
  },
  {
    id: "R7323",
    name: "Bollito",
    fecha: "10/03/2025",
    empleado: "Juan Pablo Roque",
    sector: "Deposito",
  },
  {
    id: "R8323",
    name: "Croissant",
    fecha: "10/03/2025",
    empleado: "Juan Pablo Roque",
    sector: "Deposito",
  },
];
const Reclamos: React.FC<ReclamosProps> = ({ onLogout }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [productos, setProductos] = useState(producto);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [claim, setClaim] = useState<Claim>({
    title: "",
    description: "",
    receptionDate: new Date(),
    image: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!claim.title.trim()) {
      newErrors.title = "Título requerido";
    }

    if (!claim.description.trim()) {
      newErrors.description = "Descripción requerida";
    } else if (claim.description.trim().length < 10) {
      newErrors.description =
        "La descripción debe tener al menos 10 caracteres";
    }

    if (!claim.receptionDate) {
      newErrors.receptionDate = "Fecha requerida";
    }

    setErrors(newErrors);
    console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form submitted:", claim);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setClaim({
          title: "",
          description: "",
          receptionDate: new Date(),
          image: null,
        });
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
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
        setProductos((prevData) => prevData.filter((item) => item.id !== id));

        Swal.fire({
          title: "¡Eliminado!",
          text: "La solicitud ha sido eliminada.",
          icon: "success",
        });
      }
    });
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setClaim((prev) => ({ ...prev, [id]: value }));

    // Clear error for this field if it exists
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };
  const toggleExpand = (id: number) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClaim((prev) => ({ ...prev, receptionDate: new Date(e.target.value) }));

    if (errors.receptionDate) {
      setErrors((prev) => ({ ...prev, receptionDate: undefined }));
    }
  };

  // const handleImageChange = (file: File | null) => {
  //   setClaim((prev) => ({ ...prev, image: file }));

  //   if (errors.image) {
  //     setErrors((prev) => ({ ...prev, image: undefined }));
  //   }
  // };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().slice(0, 10);
  };

  const handleLogout = () => {
    logout(); // Elimina sesión
    toast("Cerrando sesión", { icon: "👋🏻" });

    setTimeout(() => {
      onLogout(); // Notifica a App que debe mostrar LoginPage
      window.location.href = "/"; // Redirige a la página de login
    }, 350);
  };

  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo y navegación */}
            <div className="flex items-center space-x-12">
              <div>
                <Link to="/">
                  <img
                    src="https://elmundopanaderias.com.ar/wp-content/uploads/2022/06/logo-elmundo-panaderias.svg"
                    alt="Logo"
                    className="h-8 w-auto object-contain"
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
                  to="/reclamos"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-amber-100 text-amber-800"
                >
                  <MessageSquareWarning className="inline-block w-5 h-5 mr-1" />
                  Reclamos
                </Link>
              </div>
            </div>

            {/* Usuario y Logout */}
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Historial de Reclamos
          </h1>
          <p className="mt-2 text-gray-600">
            Gestión de reclamos y novedades de la sucursal
          </p>
        </div>
        <div className="flex space-x-4">
          <div className="mb-8">
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center"
            >
              <Plus className="mr-2 h-5 w-5" />
              Crear Solicitud
            </button>
          </div>
          <div className="mb-8">
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center"
            >
              <Plus className="mr-2 h-5 w-5" />
              Crear Novedad
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Historial de Solicitudes
            </h2>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Pedido
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Responsable
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Detalles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productos.map((item) => (
                <React.Fragment key={item.id}>
                  <tr
                    onClick={() => toggleExpand(item.id)}
                    className="cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                      <span>{item.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-gray-600">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-gray-600">
                      {item.fecha}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-gray-600">
                      {item.empleado}
                    </td>

                    <td className=" whitespace-nowrap text-sm text-gray-500">
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
                    <td className="px-6 py-4 whitespace-nowrap text-md font-medium space-x-2">
                      <button className="text-sky-600 hover:text-sky-900">
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
                        <div className="space-y-4">
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
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        {isFormOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg overflow-auto max-h-[80vh] w-4/6 max-w-3xl transition-all duration-300 transform hover:shadow-xl">
              <div className="mt-4 me-5 flex justify-end">
                <button
                  type="button"
                  className="text-sm text-gray-600 hover:underline"
                  onClick={() => setIsFormOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <FormInput
                      id="title"
                      label="Nombre del Empleado"
                      placeholder="Empleado . . ."
                      value={claim.title}
                      onChange={handleChange}
                      error={errors.title}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <FormSelect
                      id="producto"
                      label="Categoria"
                      options={producto.map((emp) => ({
                        value: emp.id,
                        label: `${emp.name}`,
                      }))}
                      value="asd"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <FormSelect
                      id="producto"
                      label="Sector"
                      options={producto.map((emp) => ({
                        value: emp.id,
                        label: `${emp.sector}`,
                      }))}
                      value="asd"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <FormTextarea
                      id="description"
                      label="Descripción"
                      placeholder="Describi los detalles de tu reclamo"
                      value={claim.description}
                      onChange={handleChange}
                      error={errors.description}
                      required
                      rows={5}
                    />
                  </div>
                  <div>
                    <FormInput
                      id="receptionDate"
                      label="Fecha de recepción"
                      type="date"
                      value={formatDateForInput(claim.receptionDate)}
                      onChange={handleDateChange}
                      error={errors.receptionDate}
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    className="px-4 py-2 mr-4 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                    onClick={() => {
                      setClaim({
                        title: "",
                        description: "",
                        receptionDate: new Date(),
                        responsibleEmployee: "",
                        image: null,
                      });
                      setErrors({});
                    }}
                  >
                    Borrar formulario
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className={`px-6 py-2 rounded-md text-white font-medium transition-all duration-300 ${
                      isSubmitting
                        ? "bg-blue-400 cursor-not-allowed"
                        : isSuccess
                        ? "bg-green-600"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Enviando ...
                      </span>
                    ) : isSuccess ? (
                      <span className="flex items-center">
                        <FileCheck className="mr-2 h-5 w-5" />
                        Enviado!
                      </span>
                    ) : (
                      "Enviar"
                    )}
                  </button>
                </div>
              </form>
              {/* Error Toast */}
              <div
                className={`absolute bottom-[-15%] right-40 z-10 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md transition-all duration-300 transform ${
                  showError
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <p>Por favor, revisa los campos nuevamente!</p>
                </div>
              </div>

              {/* Success Toast */}
              <div
                className={`absolute bottom-[-15%] right-40 z-10  bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md transition-all duration-300 transform ${
                  isSuccess
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="flex items-center">
                  <FileCheck className="h-5 w-5 mr-2" />
                  <p>Reclamo enviado correctamente!</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Reclamos;
