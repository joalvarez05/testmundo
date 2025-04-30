import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquareWarning,
  ClipboardList,
  Users,
  Pencil,
  Trash2,
  Key,
  Plus,
} from "lucide-react";
import { logout } from "../utils/auth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
interface User {
  id: number;
  name: string;
  email: string;
  telefono: string;
}

function Sucursales() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Barrio Norte",
      email: "barrionorte@elmundo.com",
      telefono: "283747686",
    },
    {
      id: 2,
      name: "Barrio Sur",
      email: "barriosur@elmundo.com",
      telefono: "123456789",
    },
    {
      id: 3,
      name: "Yerba Buena",
      email: "yerbabuena@elmundo.com",
      telefono: "987654321",
    },
  ]);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState<number | null>(null);
  const [isResettingPassword, setIsResettingPassword] = useState<number | null>(
    null
  );
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const handleLogout = () => {
    logout();
    toast("Cerrando sesión", {
      icon: "👋🏻",
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 350);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNewUser({ name: "", email: "", role: "", password: "" });
    setIsAddingUser(false);
    toast.success("Usuario agregado exitosamente");
  };

  const handleEditUser = (user: User) => {
    setUsers(users.map((u) => (u.id === user.id ? user : u)));
    setIsEditingUser(null);
    toast.success("Usuario actualizado exitosamente");
  };

  const handleDeleteUser = (id: number) => {
    Swal.fire({
      title: "¿Está seguro de eliminar este usuario?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter((user) => user.id !== id));
        Swal.fire({
          title: "¡Eliminado!",
          text: "Usuario eliminado exitosamente",
          icon: "success",
        });
      }
    });
  };

  const handleResetPassword = (id: number) => {
    setIsResettingPassword(null);
    toast.success("Contraseña reestablecida exitosamente");
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
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  <Users className="inline-block w-5 h-5 mr-1" />
                  Equipos
                </Link>
                <Link
                  to="/sucursales"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-amber-100 text-amber-800"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Gestión de Sucursales
            </h2>
            <button
              onClick={() => setIsAddingUser(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-orange-600 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Agregar Sucursal
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teléfono
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-center">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {user.telefono}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex space-x-2 justify-center">
                        <button
                          onClick={() => setIsEditingUser(user.id)}
                          className="text-blue-600 hover:text-blue-800 "
                          title="Editar sucursal"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setIsResettingPassword(user.id)}
                          className="text-amber-600 hover:text-amber-800"
                          title="Cambiar contraseña"
                        >
                          <Key className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Eliminar sucursal"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal para agregar usuario */}
      {isAddingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Agregar Nuevo Usuario</h3>
            <form onSubmit={handleAddUser}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                    className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                    className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddingUser(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para editar usuario */}
      {isEditingUser !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Editar Usuario</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const user = users.find((u) => u.id === isEditingUser);
                if (user) handleEditUser(user);
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={users.find((u) => u.id === isEditingUser)?.name}
                    onChange={(e) => {
                      const user = users.find((u) => u.id === isEditingUser);
                      if (user) {
                        setUsers(
                          users.map((u) =>
                            u.id === isEditingUser
                              ? { ...u, name: e.target.value }
                              : u
                          )
                        );
                      }
                    }}
                    className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={users.find((u) => u.id === isEditingUser)?.email}
                    onChange={(e) => {
                      const user = users.find((u) => u.id === isEditingUser);
                      if (user) {
                        setUsers(
                          users.map((u) =>
                            u.id === isEditingUser
                              ? { ...u, email: e.target.value }
                              : u
                          )
                        );
                      }
                    }}
                    className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditingUser(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para reestablecer contraseña */}
      {isResettingPassword !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Reestablecer Contraseña</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleResetPassword(isResettingPassword);
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsResettingPassword(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sucursales;
