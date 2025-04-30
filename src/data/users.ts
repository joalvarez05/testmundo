export interface User {
  username: string;
  password: string;
  name: string;
  role: string;
}

export const predefinedUsers: User[] = [
  {
    username: "admin",
    password: "admin123",
    name: "Administrador",
    role: "administrador",
  },
  {
    username: "sucursal1",
    password: "sucursal1",
    name: "Yerba Buena",
    role: "sucursal",
  },
];
