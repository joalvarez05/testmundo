import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import Home from "./pages/Administrador";
import HomeSucursal from "./pages/HomeSucursal";
import Reclamos from "./pages/Reclamos";
import { isAuthenticated, getCurrentUser } from "./utils/auth";
import { Toaster } from "react-hot-toast";
import ReclamosAdmin from "./pages/ReclamosAdmin";
import Equipos from "./pages/Equipos";
import Sucursales from "./pages/Sucursales";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <>
        <Toaster />
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      </>
    );
  }

  const currentUser = getCurrentUser();

  return (
    <Router>
      <Toaster />
      <Routes>
        {/* Ruta para "Nosotros" */}
        <Route
          path="/reclamos"
          element={<Reclamos onLogout={handleLoginSuccess} />}
        />
        <Route path="/reclamosAdmin" element={<ReclamosAdmin />} />
        <Route path="/equipos" element={<Equipos />} />
        <Route path="/sucursales" element={<Sucursales />} />

        {/* Ruta principal según rol */}
        <Route
          path="/"
          element={
            currentUser?.role === "administrador" ? <Home /> : <HomeSucursal />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
