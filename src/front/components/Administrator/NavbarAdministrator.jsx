import React from "react";
import { Link, useNavigate } from "react-router-dom";
export const NavbarAdministrator = ({ toggleSidebar }) => {
    const navigate = useNavigate();
  	const handleLogout = () => {
        sessionStorage.removeItem('access_token');
        //setToken(null);
        navigate('/'); 
    };
  return (
    <nav
      className="navbar navbar-expand-lg py-2"
      style={{
        background: 'linear-gradient(90deg, #1E3A8A 0%, #2563EB 100%)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      }}
    >
      <div className="container-fluid">
        {/* Botón para toggle del sidebar */}
        <button
          className="btn text-white me-3 d-flex align-items-center justify-content-center"
          onClick={toggleSidebar}
          style={{
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            border: 'none',
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)'
          }}
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        {/* Logo y título */}
        <div className="d-flex align-items-center">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center me-2"
            style={{
              width: '36px',
              height: '36px',
              backgroundColor: '#3B82F6',
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.4)'
            }}
          >
            <i className="fa-solid fa-moon text-white"></i>
          </div>
          <span className="navbar-brand mb-0 h1 text-white d-none d-sm-block">
            Panel de Administración
          </span>
        </div>

        {/* Elementos decorativos */}
        <div className="position-absolute" style={{ top: '10px', left: '30%', color: 'rgba(255,255,255,0.1)', fontSize: '20px' }}>✦</div>
        <div className="position-absolute" style={{ top: '40px', left: '60%', color: 'rgba(255,255,255,0.1)', fontSize: '20px' }}>✦</div>

        {/* Elementos de la derecha */}
        <div className="ms-auto d-flex align-items-center">
          {/* Indicador de estado */}
          <div className="d-none d-md-flex align-items-center me-4">
            <div
              className="rounded-circle me-2"
              style={{
                width: '10px',
                height: '10px',
                backgroundColor: '#4ADE80',
                boxShadow: '0 0 5px rgba(74, 222, 128, 0.5)'
              }}
            ></div>
            <span className="text-white small">Sistema activo</span>
          </div>

          {/* Botón de notificaciones */}
          {/* <button
            className="btn text-white me-3 d-flex align-items-center justify-content-center position-relative"
            style={{
              backgroundColor: 'rgba(59, 130, 246, 0.5)',
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border: 'none'
            }}
          >
            <i className="fa-solid fa-bell"></i>
            <span
              className="position-absolute d-flex align-items-center justify-content-center"
              style={{
                top: '5px',
                right: '5px',
                width: '18px',
                height: '18px',
                backgroundColor: '#EF4444',
                borderRadius: '50%',
                fontSize: '10px',
                fontWeight: 'bold'
              }}
            >3</span>
          </button> */}

          {/* Botón de perfil */}
          <div className="dropdown">
            <button
              className="btn dropdown-toggle d-flex align-items-center"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                backgroundColor: 'rgba(30, 58, 138, 0.5)',
                color: 'white',
                borderRadius: '10px',
                border: 'none',
                padding: '8px 15px'
              }}
            >
              <div
                className="rounded-circle d-flex align-items-center justify-content-center me-2"
                style={{
                  width: '30px',
                  height: '30px',
                  backgroundColor: '#4ADE80',
                  overflow: 'hidden'
                }}
              >
                <img
                  src="https://github.com/mdo.png"
                  alt="Admin"
                  className="w-100 h-100 object-fit-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/30?text=A";
                  }}
                />
              </div>
              <span className="d-none d-md-inline">Admin</span>
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuButton"
              style={{
                backgroundColor: '#1E3A8A',
                borderRadius: '10px',
                border: 'none',
                marginTop: '10px',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* <li>
                <a className="dropdown-item text-white" href="#">
                  <i className="fa-solid fa-user me-2"></i>
                  Mi perfil
                </a>
              </li>
              <li>
                <a className="dropdown-item text-white" href="#">
                  <i className="fa-solid fa-gear me-2"></i>
                  Configuración
                </a>
              </li> */}
              {/* <li><hr className="dropdown-divider" style={{ borderColor: 'rgba(255,255,255,0.1)' }} /></li> */}
              <li className="dropdown-item text-danger" onClick={()=>{handleLogout()}}>
               
                  <i className="fa-solid fa-right-from-bracket me-2" ></i>
                  Cerrar sesión
                
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};