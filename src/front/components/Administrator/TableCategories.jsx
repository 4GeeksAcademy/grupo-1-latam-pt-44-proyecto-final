import React, { useState, useEffect } from "react";

export const TableCategories = () => {
  // Estados para manejar las categorías, edición, carga y errores
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [editFormData, setEditFormData] = useState({ nombre: "", descripcion: "" });
  const [createFormData, setCreateFormData] = useState({ nombre: "", descripcion: "" });
  const [totalCategories, setTotalCategories] = useState(0);
  
  // Función para obtener las categorías de la API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categorias`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        let msg = "Error al obtener las categorías";
        switch (response.status) {
          case 401: msg = "No autorizado. Verifica tu token."; break;
          case 403: msg = "Acceso denegado. No tienes permisos."; break;
          case 404: msg = "Endpoint no encontrado."; break;
          case 500: msg = "Error interno del servidor."; break;
          default:
            const errorData = await response.json();
            msg = errorData?.msg || msg;
        }
        throw new Error(msg);
      }

      const data = await response.json();
      setCategories(data);
      setTotalCategories(data.length);
      setError(null);
    } catch (error) {
      setError(error.message || "Error inesperado al cargar categorías");
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar categorías al montar el componente
  useEffect(() => {
    fetchCategories();
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

  // Función para abrir el modal de creación
  const handleCreateClick = () => {
    setIsCreating(true);
    setCreateFormData({ nombre: "", descripcion: "" });
  };

  // Función para manejar cambios en el formulario de creación
  const handleCreateFormChange = (e) => {
    const { name, value } = e.target;
    setCreateFormData({
      ...createFormData,
      [name]: value
    });
  };

  // Función para enviar el formulario de creación a la API
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setActionLoading(true);
      setError(null);
      
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categorias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          nombre: createFormData.nombre,
          descripcion: createFormData.descripcion
        }),
      });

      if (!response.ok) {
        let msg = "Error al crear la categoría";
        switch (response.status) {
          case 401: msg = "No autorizado. Verifica tu token."; break;
          case 403: msg = "Acceso denegado. No tienes permisos."; break;
          case 400: msg = "Datos inválidos. Verifica la información."; break;
          case 500: msg = "Error interno del servidor."; break;
          default:
            try {
              const errorData = await response.json();
              msg = errorData?.msg || msg;
            } catch (e) {
              // Si no se puede parsear la respuesta como JSON
              msg = "Error al crear la categoría";
            }
        }
        throw new Error(msg);
      }

      // Mostrar mensaje de éxito
      setSuccessMessage("Categoría creada correctamente");
      
      // Actualizar la lista de categorías
      fetchCategories();
      
      // Cerrar el modal y limpiar el formulario
      setIsCreating(false);
      setCreateFormData({ nombre: "", descripcion: "" });
      
    } catch (error) {
      setError(error.message || "Error inesperado al crear la categoría");
      console.error("Error creating category:", error);
    } finally {
      setActionLoading(false);
    }
  };

  // Función para abrir el modal de edición
  const handleEditClick = (category) => {
    setEditingCategory(category);
    setEditFormData({
      nombre: category.nombre,
      descripcion: category.descripcion
    });
  };

  // Función para manejar cambios en el formulario de edición
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  // Función para enviar la edición a la API
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setActionLoading(true);
      setError(null);
      
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categorias/${editingCategory.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          nombre: editFormData.nombre,
          descripcion: editFormData.descripcion
        }),
      });

      if (!response.ok) {
        let msg = "Error al actualizar la categoría";
        switch (response.status) {
          case 401: msg = "No autorizado. Verifica tu token."; break;
          case 403: msg = "Acceso denegado. No tienes permisos."; break;
          case 404: msg = "Categoría no encontrada."; break;
          case 500: msg = "Error interno del servidor."; break;
          default:
            try {
              const errorData = await response.json();
              msg = errorData?.msg || msg;
            } catch (e) {
              // Si no se puede parsear la respuesta como JSON
              msg = "Error al actualizar la categoría";
            }
        }
        throw new Error(msg);
      }

      // Mostrar mensaje de éxito
      setSuccessMessage("Categoría actualizada correctamente");
      
      // Actualizar la lista de categorías
      fetchCategories();
      
      // Cerrar el modal
      setEditingCategory(null);
      setEditFormData({ nombre: "", descripcion: "" });
      
    } catch (error) {
      setError(error.message || "Error inesperado al actualizar la categoría");
      console.error("Error updating category:", error);
    } finally {
      setActionLoading(false);
    }
  };

  // Función para eliminar una categoría
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta categoría? Esta acción no se puede deshacer y eliminará todas las historias asociadas.")) {
      return;
    }
    
    try {
      setActionLoading(true);
      setError(null);
      
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categorias/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        let msg = "Error al eliminar la categoría";
        switch (response.status) {
          case 401: msg = "No autorizado. Verifica tu token."; break;
          case 403: msg = "Acceso denegado. No tienes permisos."; break;
          case 404: msg = "Categoría no encontrada."; break;
          case 500: msg = "Error interno del servidor."; break;
          default:
            try {
              const errorData = await response.json();
              msg = errorData?.msg || msg;
            } catch (e) {
              // Si no se puede parsear la respuesta como JSON
              msg = "Error al eliminar la categoría";
            }
        }
        throw new Error(msg);
      }

      // Mostrar mensaje de éxito
      setSuccessMessage("Categoría eliminada correctamente");
      
      // Actualizar la lista de categorías
      fetchCategories();
      
    } catch (error) {
      setError(error.message || "Error inesperado al eliminar la categoría");
      console.error("Error deleting category:", error);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div 
      className="w-100 position-relative"
      style={{
        background: 'linear-gradient(135deg, #2563EB 0%, #0A1744 100%)',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', 
        backgroundSize: '50px 50px',
        minHeight: '100%',
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
          <div className="col-12">
            <div className="bg-dark bg-opacity-25 rounded-4 p-4 shadow-lg">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-white m-0">
                  <i className="fa-solid fa-folder me-2"></i>
                  Gestión de Categorías
                </h1>
                <button 
                  className="btn py-2 px-4" 
                  onClick={handleCreateClick}
                  disabled={actionLoading}
                  style={{ 
                    backgroundColor: '#4ADE80', 
                    borderRadius: '30px',
                    color: '#0F172A',
                    fontWeight: 'bold',
                    boxShadow: '0 0 15px rgba(74, 222, 128, 0.3)'
                  }}
                >
                  <i className="fa-solid fa-plus me-2"></i>
                  Agregar Categoría
                </button>
              </div>

              {/* Mostrar mensaje de éxito si existe */}
              {successMessage && (
                <div className="alert alert-success mb-4 rounded-3">
                  <i className="fa-solid fa-circle-check me-2"></i>
                  {successMessage}
                </div>
              )}

              {/* Mostrar mensaje de error si existe */}
              {error && (
                <div className="alert alert-danger mb-4 rounded-3">
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
                  <p className="text-white mt-3">Cargando categorías...</p>
                </div>
              )}

              {/* Mostrar tabla si no hay error y no está cargando */}
              {!loading && !error && (
                <div className="table-responsive">
                  <table className="table table-borderless" style={{ borderSpacing: '0 15px', borderCollapse: 'separate' }}>
                    <thead>
                      <tr style={{ 
                        backgroundColor: 'rgba(30, 58, 138, 0.8)', 
                        color: 'white',
                        borderRadius: '10px',
                        overflow: 'hidden'
                      }}>
                        <th className="py-3 ps-4" style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}>ID</th>
                        <th className="py-3">Nombre</th>
                        <th className="py-3">Descripción</th>
                        <th className="py-3 pe-4 text-end" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.length > 0 ? (
                        categories.map((category) => (
                          <tr key={category.id} style={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: 'white',
                            borderRadius: '10px',
                            marginTop: '10px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                          }}>
                            <td className="py-3 ps-4" style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', fontWeight: '500' }}>{category.id}</td>
                            <td className="py-3" style={{ fontWeight: '500' }}>{category.nombre}</td>
                            <td className="py-3" style={{ fontWeight: '500' }}>{category.descripcion}</td>
                            <td className="py-3 pe-4 text-end" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>
                              <button 
                                className="btn btn-sm me-2" 
                                onClick={() => handleEditClick(category)}
                                disabled={actionLoading}
                                style={{ 
                                  backgroundColor: 'rgba(59, 130, 246, 0.7)', 
                                  color: 'white',
                                  borderRadius: '8px',
                                  boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
                                  padding: '8px 12px'
                                }}
                              >
                                <i className="fa-solid fa-pencil"></i>
                              </button>
                              <button 
                                className="btn btn-sm" 
                                onClick={() => handleDelete(category.id)}
                                disabled={actionLoading}
                                style={{ 
                                  backgroundColor: 'rgba(239, 68, 68, 0.7)', 
                                  color: 'white',
                                  borderRadius: '8px',
                                  boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)',
                                  padding: '8px 12px'
                                }}
                              >
                                {actionLoading ? (
                                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                ) : (
                                  <i className="fa-solid fa-trash"></i>
                                )}
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center py-4 text-white" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}>
                            <i className="fa-solid fa-circle-info me-2"></i>
                            No hay categorías disponibles
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
              
              {/* Paginación */}
              {!loading && !error && categories.length > 0 && (
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <div className="text-white">
                    Mostrando <span className="fw-bold">{categories.length}</span> de <span className="fw-bold">{totalCategories}</span> categorías
                  </div>
                  <nav>
                    <ul className="pagination mb-0">
                      <li className="page-item disabled">
                        <a 
                          className="page-link" 
                          href="#" 
                          style={{
                            backgroundColor: 'rgba(30, 58, 138, 0.5)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px 0 0 8px'
                          }}
                        >
                          <i className="fa-solid fa-chevron-left"></i>
                        </a>
                      </li>
                      <li className="page-item active">
                        <a 
                          className="page-link" 
                          href="#" 
                          style={{
                            backgroundColor: '#3B82F6',
                            color: 'white',
                            border: 'none'
                          }}
                        >1</a>
                      </li>
                      <li className="page-item">
                        <a 
                          className="page-link" 
                          href="#" 
                          style={{
                            backgroundColor: 'rgba(30, 58, 138, 0.5)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0 8px 8px 0'
                          }}
                        >
                          <i className="fa-solid fa-chevron-right"></i>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal para crear categoría */}
      {isCreating && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(10, 23, 68, 0.8)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <form 
              className="modal-content border-0 shadow-lg" 
              onSubmit={handleCreateSubmit}
              style={{ 
                backgroundColor: '#1E3A8A',
                borderRadius: '16px',
                overflow: 'hidden'
              }}
            >
              <div className="modal-header border-0" style={{ backgroundColor: 'rgba(30, 58, 138, 0.8)', color: 'white' }}>
                <h5 className="modal-title">
                  <i className="fa-solid fa-folder-plus me-2"></i>
                  Crear Nueva Categoría
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setIsCreating(false)}
                ></button>
              </div>
              <div className="modal-body" style={{ backgroundColor: 'rgba(30, 58, 138, 0.5)' }}>
                <div className="mb-3">
                  <label className="form-label text-white small">Nombre</label>
                  <input 
                    className="form-control py-2" 
                    name="nombre"
                    placeholder="Nombre de la categoría" 
                    value={createFormData.nombre}
                    onChange={handleCreateFormChange}
                    style={{ 
                      backgroundColor: 'rgba(59, 130, 246, 0.5)', 
                      border: 'none', 
                      borderRadius: '10px',
                      color: 'white'
                    }}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white small">Descripción</label>
                  <textarea 
                    className="form-control py-2" 
                    name="descripcion"
                    placeholder="Descripción de la categoría" 
                    value={createFormData.descripcion}
                    onChange={handleCreateFormChange}
                    rows="3"
                    style={{ 
                      backgroundColor: 'rgba(59, 130, 246, 0.5)', 
                      border: 'none', 
                      borderRadius: '10px',
                      color: 'white'
                    }}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer border-0" style={{ backgroundColor: 'rgba(30, 58, 138, 0.8)' }}>
                <button 
                  className="btn" 
                  type="button" 
                  onClick={() => setIsCreating(false)}
                  style={{ 
                    backgroundColor: 'rgba(100, 116, 139, 0.5)', 
                    color: 'white',
                    borderRadius: '10px'
                  }}
                >
                  <i className="fa-solid fa-xmark me-2"></i>
                  Cancelar
                </button>
                <button 
                  className="btn" 
                  type="submit"
                  disabled={actionLoading}
                  style={{ 
                    backgroundColor: '#4ADE80', 
                    color: '#0F172A',
                    fontWeight: 'bold',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(74, 222, 128, 0.3)'
                  }}
                >
                  {actionLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creando...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-plus me-2"></i>
                      Crear
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para editar categoría */}
      {editingCategory && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(10, 23, 68, 0.8)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <form 
              className="modal-content border-0 shadow-lg" 
              onSubmit={handleEditSubmit}
              style={{ 
                backgroundColor: '#1E3A8A',
                borderRadius: '16px',
                overflow: 'hidden'
              }}
            >
              <div className="modal-header border-0" style={{ backgroundColor: 'rgba(30, 58, 138, 0.8)', color: 'white' }}>
                <h5 className="modal-title">
                  <i className="fa-solid fa-folder-pen me-2"></i>
                  Editar Categoría
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setEditingCategory(null)}
                ></button>
              </div>
              <div className="modal-body" style={{ backgroundColor: 'rgba(30, 58, 138, 0.5)' }}>
                <div className="mb-3">
                  <label className="form-label text-white small">Nombre</label>
                  <input 
                    className="form-control py-2" 
                    name="nombre"
                    placeholder="Nombre de la categoría" 
                    value={editFormData.nombre}
                    onChange={handleEditFormChange}
                    style={{ 
                      backgroundColor: 'rgba(59, 130, 246, 0.5)', 
                      border: 'none', 
                      borderRadius: '10px',
                      color: 'white'
                    }}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white small">Descripción</label>
                  <textarea 
                    className="form-control py-2" 
                    name="descripcion"
                    placeholder="Descripción de la categoría" 
                    value={editFormData.descripcion}
                    onChange={handleEditFormChange}
                    rows="3"
                    style={{ 
                      backgroundColor: 'rgba(59, 130, 246, 0.5)', 
                      border: 'none', 
                      borderRadius: '10px',
                      color: 'white'
                    }}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer border-0" style={{ backgroundColor: 'rgba(30, 58, 138, 0.8)' }}>
                <button 
                  className="btn" 
                  type="button" 
                  onClick={() => setEditingCategory(null)}
                  style={{ 
                    backgroundColor: 'rgba(100, 116, 139, 0.5)', 
                    color: 'white',
                    borderRadius: '10px'
                  }}
                >
                  <i className="fa-solid fa-xmark me-2"></i>
                  Cancelar
                </button>
                <button 
                  className="btn" 
                  type="submit"
                  disabled={actionLoading}
                  style={{ 
                    backgroundColor: '#4ADE80', 
                    color: '#0F172A',
                    fontWeight: 'bold',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(74, 222, 128, 0.3)'
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
                      Guardar
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};