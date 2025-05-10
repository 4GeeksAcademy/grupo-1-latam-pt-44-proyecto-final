import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Sidebar = ({ changeTable }) => {
  const [activeTab, setActiveTab] = useState("users");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    changeTable(tab);
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-4 vh-100 position-relative"
      style={{
        width: "280px",
        background: 'linear-gradient(180deg, #1E3A8A 0%, #0A1744 100%)',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        boxShadow: '4px 0 15px rgba(0, 0, 0, 0.2)'
      }}
    >
      {/* Elementos decorativos */}
      <div className="position-absolute" style={{ top: '10%', left: '15%', color: 'rgba(255,255,255,0.2)', fontSize: '20px' }}>✦</div>
      <div className="position-absolute" style={{ bottom: '20%', right: '15%', color: 'rgba(255,255,255,0.2)', fontSize: '20px' }}>✦</div>

      {/* Logo */}
      <div className="d-flex align-items-center mb-4 pb-2">
        <div className="rounded-circle d-flex align-items-center justify-content-center me-3"
          style={{ width: '40px', height: '40px', backgroundColor: '#3B82F6' }}>
          <i className="fa-solid fa-moon text-white"></i>
        </div>
        <span className="fs-4 fw-bold text-white">Dormire</span>
      </div>

      <div className="border-top border-bottom py-3 mb-4" style={{ borderColor: 'rgba(255,255,255,0.1) !important' }}>
        <p className="text-white-50 small mb-1">ADMINISTRACIÓN</p>
      </div>

      {/* Menú de navegación */}
      <ul className="nav nav-pills flex-column mb-auto gap-2">
        <li className="nav-item" onClick={() => handleTabChange("users")}>
          <div
            className={`nav-link d-flex align-items-center ${activeTab === "users" ? "active" : ""}`}
            style={{
              backgroundColor: activeTab === "users" ? '#3B82F6' : 'rgba(59, 130, 246, 0.1)',
              color: 'white',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <i className="fa-solid fa-users me-3"></i>
            Usuarios
          </div>
        </li>
        <li className="nav-item" onClick={() => handleTabChange("categories")}>
          <div
            className={`nav-link d-flex align-items-center ${activeTab === "categories" ? "active" : ""}`}
            style={{
              backgroundColor: activeTab === "categories" ? '#3B82F6' : 'rgba(59, 130, 246, 0.1)',
              color: 'white',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <i className="fa-solid fa-folder me-3"></i>
            Categorías
          </div>
        </li>
        <li className="nav-item" onClick={() => handleTabChange("stories")}>
          <div
            className={`nav-link d-flex align-items-center ${activeTab === "stories" ? "active" : ""}`}
            style={{
              backgroundColor: activeTab === "stories" ? '#3B82F6' : 'rgba(59, 130, 246, 0.1)',
              color: 'white',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <i className="fa-solid fa-book me-3"></i>
            Historias
          </div>
        </li>
      </ul>

      {/* Sección de configuración */}
      {/* <div className="border-top pt-3 mt-4" style={{ borderColor: 'rgba(255,255,255,0.1) !important' }}>
        <p className="text-white-50 small mb-2">CONFIGURACIÓN</p>
        <div
          className="d-flex align-items-center p-2 rounded"
          style={{
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            color: 'white',
            borderRadius: '10px',
            cursor: 'pointer',
            marginBottom: '10px'
          }}
        >
          <i className="fa-solid fa-gear me-3"></i>
          Ajustes
        </div>
      </div> */}

      {/* Perfil de usuario */}
      {/* <div className="dropdown mt-auto">
        <a
          href="#"
          className="d-flex align-items-center text-decoration-none dropdown-toggle p-2 rounded"
          id="dropdownUser"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{
            backgroundColor: 'rgba(30, 58, 138, 0.5)',
            color: 'white',
            borderRadius: '10px'
          }}
        >
          <div
            className="rounded-circle d-flex align-items-center justify-content-center me-2"
            style={{
              width: '38px',
              height: '38px',
              backgroundColor: '#4ADE80',
              overflow: 'hidden'
            }}
          >
            <img
              src="https://github.com/mdo.png"
              alt="Usuario"
              className="w-100 h-100 object-fit-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/38?text=U";
              }}
            />
          </div>
          <div className="d-flex flex-column">
            <strong className="d-block">Admin</strong>
            <small className="text-white-50">Administrador</small>
          </div>
        </a>
        <ul
          className="dropdown-menu dropdown-menu-dark shadow"
          aria-labelledby="dropdownUser"
          style={{
            backgroundColor: '#1E3A8A',
            borderRadius: '10px',
            border: 'none',
            marginTop: '10px'
          }}
        >
          <li>
            <a className="dropdown-item" href="#">
              <i className="fa-solid fa-user me-2"></i>
              Perfil
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              <i className="fa-solid fa-sliders me-2"></i>
              Configuración
            </a>
          </li>
          <li><hr className="dropdown-divider" style={{ borderColor: 'rgba(255,255,255,0.1)' }} /></li>
          <li>
            <a className="dropdown-item text-danger" href="#">
              <i className="fa-solid fa-right-from-bracket me-2"></i>
              Cerrar sesión
            </a>
          </li>
        </ul>
      </div> */}
    </div>
  );
};