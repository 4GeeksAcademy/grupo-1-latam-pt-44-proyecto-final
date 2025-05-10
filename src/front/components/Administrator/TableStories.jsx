import React, { useState } from "react";

export const TableStories = () => {
  // Estado para manejar un posible modal de edición
  const [editingStory, setEditingStory] = useState(null);

  // Datos de ejemplo para historias
  const stories = [
    {
      id: 1,
      titulo: "El bosque encantado",
      categoria: "Cuentos para dormir",
      duracion: "8:30",
      videoId: "abc123xyz",
      descripcion: "Un cuento mágico sobre animales que hablan en un bosque encantado"
    },
    {
      id: 2,
      titulo: "Viaje a las estrellas",
      categoria: "Historias de aventuras",
      duracion: "12:45",
      videoId: "def456uvw",
      descripcion: "Una aventura espacial donde los niños viajan entre las estrellas"
    },
    {
      id: 3,
      titulo: "La ballena cantora",
      categoria: "Sonidos de la naturaleza",
      duracion: "6:20",
      videoId: "ghi789rst",
      descripcion: "Historia relajante sobre una ballena que canta melodías para dormir"
    },
    {
      id: 4,
      titulo: "El jardín secreto",
      categoria: "Meditación infantil",
      duracion: "10:15",
      videoId: "jkl012mno",
      descripcion: "Meditación guiada para niños ambientada en un jardín mágico"
    },
    {
      id: 5,
      titulo: "Melodías del océano",
      categoria: "Música relajante",
      duracion: "15:00",
      videoId: "pqr345stu",
      descripcion: "Sonidos relajantes del océano con música suave de fondo"
    }
  ];

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
                    {stories.map((story) => (
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
                            {story.categoria}
                          </span>
                        </td>
                        <td className="py-3" style={{ fontWeight: '500' }}>
                          <i className="fa-regular fa-clock me-2"></i>
                          {story.duracion}
                        </td>
                        <td className="py-3" style={{ fontWeight: '500' }}>
                          <span className="badge bg-secondary rounded-pill px-3 py-2">
                            {story.videoId}
                          </span>
                        </td>
                        <td className="py-3 pe-4 text-end" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>
                          <button
                            className="btn btn-sm me-2"
                            onClick={() => setEditingStory(story)}
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
                            style={{
                              backgroundColor: 'rgba(239, 68, 68, 0.7)',
                              color: 'white',
                              borderRadius: '8px',
                              boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)',
                              padding: '8px 12px'
                            }}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginación */}
              <div className="d-flex justify-content-between align-items-center mt-4">
                <div className="text-white">
                  Mostrando <span className="fw-bold">5</span> de <span className="fw-bold">5</span> historias
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
            </div>
          </div>
        </div>
      </div>

      {/* Modal para editar historia */}
      {editingStory && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(10, 23, 68, 0.8)" }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <form
              className="modal-content border-0 shadow-lg"
              onSubmit={(e) => {
                e.preventDefault();
                setEditingStory(null);
              }}
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
                      placeholder="Título de la historia"
                      value={editingStory.titulo}
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white'
                      }}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-white small">Categoría</label>
                    <select
                      className="form-select py-2"
                      value={editingStory.categoria}
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white'
                      }}
                    >
                      <option value="Cuentos para dormir">Cuentos para dormir</option>
                      <option value="Historias de aventuras">Historias de aventuras</option>
                      <option value="Sonidos de la naturaleza">Sonidos de la naturaleza</option>
                      <option value="Meditación infantil">Meditación infantil</option>
                      <option value="Música relajante">Música relajante</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-white small">Duración (mm:ss)</label>
                    <input
                      className="form-control py-2"
                      placeholder="Ej: 08:30"
                      value={editingStory.duracion}
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white'
                      }}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-white small">Video ID</label>
                    <input
                      className="form-control py-2"
                      placeholder="ID del video de YouTube"
                      value={editingStory.videoId}
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white'
                      }}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label text-white small">Descripción</label>
                  <textarea
                    className="form-control py-2"
                    placeholder="Descripción de la historia"
                    value={editingStory.descripcion}
                    rows="3"
                    style={{
                      backgroundColor: 'rgba(59, 130, 246, 0.5)',
                      border: 'none',
                      borderRadius: '10px',
                      color: 'white'
                    }}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label text-white small">Vista previa</label>
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center p-3"
                    style={{
                      backgroundColor: 'rgba(15, 23, 42, 0.5)',
                      height: '180px',
                      border: '1px dashed rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    <div className="text-center">
                      <i className="fa-brands fa-youtube fa-3x mb-3" style={{ color: '#EF4444' }}></i>
                      <p className="text-white-50 mb-0">ID del video: {editingStory.videoId}</p>
                      <small className="text-white-50">Haz clic en el botón de reproducción para previsualizar</small>
                    </div>
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
                  style={{
                    backgroundColor: '#4ADE80',
                    color: '#0F172A',
                    fontWeight: 'bold',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(74, 222, 128, 0.3)'
                  }}
                >
                  <i className="fa-solid fa-floppy-disk me-2"></i>
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};