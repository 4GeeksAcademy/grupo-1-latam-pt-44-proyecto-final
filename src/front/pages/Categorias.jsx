import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';

// Componente para las opciones de contenido
const ContentOption = ({ icon, text, isSelected, onClick }) => {
  return (
    <div
      className={`d-flex justify-content-between align-items-center p-3 mb-3 rounded-pill ${isSelected ? 'bg-dark border border-primary border-2' : 'bg-secondary bg-opacity-50'
        }`}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <span className="text-light fs-5">{text}</span>
      <span className="text-light fs-4">{icon}</span>
    </div>
  );
};

export const Categorias = ({ item }) => {
  const { dispatch, store } = useGlobalReducer();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(0);
  const token = sessionStorage.getItem('access_token');
  const contentOptions = [
    { text: "Historias para dormir", icon: "📚" },
    { text: "Meditaciones", icon: "🧘" },
    { text: "Música relajante", icon: "🎵" },
    { text: "Sonidos de naturaleza", icon: "🍃" }
  ];

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
  }, [navigate, token]);

  return (
    <div
      className="container-fluid vh-100 d-flex flex-column align-items-center"
      style={{
        backgroundColor: '#0a1744',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        justifyContent: 'flex-start',
        paddingTop: '60px'
      }}
    >
      {/* Estrella en la parte superior */}
      <div className="text-light mb-4 fs-1">✨</div>

      {/* Título principal */}
      <h2 className="text-light text-center mb-4">
        ¿Qué contenidos<br />prefieres para dormir?
      </h2>

      {/* Contenedor de opciones */}
      <div className="container" style={{ maxWidth: '500px' }}>
        {contentOptions.map((option, index) => (
          <ContentOption
            key={index}
            text={option.text}
            icon={option.icon}
            isSelected={selectedOption === index}
            onClick={() => navigate(`/categorias/${index + 1}`)}
          />
        ))}
      </div>
    </div>
  );
};