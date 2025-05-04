import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export const Categorias = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('access_token');

    if (!token) {
      navigate('/login');
      return;
    }
 
  }, [navigate]);

  return (
    <div className="contaier d-flex justify-content-center align-items-center">
      <div className="container-fluid p-4 rounded-3 shadow-lg text-center">
        <div className="logo mb-3">🐑</div>
        <h2 className="text-white mb-4">Categorias</h2>

      </div>
    </div>
  );
}