import React, { useState, useEffect } from "react";

export const TableStories = () => {
  // Estados para manejar las historias, edición, creación, carga y errores
  const [stories, setStories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingStory, setEditingStory] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [totalStories, setTotalStories] = useState(0);

  // Estados para los formularios
  const [editFormData, setEditFormData] = useState({
    titulo: "",
    contenido: "",
    imagen: "",
    url: "",
    duracion: "",
    categoria_id: ""
  });

  const [createFormData, setCreateFormData] = useState({
    titulo: "",
    contenido: "",
    imagen: "",
    url: "",
    duracion: "",
    categoria_id: ""
  });

  // Función para obtener las historias de la API
  const fetchStories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/historias`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        let msg = "Error al obtener las historias";
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
      setStories(data);
      setTotalStories(data.length);
      setError(null);
    } catch (error) {
      setError(error.message || "Error inesperado al cargar historias");
      console.error("Error fetching stories:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener las categorías para los selectores
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categorias`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener las categorías");
      }

      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      // No establecemos error global para no interrumpir la carga de historias
    }
  };

  // Cargar historias y categorías al montar el componente
  useEffect(() => {
    fetchStories();
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
    setCreateFormData({
      titulo: "",
      contenido: "",
      imagen: "",
      url: "",
      duracion: "",
      categoria_id: categories.length > 0 ? categories[0].id.toString() : ""
    });
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

      // Asegurarse de que duracion sea un número
      const formData = {
        ...createFormData,
        duracion: parseInt(createFormData.duracion, 10) || 0,
        categoria_id: parseInt(createFormData.categoria_id, 10)
      };

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/historias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let msg = "Error al crear la historia";
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
              msg = "Error al crear la historia";
            }
        }
        throw new Error(msg);
      }

      // Mostrar mensaje de éxito
      setSuccessMessage("Historia creada correctamente");

      // Actualizar la lista de historias
      fetchStories();

      // Cerrar el modal y limpiar el formulario
      setIsCreating(false);
      setCreateFormData({
        titulo: "",
        contenido: "",
        imagen: "",
        url: "",
        duracion: "",
        categoria_id: ""
      });

    } catch (error) {
      setError(error.message || "Error inesperado al crear la historia");
      console.error("Error creating story:", error);
    } finally {
      setActionLoading(false);
    }
  };

  // Función para abrir el modal de edición
  const handleEditClick = (story) => {
    // Encontrar la categoría correspondiente
    const categoryName = categories.find(cat => cat.id === story.categoria_id)?.nombre || "";

    setEditingStory({
      ...story,
      categoria: categoryName
    });

    setEditFormData({
      titulo: story.titulo,
      contenido: story.contenido,
      imagen: story.imagen,
      url: story.url,
      duracion: story.duracion.toString(),
      categoria_id: story.categoria_id.toString()
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

      // Asegurarse de que duracion sea un número
      const formData = {
        ...editFormData,
        duracion: parseInt(editFormData.duracion, 10) || 0,
        categoria_id: parseInt(editFormData.categoria_id, 10)
      };

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/historias/${editingStory.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let msg = "Error al actualizar la historia";
        switch (response.status) {
          case 401: msg = "No autorizado. Verifica tu token."; break;
          case 403: msg = "Acceso denegado. No tienes permisos."; break;
          case 404: msg = "Historia no encontrada."; break;
          case 500: msg = "Error interno del servidor."; break;
          default:
            try {
              const errorData = await response.json();
              msg = errorData?.msg || msg;
            } catch (e) {
              // Si no se puede parsear la respuesta como JSON
              msg = "Error al actualizar la historia";
            }
        }
        throw new Error(msg);
      }

      // Mostrar mensaje de éxito
      setSuccessMessage("Historia actualizada correctamente");

      // Actualizar la lista de historias
      fetchStories();

      // Cerrar el modal
      setEditingStory(null);
      setEditFormData({
        titulo: "",
        contenido: "",
        imagen: "",
        url: "",
        duracion: "",
        categoria_id: ""
      });

    } catch (error) {
      setError(error.message || "Error inesperado al actualizar la historia");
      console.error("Error updating story:", error);
    } finally {
      setActionLoading(false);
    }
  };

  // Función para eliminar una historia
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta historia? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      setActionLoading(true);
      setError(null);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/historias/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        let msg = "Error al eliminar la historia";
        switch (response.status) {
          case 401: msg = "No autorizado. Verifica tu token."; break;
          case 403: msg = "Acceso denegado. No tienes permisos."; break;
          case 404: msg = "Historia no encontrada."; break;
          case 500: msg = "Error interno del servidor."; break;
          default:
            try {
              const errorData = await response.json();
              msg = errorData?.msg || msg;
            } catch (e) {
              // Si no se puede parsear la respuesta como JSON
              msg = "Error al eliminar la historia";
            }
        }
        throw new Error(msg);
      }

      // Mostrar mensaje de éxito
      setSuccessMessage("Historia eliminada correctamente");

      // Actualizar la lista de historias
      fetchStories();

    } catch (error) {
      setError(error.message || "Error inesperado al eliminar la historia");
      console.error("Error deleting story:", error);
    } finally {
      setActionLoading(false);
    }
  };

  // Función para reproducir un video
  const handlePlay = (url) => {
    window.open(`https://www.youtube.com/watch?v=${url}`, '_blank');
  };

  // Función para obtener el nombre de la categoría por ID
  const getCategoryNameById = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.nombre : "Categoría desconocida";
  };

  // Función para validar si un ID de YouTube es válido
  const isValidYouTubeId = (id) => {
    return id && id.length > 5 && id.length < 40;
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
                  <i className="fa-solid fa-book me-2"></i>
                  Gestión de Historias
                </h1>
                <button
                  className="btn py-2 px-4"
                  onClick={handleCreateClick}
                  disabled={actionLoading || categories.length === 0}
                  style={{
                    backgroundColor: '#4ADE80',
                    borderRadius: '30px',
                    color: '#0F172A',
                    fontWeight: 'bold',
                    boxShadow: '0 0 15px rgba(74, 222, 128, 0.3)'
                  }}
                >
                  <i className="fa-solid fa-plus me-2"></i>
                  Agregar Historia
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
                  <p className="text-white mt-3">Cargando historias...</p>
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
                        <th className="py-3">Título</th>
                        <th className="py-3">Categoría</th>
                        <th className="py-3">Duración</th>
                        <th className="py-3">Video ID</th>
                        <th className="py-3 pe-4 text-end" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stories.length > 0 ? (
                        stories.map((story) => (
                          <tr key={story.id} style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: 'white',
                            borderRadius: '10px',
                            marginTop: '10px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                          }}>
                            <td className="py-3 ps-4" style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', fontWeight: '500' }}>{story.id}</td>
                            <td className="py-3" style={{ fontWeight: '500' }}>{story.titulo}</td>
                            <td className="py-3" style={{ fontWeight: '500' }}>
                              <span className="badge bg-info rounded-pill px-3 py-2">
                                {getCategoryNameById(story.categoria_id)}
                              </span>
                            </td>
                            <td className="py-3" style={{ fontWeight: '500' }}>
                              <i className="fa-regular fa-clock me-2"></i>
                              {story.duracion} min
                            </td>
                            <td className="py-3" style={{ fontWeight: '500' }}>
                              <span className="badge bg-secondary rounded-pill px-3 py-2">
                                {story.url}
                              </span>
                            </td>
                            <td className="py-3 pe-4 text-end" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>
                              <button
                                className="btn btn-sm me-2"
                                onClick={() => handleEditClick(story)}
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
                                className="btn btn-sm me-2"
                                onClick={() => handlePlay(story.url)}
                                style={{
                                  backgroundColor: 'rgba(139, 92, 246, 0.7)',
                                  color: 'white',
                                  borderRadius: '8px',
                                  boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)',
                                  padding: '8px 12px'
                                }}
                              >
                                <i className="fa-solid fa-play"></i>
                              </button>
                              <button
                                className="btn btn-sm"
                                onClick={() => handleDelete(story.id)}
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
                          <td colSpan="6" className="text-center py-4 text-white" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}>
                            <i className="fa-solid fa-circle-info me-2"></i>
                            No hay historias disponibles
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Paginación */}
              {!loading && !error && stories.length > 0 && (
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <div className="text-white">
                    Mostrando <span className="fw-bold">{stories.length}</span> de <span className="fw-bold">{totalStories}</span> historias
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

      {/* Modal para crear historia */}
      {isCreating && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(10, 23, 68, 0.8)" }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
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
                  <i className="fa-solid fa-book-medical me-2"></i>
                  Crear Nueva Historia
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setIsCreating(false)}
                ></button>
              </div>
              <div className="modal-body" style={{ backgroundColor: 'rgba(30, 58, 138, 0.5)' }}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-white small">Título</label>
                    <input
                      className="form-control py-2"
                      name="titulo"
                      placeholder="Título de la historia"
                      value={createFormData.titulo}
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
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-white small">Categoría</label>
                    <select
                      className="form-select py-2"
                      name="categoria_id"
                      value={createFormData.categoria_id}
                      onChange={handleCreateFormChange}
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white'
                      }}
                      required
                    >
                      <option value="">Selecciona una categoría</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-white small">Duración (minutos)</label>
                    <input
                      className="form-control py-2"
                      name="duracion"
                      type="number"
                      min="1"
                      placeholder="Ej: 5"
                      value={createFormData.duracion}
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
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-white small">Video ID (YouTube)</label>
                    <input
                      className="form-control py-2"
                      name="url"
                      placeholder="Ej: dQw4w9WgXcQ"
                      value={createFormData.url}
                      onChange={handleCreateFormChange}
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white'
                      }}
                      required
                    />
                    <small className="text-white-50">ID del video de YouTube (parte final de la URL)</small>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label text-white small">Contenido</label>
                  <textarea
                    className="form-control py-2"
                    name="contenido"
                    placeholder="Contenido o descripción detallada de la historia"
                    value={createFormData.contenido}
                    onChange={handleCreateFormChange}
                    rows="4"
                    style={{
                      backgroundColor: 'rgba(59, 130, 246, 0.5)',
                      border: 'none',
                      borderRadius: '10px',
                      color: 'white'
                    }}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label text-white small">Imagen (ID de Cloudinary)</label>
                  <input
                    className="form-control py-2"
                    name="imagen"
                    placeholder="Ej: historia_dormir_abc123"
                    value={createFormData.imagen}
                    onChange={handleCreateFormChange}
                    style={{
                      backgroundColor: 'rgba(59, 130, 246, 0.5)',
                      border: 'none',
                      borderRadius: '10px',
                      color: 'white'
                    }}
                    required
                  />
                  <small className="text-white-50">ID de la imagen en Cloudinary (sin extensión)</small>
                </div>

                {/* Vista previa del video con iframe */}
                <div className="mb-3">
                  <label className="form-label text-white small">Vista previa del video</label>
                  <div
                    className="rounded-3 overflow-hidden"
                    style={{
                      backgroundColor: 'rgba(15, 23, 42, 0.5)',
                      border: isValidYouTubeId(createFormData.url) ? 'none' : '1px dashed rgba(255, 255, 255, 0.3)',
                      height: '250px'
                    }}
                  >
                    {isValidYouTubeId(createFormData.url) ? (
                      <iframe width="100%" height="100%"
                        src={`https://www.youtube.com/embed/${createFormData.url}`}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen>
                      </iframe>
                    ) : (
                      <div className="d-flex align-items-center justify-content-center h-100">
                        <div className="text-center">
                          <i className="fa-brands fa-youtube fa-3x mb-3" style={{ color: '#EF4444' }}></i>
                          <p className="text-white-50 mb-0">Ingresa un ID de video válido para ver la vista previa</p>
                          <small className="text-white-50">Ejemplo: dQw4w9WgXcQ</small>
                        </div>
                      </div>
                    )}
                  </div>
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

      {/* Modal para editar historia */}
      {editingStory && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(10, 23, 68, 0.8)" }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
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
                  <i className="fa-solid fa-book-pen me-2"></i>
                  Editar Historia
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setEditingStory(null)}
                ></button>
              </div>
              <div className="modal-body" style={{ backgroundColor: 'rgba(30, 58, 138, 0.5)' }}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-white small">Título</label>
                    <input
                      className="form-control py-2"
                      name="titulo"
                      placeholder="Título de la historia"
                      value={editFormData.titulo}
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
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-white small">Categoría</label>
                    <select
                      className="form-select py-2"
                      name="categoria_id"
                      value={editFormData.categoria_id}
                      onChange={handleEditFormChange}
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white'
                      }}
                      required
                    >
                      <option value="">Selecciona una categoría</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-white small">Duración (minutos)</label>
                    <input
                      className="form-control py-2"
                      name="duracion"
                      type="number"
                      min="1"
                      placeholder="Ej: 5"
                      value={editFormData.duracion}
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
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-white small">Video ID (YouTube)</label>
                    <input
                      className="form-control py-2"
                      name="url"
                      placeholder="Ej: dQw4w9WgXcQ"
                      value={editFormData.url}
                      onChange={handleEditFormChange}
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white'
                      }}
                      required
                    />
                    <small className="text-white-50">ID del video de YouTube (parte final de la URL)</small>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label text-white small">Contenido</label>
                  <textarea
                    className="form-control py-2"
                    name="contenido"
                    placeholder="Contenido o descripción detallada de la historia"
                    value={editFormData.contenido}
                    onChange={handleEditFormChange}
                    rows="4"
                    style={{
                      backgroundColor: 'rgba(59, 130, 246, 0.5)',
                      border: 'none',
                      borderRadius: '10px',
                      color: 'white'
                    }}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label text-white small">Imagen (ID de Cloudinary)</label>
                  <input
                    className="form-control py-2"
                    name="imagen"
                    placeholder="Ej: historia_dormir_abc123"
                    value={editFormData.imagen}
                    onChange={handleEditFormChange}
                    style={{
                      backgroundColor: 'rgba(59, 130, 246, 0.5)',
                      border: 'none',
                      borderRadius: '10px',
                      color: 'white'
                    }}
                    required
                  />
                  <small className="text-white-50">ID de la imagen en Cloudinary (sin extensión)</small>
                </div>

                {/* Vista previa del video con iframe */}
                <div className="mb-3">
                  <label className="form-label text-white small">Vista previa del video</label>
                  <div
                    className="rounded-3 overflow-hidden"
                    style={{
                      backgroundColor: 'rgba(15, 23, 42, 0.5)',
                      border: isValidYouTubeId(editFormData.url) ? 'none' : '1px dashed rgba(255, 255, 255, 0.3)',
                      height: '250px'
                    }}
                  >
                    {isValidYouTubeId(editFormData.url) ? (
                      <iframe width="100%" height="100%"
                        src={`https://www.youtube.com/embed/${editFormData.url}`}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen>
                      </iframe>
                    ) : (
                      <div className="d-flex align-items-center justify-content-center h-100">
                        <div className="text-center">
                          <i className="fa-brands fa-youtube fa-3x mb-3" style={{ color: '#EF4444' }}></i>
                          <p className="text-white-50 mb-0">Ingresa un ID de video válido para ver la vista previa</p>
                          <small className="text-white-50">Ejemplo: dQw4w9WgXcQ</small>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0" style={{ backgroundColor: 'rgba(30, 58, 138, 0.8)' }}>
                <button
                  className="btn"
                  type="button"
                  onClick={() => setEditingStory(null)}
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