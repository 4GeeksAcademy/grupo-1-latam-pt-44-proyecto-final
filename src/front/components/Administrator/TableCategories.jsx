import React from "react";

export const TableCategories = () => {

  return (

    <div className="d-flex flex-column w-100 p-5">
      <h1 className="text-info">Categories</h1>
      <div className="d-flex justify-content-end py-3">
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button class="btn btn-secondary me-md-2" type="button">Agregar Categoría</button>
        </div>
      </div>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Ciudad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ana</td>
            <td>30</td>
            <td>México</td>
            <td>
              <button className="btn btn-primary mx-2"><i className="fa-solid fa-pencil"></i></button>
              <button className="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>
          <tr>
            <td>Juan</td>
            <td>25</td>
            <td>Madrid</td>
            <td>
              <button className="btn btn-primary mx-2"><i className="fa-solid fa-pencil"></i></button>
              <button className="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  )

}
