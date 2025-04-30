import { User, predefinedUsers } from "../data/users";

export const authenticateUser = (
  username: string,
  password: string
): User | null => {
  const user = predefinedUsers.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const { password, ...userWithoutPassword } = user;
    sessionStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
    return user;
  }

  return null;
};

export const isAuthenticated = (): boolean => {
  return sessionStorage.getItem("currentUser") !== null;
};

export const logout = (): void => {
  sessionStorage.removeItem("currentUser");
};
export const getCurrentUser = (): User | null => {
  const storedUser = sessionStorage.getItem("currentUser");
  return storedUser ? JSON.parse(storedUser) : null;
};
