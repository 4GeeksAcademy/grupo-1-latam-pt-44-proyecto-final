import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cloudinary } from '@cloudinary/url-gen';

export const Historias = () => {
  const [categoriasConHistorias, setCategoriasConHistorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const cld = new Cloudinary({ cloud: { cloudName: 'dz71k8oei' } });
  const navigate = useNavigate(); // Asegúrate de tener useNavigate disponible aquí

  const fetchCategoriasConHistorias = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categorias`);
      if (!response.ok) {
        const message = `Error de la API: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      setCategoriasConHistorias(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar las categorías con historias:', error);
      setLoading(false);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  useEffect(() => {
    fetchCategoriasConHistorias();
  }, []);

  const formatDuration = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours} hr ${mins} min`;
    }
    return `${minutes} min`;
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ backgroundColor: '#0a1744' }}
      >
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container-fluid py-4"
      style={{
        backgroundColor: '#0a1744',
        minHeight: '100vh',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}
    >
      <div className="text-center mb-4 position-relative">
        <span
          className="position-absolute"
          style={{
            top: '-15px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.3)',
            fontSize: '24px'
          }}
        >
          ✦
        </span>
        <h2 className="text-white">Todas las Historias</h2>
      </div>

      {categoriasConHistorias.map((categoria) => (
        <div key={categoria.id} className="mb-5">
          <h3 className="text-white mb-3" style={{ fontWeight: 'bold' }}>
            {categoria.nombre}
          </h3>
          <div className="row g-4">
            {categoria.historias &&
              categoria.historias.map((historia) => (
                <div className="col-12 col-md-6 col-lg-4" key={historia.id}>
                  <div
                    className="card h-100 bg-transparent border-0 position-relative overflow-hidden"
                    onClick={() => navigate(`/historias/${historia.id}`)} // Asegúrate de tener useNavigate disponible aquí
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigate(`/historias/${historia.id}`); // Asegúrate de tener useNavigate disponible aquí
                      }
                    }}
                    style={{ cursor: 'pointer', borderRadius: '16px', boxShadow: '0 0 0 3px #3b82f6', transition: 'all 0.3s ease' }}
                  >
                    <div className="position-relative" style={{ height: '200px', borderRadius: '16px', overflow: 'hidden' }}>
                      <img
                        src={cld.image(historia.imagen).toURL()}
                        className="w-100 h-100 object-fit-cover"
                        alt={historia.titulo}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = cld.image('default-image').toURL();
                        }}
                      />
                      <div
                        className="position-absolute top-0 start-0 w-100 h-100"
                        style={{
                          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100%)',
                          borderRadius: '16px'
                        }}
                      />
                      <div
                        className="position-absolute top-0 start-0 m-3 px-2 py-1 rounded"
                        style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                      >
                        <span className="text-white small">{formatDuration(historia.duracion)}</span>
                      </div>
                      <div className="position-absolute bottom-0 start-0 w-100 p-3">
                        <h5 className="text-white mb-0">{historia.titulo}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      <div className="text-end mt-3">
        <Link to="/" className="text-white text-decoration-none">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};