import React, { useEffect, useState } from "react";

export const TableUsers = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/usuarios`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        let msg = "Error al obtener los usuarios";
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
      setUsers(data.users);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message || "Error inesperado");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/usuario/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      });
      if (!response.ok) throw new Error("No se pudo eliminar el usuario");
      fetchUsers();
    } catch (error) {
      setErrorMessage(error.message || "Error al eliminar usuario");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { id, email, username, nombre, apellido, is_active, password } = editingUser;

      const payload = { email, username, nombre, apellido, is_active };
      if (password) payload.password = password;

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/usuario/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("No se pudo actualizar el usuario");

      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      setErrorMessage(error.message || "Error al editar usuario");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div
      className="min-vh-100 w-100 position-relative"
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
                  <i className="fa-solid fa-users me-2"></i>
                  Gestión de Usuarios
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
                  Agregar Usuario
                </button>
              </div>

              {errorMessage && (
                <div className="alert alert-danger mb-4 rounded-3">
                  <i className="fa-solid fa-circle-exclamation me-2"></i>
                  {errorMessage}
                </div>
              )}

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
                      <th className="py-3">Email</th>
                      <th className="py-3">Username</th>
                      <th className="py-3">Nombre</th>
                      <th className="py-3">Apellido</th>
                      <th className="py-3">Estado</th>
                      <th className="py-3 pe-4 text-end" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={user.id} style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          color: 'white',
                          borderRadius: '10px',
                          marginTop: '10px',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}>
                          <td className="py-3 ps-4" style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', fontWeight: '500' }}>{user.id}</td>
                          <td className="py-3" style={{ fontWeight: '500' }}>{user.email}</td>
                          <td className="py-3" style={{ fontWeight: '500' }}>{user.username}</td>
                          <td className="py-3" style={{ fontWeight: '500' }}>{user.nombre}</td>
                          <td className="py-3" style={{ fontWeight: '500' }}>{user.apellido}</td>
                          <td className="py-3">
                            <span className={`badge ${user.is_active ? 'bg-success' : 'bg-danger'} rounded-pill px-3 py-2`} style={{ fontWeight: '500' }}>
                              {user.is_active ? 'Activo' : 'Inactivo'}
                            </span>
                          </td>
                          <td className="py-3 pe-4 text-end" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>
                            <button
                              className="btn btn-sm me-2"
                              onClick={() => setEditingUser(user)}
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
                              onClick={() => handleDelete(user.id)}
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
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-4 text-white" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}>
                          <i className="fa-solid fa-circle-info me-2"></i>
                          No hay usuarios disponibles
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal mejorado para editar */}
      {editingUser && (
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
                  <i className="fa-solid fa-user-pen me-2"></i>
                  Editar Usuario
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setEditingUser(null)}
                ></button>
              </div>
              <div className="modal-body" style={{ backgroundColor: 'rgba(30, 58, 138, 0.5)' }}>
                <div className="mb-3">
                  <label className="form-label text-white small">Email</label>
                  <input
                    className="form-control py-2"
                    placeholder="Email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    style={{
                      backgroundColor: 'rgba(59, 130, 246, 0.5)',
                      border: 'none',
                      borderRadius: '10px',
                      color: 'white'
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white small">Username</label>
                  <input
                    className="form-control py-2"
                    placeholder="Username"
                    value={editingUser.username}
                    onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                    style={{
                      backgroundColor: 'rgba(59, 130, 246, 0.5)',
                      border: 'none',
                      borderRadius: '10px',
                      color: 'white'
                    }}
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-white small">Nombre</label>
                    <input
                      className="form-control py-2"
                      placeholder="Nombre"
                      value={editingUser.nombre}
                      onChange={(e) => setEditingUser({ ...editingUser, nombre: e.target.value })}
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white'
                      }}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-white small">Apellido</label>
                    <input
                      className="form-control py-2"
                      placeholder="Apellido"
                      value={editingUser.apellido}
                      onChange={(e) => setEditingUser({ ...editingUser, apellido: e.target.value })}
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
                  <label className="form-label text-white small">Password (opcional)</label>
                  <input
                    className="form-control py-2"
                    placeholder="Dejar en blanco para mantener la contraseña actual"
                    type="password"
                    onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                    style={{
                      backgroundColor: 'rgba(59, 130, 246, 0.5)',
                      border: 'none',
                      borderRadius: '10px',
                      color: 'white'
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white small">Estado</label>
                  <select
                    className="form-select py-2"
                    value={editingUser.is_active ? "1" : "0"}
                    onChange={(e) => setEditingUser({ ...editingUser, is_active: e.target.value === "1" })}
                    style={{
                      backgroundColor: 'rgba(59, 130, 246, 0.5)',
                      border: 'none',
                      borderRadius: '10px',
                      color: 'white'
                    }}
                  >
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer border-0" style={{ backgroundColor: 'rgba(30, 58, 138, 0.8)' }}>
                <button
                  className="btn"
                  type="button"
                  onClick={() => setEditingUser(null)}
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