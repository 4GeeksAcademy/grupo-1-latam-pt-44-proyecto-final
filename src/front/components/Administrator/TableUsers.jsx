import React, { useEffect, useState } from "react";

export const TableUsers = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    rol: "USER",
    is_active: true
  });
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/usuarios`, {
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
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/usuario/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      });
      if (!response.ok) throw new Error("No se pudo eliminar el usuario");
      setSuccessMessage("Usuario eliminado correctamente");
      fetchUsers();
    } catch (error) {
      setErrorMessage(error.message || "Error al eliminar usuario");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { id, email, username, nombre, apellido, activo, password, rol} = editingUser;

      const payload = { email, username, nombre, apellido, activo, rol };
      if (password) payload.password = password;

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/usuario/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("No se pudo actualizar el usuario");

      setSuccessMessage("Usuario actualizado correctamente");
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      setErrorMessage(error.message || "Error al editar usuario");
    } finally {
      setLoading(false);
    }
  };

  // Función para crear un nuevo usuario
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Validar campos requeridos
      if (!newUser.username || !newUser.email || !newUser.password || !newUser.nombre || !newUser.apellido) {
        throw new Error("Todos los campos son obligatorios");
      }
      
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.msg || "Error al crear el usuario");
      }

      setSuccessMessage("Usuario creado correctamente");
      setIsCreating(false);
      setNewUser({
        username: "",
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        rol: "USER",
        is_active: true
      });
      fetchUsers();
    } catch (error) {
      setErrorMessage(error.message || "Error al crear usuario");
    } finally {
      setLoading(false);
    }
  };

  // Función para generar una contraseña aleatoria
  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewUser({ ...newUser, password });
  };

  // Limpiar mensajes después de 5 segundos
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

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
                  onClick={() => setIsCreating(true)}
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

              {successMessage && (
                <div className="alert alert-success mb-4 rounded-3">
                  <i className="fa-solid fa-circle-check me-2"></i>
                  {successMessage}
                </div>
              )}

              {loading && (
                <div className="text-center py-4">
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <p className="text-white mt-2">Cargando...</p>
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
                      <th className="py-3">Rol</th>
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
                            <span className={`badge ${user.rol === 'ADMIN' ? 'bg-warning' : 'bg-info'} rounded-pill px-3 py-2`} style={{ fontWeight: '500' }}>
                              {user.rol}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className={`badge ${user.activo ? 'bg-success' : 'bg-danger'} rounded-pill px-3 py-2`} style={{ fontWeight: '500' }}>
                              {user.activo ? 'Activo' : 'Inactivo'}
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
                        <td colSpan="8" className="text-center py-4 text-white" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}>
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

      {/* Modal para crear usuario */}
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
                  <i className="fa-solid fa-user-plus me-2"></i>
                  Crear Nuevo Usuario
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setIsCreating(false)}
                ></button>
              </div>
              <div className="modal-body" style={{ backgroundColor: 'rgba(30, 58, 138, 0.5)' }}>
                <div className="mb-3">
                  <label className="form-label text-white small">Email *</label>
                  <input
                    className="form-control py-2"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
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
                  <label className="form-label text-white small">Username *</label>
                  <input
                    className="form-control py-2"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    style={{
                      backgroundColor: 'rgba(59, 130, 246, 0.5)',
                      border: 'none',
                      borderRadius: '10px',
                      color: 'white'
                    }}
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-white small">Nombre *</label>
                    <input
                      className="form-control py-2"
                      placeholder="Nombre"
                      value={newUser.nombre}
                      onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
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
                    <label className="form-label text-white small">Apellido *</label>
                    <input
                      className="form-control py-2"
                      placeholder="Apellido"
                      value={newUser.apellido}
                      onChange={(e) => setNewUser({ ...newUser, apellido: e.target.value })}
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white'
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label text-white small">Contraseña *</label>
                  <div className="input-group">
                    <input
                      className="form-control py-2"
                      placeholder="Contraseña"
                      type="text"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                        border: 'none',
                        borderRadius: '10px 0 0 10px',
                        color: 'white'
                      }}
                      required
                    />
                    <button
                      type="button"
                      className="btn"
                      onClick={generatePassword}
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.7)',
                        border: 'none',
                        borderRadius: '0 10px 10px 0',
                        color: 'white'
                      }}
                    >
                      <i className="fa-solid fa-key"></i>
                    </button>
                  </div>
                  <small className="text-white-50">Haz clic en el botón para generar una contraseña segura</small>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-white small">Rol *</label>
                    <select
                      className="form-select py-2"
                      value={newUser.rol}
                      onChange={(e) => setNewUser({ ...newUser, rol: e.target.value })}
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white'
                      }}
                      required
                    >
                      <option value="USER">Usuario</option>
                      <option value="ADMIN">Administrador</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-white small">Estado *</label>
                    <select
                      className="form-select py-2"
                      value={newUser.is_active ? "true" : "false"}
                      onChange={(e) => setNewUser({ ...newUser, is_active: e.target.value === "true" })}
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white'
                      }}
                      required
                    >
                      <option value="true">Activo</option>
                      <option value="false">Inactivo</option>
                    </select>
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
                  disabled={loading}
                  style={{
                    backgroundColor: '#4ADE80',
                    color: '#0F172A',
                    fontWeight: 'bold',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(74, 222, 128, 0.3)'
                  }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creando...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-user-plus me-2"></i>
                      Crear Usuario
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                  <div className="input-group">
                    <input
                      className="form-control py-2"
                      placeholder="Dejar en blanco para mantener la contraseña actual"
                      type="text"
                      value={editingUser.password || ""}
                      onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                        border: 'none',
                        borderRadius: '10px 0 0 10px',
                        color: 'white'
                      }}
                    />
                    <button
                      type="button"
                      className="btn"
                      onClick={() => {
                        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
                        let password = "";
                        for (let i = 0; i < 12; i++) {
                          password += chars.charAt(Math.floor(Math.random() * chars.length));
                        }
                        setEditingUser({ ...editingUser, password });
                      }}
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.7)',
                        border: 'none',
                        borderRadius: '0 10px 10px 0',
                        color: 'white'
                      }}
                    >
                      <i className="fa-solid fa-key"></i>
                    </button>
                  </div>
                  <small className="text-white-50">Dejar en blanco para mantener la contraseña actual</small>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-white small">Rol</label>
                    <select
                      className="form-select py-2"
                      value={editingUser.rol || "USER"}
                      onChange={(e) => setEditingUser({ ...editingUser, rol: e.target.value })}
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white'
                      }}
                    >
                      <option value="USER">Usuario</option>
                      <option value="ADMIN">Administrador</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-white small">Estado</label>
                    <select
                      className="form-select py-2"
                      value={editingUser.activo ? "1" : "0"}
                      onChange={(e) => setEditingUser({ ...editingUser, activo: e.target.value === "1" })}
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
                  disabled={loading}
                  style={{
                    backgroundColor: '#4ADE80',
                    color: '#0F172A',
                    fontWeight: 'bold',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(74, 222, 128, 0.3)'
                  }}
                >
                  {loading ? (
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