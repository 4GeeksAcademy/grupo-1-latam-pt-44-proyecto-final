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
    <div className="d-flex flex-column w-100 p-5">
      <h1 className="text-info">Users</h1>

      {errorMessage && (
        <div className="alert alert-danger mt-3">{errorMessage}</div>
      )}

      <div className="d-flex justify-content-end py-3">
        <button className="btn btn-secondary">Agregar Usuario</button>
      </div>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.nombre}</td>
                <td>{user.apellido}</td>
                <td>{user.is_active ? "activo" : "inactivo"}</td>
                <td>
                  <button className="btn btn-primary mx-2" onClick={() => setEditingUser(user)}>
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="7" className="text-center">No hay usuarios disponibles</td></tr>
          )}
        </tbody>
      </table>

      {/* Modal simple para editar */}
      {editingUser && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "#000000aa" }}>
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleEditSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Editar Usuario</h5>
                <button type="button" className="btn-close" onClick={() => setEditingUser(null)}></button>
              </div>
              <div className="modal-body">
                <input className="form-control mb-2" placeholder="Email" value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} />
                <input className="form-control mb-2" placeholder="Username" value={editingUser.username}
                  onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })} />
                <input className="form-control mb-2" placeholder="Nombre" value={editingUser.nombre}
                  onChange={(e) => setEditingUser({ ...editingUser, nombre: e.target.value })} />
                <input className="form-control mb-2" placeholder="Apellido" value={editingUser.apellido}
                  onChange={(e) => setEditingUser({ ...editingUser, apellido: e.target.value })} />
                <input className="form-control mb-2" placeholder="Password (opcional)" type="password"
                  onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })} />
                <select className="form-control" value={editingUser.is_active ? "1" : "0"}
                  onChange={(e) => setEditingUser({ ...editingUser, is_active: e.target.value === "1" })}>
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" type="button" onClick={() => setEditingUser(null)}>Cancelar</button>
                <button className="btn btn-primary" type="submit">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};