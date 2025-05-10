import React, { useState } from "react";

export const TableCategories = () => {
  // Estado para manejar un posible modal de edición
  const [editingCategory, setEditingCategory] = useState(null);
  
  // Datos de ejemplo para categorías
  const categories = [
    { id: 1, nombre: "Cuentos para dormir", descripcion: "Historias cortas y relajantes para ayudar a conciliar el sueño" },
    { id: 2, nombre: "Meditación infantil", descripcion: "Guías de meditación diseñadas especialmente para niños" },
    { id: 3, nombre: "Música relajante", descripcion: "Melodías suaves y tranquilas para crear un ambiente propicio para el descanso" },
    { id: 4, nombre: "Sonidos de la naturaleza", descripcion: "Sonidos ambientales relajantes como lluvia, olas y bosques" },
    { id: 5, nombre: "Historias de aventuras", descripcion: "Aventuras emocionantes con finales tranquilos para un buen descanso" }
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
                  <i className="fa-solid fa-folder me-2"></i>
                  Gestión de Categorías
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
                  Agregar Categoría
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
                      <th className="py-3">Nombre</th>
                      <th className="py-3">Descripción</th>
                      <th className="py-3 pe-4 text-end" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
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
                            onClick={() => setEditingCategory(category)}
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
                  Mostrando <span className="fw-bold">5</span> de <span className="fw-bold">5</span> categorías
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

      {/* Modal para editar categoría */}
      {editingCategory && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(10, 23, 68, 0.8)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <form 
              className="modal-content border-0 shadow-lg" 
              onSubmit={(e) => {
                e.preventDefault();
                setEditingCategory(null);
              }}
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
                    placeholder="Nombre de la categoría" 
                    value={editingCategory.nombre}
                    style={{ 
                      backgroundColor: 'rgba(59, 130, 246, 0.5)', 
                      border: 'none', 
                      borderRadius: '10px',
                      color: 'white'
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white small">Descripción</label>
                  <textarea 
                    className="form-control py-2" 
                    placeholder="Descripción de la categoría" 
                    value={editingCategory.descripcion}
                    rows="3"
                    style={{ 
                      backgroundColor: 'rgba(59, 130, 246, 0.5)', 
                      border: 'none', 
                      borderRadius: '10px',
                      color: 'white'
                    }}
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