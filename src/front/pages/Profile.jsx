import React, { useState, useEffect } from "react";

export const Profile = () => {
  // Estados para manejar los datos del usuario, carga y errores
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    nombre: "",
    apellido: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Función para obtener los datos del usuario
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/usuario`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        let msg = "Error al obtener los datos del usuario";
        switch (response.status) {
          case 401: msg = "No autorizado. Verifica tu token."; break;
          case 403: msg = "Acceso denegado. No tienes permisos."; break;
          case 404: msg = "Usuario no encontrado."; break;
          case 500: msg = "Error interno del servidor."; break;
          default:
            const errorData = await response.json();
            msg = errorData?.msg || msg;
        }
        throw new Error(msg);
      }

      const data = await response.json();
      setUserData(data);
      
      // Inicializar el formulario con los datos del usuario
      setFormData({
        email: data.email || "",
        username: data.username || "",
        nombre: data.nombre || "",
        apellido: data.apellido || "",
        password: "",
        confirmPassword: ""
      });
      
      setError(null);
    } catch (error) {
      setError(error.message || "Error inesperado al cargar datos del usuario");
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    fetchUserData();
  }, []);

  // Limpiar mensaje de éxito después de 5 segundos
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Función para manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar errores al editar
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  // Función para validar el formulario
  const validateForm = () => {
    const errors = {};
    
    // Validar email
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "El correo electrónico no es válido";
    }
    
    // Validar username
    if (formData.username && formData.username.length < 3) {
      errors.username = "El nombre de usuario debe tener al menos 3 caracteres";
    }
    
    // Validar contraseña si se ha ingresado
    if (formData.password) {
      if (formData.password.length < 6) {
        errors.password = "La contraseña debe tener al menos 6 caracteres";
      }
      
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Las contraseñas no coinciden";
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Función para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar formulario
    if (!validateForm()) {
      return;
    }
    
    try {
      setActionLoading(true);
      setError(null);
      
      // Preparar datos para enviar
      const dataToSend = {
        email: formData.email,
        username: formData.username,
        nombre: formData.nombre,
        apellido: formData.apellido
      };
      
      // Solo incluir contraseña si se ha ingresado
      if (formData.password) {
        dataToSend.password = formData.password;
      }
      
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/usuario/${userData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        let msg = "Error al actualizar el perfil";
        switch (response.status) {
          case 401: msg = "No autorizado. Verifica tu token."; break;
          case 403: msg = "Acceso denegado. No tienes permisos."; break;
          case 404: msg = "Usuario no encontrado."; break;
          case 400: msg = "Datos inválidos. Verifica la información."; break;
          case 500: msg = "Error interno del servidor."; break;
          default:
            try {
              const errorData = await response.json();
              msg = errorData?.msg || msg;
            } catch (e) {
              // Si no se puede parsear la respuesta como JSON
              msg = "Error al actualizar el perfil";
            }
        }
        throw new Error(msg);
      }

      // Mostrar mensaje de éxito
      setSuccessMessage("Perfil actualizado correctamente");
      
      // Actualizar datos del usuario
      fetchUserData();
      
      // Limpiar campos de contraseña
      setFormData(prev => ({
        ...prev,
        password: "",
        confirmPassword: ""
      }));
      
    } catch (error) {
      setError(error.message || "Error inesperado al actualizar el perfil");
      console.error("Error updating profile:", error);
    } finally {
      setActionLoading(false);
    }
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div
      className="w-100 position-relative"
      style={{
        background: 'linear-gradient(135deg, #2563EB 0%, #0A1744 100%)',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        minHeight: '100vh',
        height: 'auto',
        paddingBottom: '30px'
      }}
    >
      {/* Elementos decorativos */}
      <div className="position-absolute" style={{ top: '10%', left: '5%', color: 'rgba(255,255,255,0.3)', fontSize: '24px' }}>✦</div>
      <div className="position-absolute" style={{ top: '15%', right: '10%', color: 'rgba(255,255,255,0.3)', fontSize: '24px' }}>✦</div>
      <div className="position-absolute" style={{ bottom: '20%', left: '8%', color: 'rgba(255,255,255,0.3)', fontSize: '24px' }}>✦</div>
      <div className="position-absolute" style={{ bottom: '10%', right: '5%', color: 'rgba(255,255,255,0.3)', fontSize: '24px' }}>✦</div>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="bg-dark bg-opacity-25 rounded-4 p-4 shadow-lg">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-white m-0">
                  <i className="fa-solid fa-user-pen me-2"></i>
                  Mi Perfil
                </h1>
              </div>

              {/* Mostrar mensaje de éxito si existe */}
              {successMessage && (
                <div className="alert alert-success mb-4 rounded-3 animate__animated animate__fadeIn">
                  <i className="fa-solid fa-circle-check me-2"></i>
                  {successMessage}
                </div>
              )}

              {/* Mostrar mensaje de error si existe */}
              {error && (
                <div className="alert alert-danger mb-4 rounded-3 animate__animated animate__fadeIn">
                  <i className="fa-solid fa-circle-exclamation me-2"></i>
                  {error}
                </div>
              )}

              {/* Mostrar indicador de carga */}
              {loading && !error && (
                <div className="text-center py-5">
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <p className="text-white mt-3">Cargando datos del perfil...</p>
                </div>
              )}

              {/* Mostrar formulario si no hay error y no está cargando */}
              {!loading && !error && userData && (
                <div className="row">
                  <div className="col-md-4 mb-4 mb-md-0">
                    <div className="bg-dark bg-opacity-25 rounded-4 p-4 h-100">
                      <div className="text-center mb-4">
                        <div 
                          className="avatar-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                          style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(59, 130, 246, 0.3)',
                            border: '2px solid rgba(59, 130, 246, 0.5)',
                            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
                          }}
                        >
                          <i className="fa-solid fa-user fa-3x text-white-50"></i>
                        </div>
                        <h4 className="text-white mb-1">{userData.nombre} {userData.apellido}</h4>
                        <p className="text-white-50 mb-0">@{userData.username}</p>
                      </div>
                      
                      <div className="user-info">
                        {/* Correo electrónico - Corregido para mantener el círculo */}
                        <div className="d-flex mb-3">
                          <div className="icon-circle me-3 d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{
                              width: '40px',
                              height: '40px',
                              minWidth: '40px', /* Asegura el ancho mínimo */
                              borderRadius: '50%',
                              backgroundColor: 'rgba(59, 130, 246, 0.2)'
                            }}
                          >
                            <i className="fa-solid fa-envelope text-info"></i>
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-white-50 small mb-0">Correo electrónico</p>
                            <p className="text-white mb-0 text-truncate">{userData.email}</p>
                          </div>
                        </div>
                        
                        {/* ID de usuario */}
                        <div className="d-flex mb-3">
                          <div className="icon-circle me-3 d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{
                              width: '40px',
                              height: '40px',
                              minWidth: '40px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(59, 130, 246, 0.2)'
                            }}
                          >
                            <i className="fa-solid fa-id-card text-info"></i>
                          </div>
                          <div>
                            <p className="text-white-50 small mb-0">ID de usuario</p>
                            <p className="text-white mb-0">{userData.id}</p>
                          </div>
                        </div>
                        
                        {/* Estado */}
                        <div className="d-flex">
                          <div className="icon-circle me-3 d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{
                              width: '40px',
                              height: '40px',
                              minWidth: '40px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(59, 130, 246, 0.2)'
                            }}
                          >
                            <i className="fa-solid fa-circle-check text-info"></i>
                          </div>
                          <div>
                            <p className="text-white-50 small mb-0">Estado</p>
                            <p className="text-white mb-0">
                              {userData.activo ? (
                                <span className="badge bg-success rounded-pill px-3 py-2">Activo</span>
                              ) : (
                                <span className="badge bg-danger rounded-pill px-3 py-2">Inactivo</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-8">
                    <div className="bg-dark bg-opacity-25 rounded-4 p-4">
                      <h4 className="text-white mb-4">
                        <i className="fa-solid fa-pen-to-square me-2"></i>
                        Editar Información
                      </h4>
                      
                      <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                          <div className="col-md-6 mb-3 mb-md-0">
                            <label className="form-label text-white small">Nombre</label>
                            <input
                              type="text"
                              className="form-control py-2"
                              name="nombre"
                              value={formData.nombre}
                              onChange={handleInputChange}
                              style={{
                                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                border: 'none',
                                borderRadius: '10px',
                                color: 'white'
                              }}
                            />
                            {formErrors.nombre && (
                              <div className="text-danger small mt-1">{formErrors.nombre}</div>
                            )}
                          </div>
                          <div className="col-md-6">
                            <label className="form-label text-white small">Apellido</label>
                            <input
                              type="text"
                              className="form-control py-2"
                              name="apellido"
                              value={formData.apellido}
                              onChange={handleInputChange}
                              style={{
                                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                border: 'none',
                                borderRadius: '10px',
                                color: 'white'
                              }}
                            />
                            {formErrors.apellido && (
                              <div className="text-danger small mt-1">{formErrors.apellido}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="row mb-3">
                          <div className="col-md-6 mb-3 mb-md-0">
                            <label className="form-label text-white small">Nombre de usuario</label>
                            <input
                              type="text"
                              className="form-control py-2"
                              name="username"
                              value={formData.username}
                              onChange={handleInputChange}
                              style={{
                                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                border: 'none',
                                borderRadius: '10px',
                                color: 'white'
                              }}
                            />
                            {formErrors.username && (
                              <div className="text-danger small mt-1">{formErrors.username}</div>
                            )}
                          </div>
                          <div className="col-md-6">
                            <label className="form-label text-white small">Correo electrónico</label>
                            <input
                              type="email"
                              className="form-control py-2"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              style={{
                                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                border: 'none',
                                borderRadius: '10px',
                                color: 'white'
                              }}
                            />
                            {formErrors.email && (
                              <div className="text-danger small mt-1">{formErrors.email}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <label className="form-label text-white small d-flex align-items-center">
                            <span>Nueva contraseña</span>
                            <span className="ms-2 badge bg-info rounded-pill">Opcional</span>
                          </label>
                          <div className="input-group">
                            <input
                              type={passwordVisible ? "text" : "password"}
                              className="form-control py-2"
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              style={{
                                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                border: 'none',
                                borderRadius: '10px 0 0 10px',
                                color: 'white'
                              }}
                            />
                            <button
                              type="button"
                              className="btn"
                              onClick={togglePasswordVisibility}
                              style={{
                                backgroundColor: 'rgba(59, 130, 246, 0.3)',
                                borderRadius: '0 10px 10px 0',
                                border: 'none',
                                color: 'white'
                              }}
                            >
                              <i className={`fa-solid ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                          </div>
                          {formErrors.password && (
                            <div className="text-danger small mt-1">{formErrors.password}</div>
                          )}
                          <small className="text-white-50">Dejar en blanco para mantener la contraseña actual</small>
                        </div>
                        
                        <div className="mb-4">
                          <label className="form-label text-white small">Confirmar nueva contraseña</label>
                          <input
                            type={passwordVisible ? "text" : "password"}
                            className="form-control py-2"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: 'rgba(59, 130, 246, 0.2)',
                              border: 'none',
                              borderRadius: '10px',
                              color: 'white'
                            }}
                          />
                          {formErrors.confirmPassword && (
                            <div className="text-danger small mt-1">{formErrors.confirmPassword}</div>
                          )}
                        </div>
                        
                        <div className="d-flex justify-content-end">
                          <button
                            type="submit"
                            className="btn py-2 px-4"
                            disabled={actionLoading}
                            style={{
                              backgroundColor: '#4ADE80',
                              borderRadius: '30px',
                              color: '#0F172A',
                              fontWeight: 'bold',
                              boxShadow: '0 0 15px rgba(74, 222, 128, 0.3)'
                            }}
                          >
                            {actionLoading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Guardando...
                              </>
                            ) : (
                              <>
                                <i className="fa-solid fa-floppy-disk me-2"></i>
                                Guardar Cambios
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};