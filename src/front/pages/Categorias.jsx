import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';

// Componente para las opciones de contenido
const ContentOption = ({ icon, text, isSelected, onClick }) => {
  return (
    <div 
      className={`d-flex justify-content-between align-items-center p-3 mb-3 rounded-pill ${isSelected ? 'bg-dark border border-primary border-2' : 'bg-secondary bg-opacity-50'}`}
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
    // Mantenemos la función getPeople por si se necesita en el futuro
    // getPeople();
  }, []);

  // Mantenemos las funciones originales comentadas por si se necesitan en el futuro
  /*
  const getPeople = async () => {
    try {
      const response = await fetch('https://www.swapi.tech/api/people');

      if (!response.ok) {
        throw new Error("Ocurrió un error al llamar el endpoint 'people' ");
      }

      const data = await response.json();
      console.log(data);
      const urls = data.results.map((item) => item.url);
      console.log(urls);

      let ListaPersonajes = [];
      for (let index = 0; index < urls.length; index++) {
        const personaje = await getElementDetailById(urls[index], "Personaje");
        ListaPersonajes = [...ListaPersonajes, personaje]
      }

      console.log("Imprimir ListaPersonajes:");
      console.log(ListaPersonajes);

      dispatch({ type: 'set_people_data', payload: ListaPersonajes })

    } catch (error) {
      console.log(error);
    }
  };

  const getElementDetailById = async (url, elemento) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Ocurrió un error al llamar el endpoint: " + elemento);
      }

      const data = await response.json();
      return data.result;

    } catch (error) {
      console.log(error);
    }
  };
  */

  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center" 
         style={{ backgroundColor: '#0a1744', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      
      {/* Estrella en la parte superior */}
      <div className="text-light mb-4 fs-1">✨</div>
      
      {/* Título principal */}
      <h2 className="text-light text-center mb-4">¿Qué contenidos<br />prefieres para dormir?</h2>
      
      {/* Contenedor de opciones */}
      <div className="container" style={{ maxWidth: '500px' }}>
        {contentOptions.map((option, index) => (
          <ContentOption 
            key={index}
            text={option.text}
            icon={option.icon}
            isSelected={selectedOption === index}
            onClick={() => setSelectedOption(index)}
          />
        ))}
      </div>
      
      {/* Botón de saltar */}
      <div className="d-flex justify-content-between w-100 px-5 mt-3" style={{ maxWidth: '500px' }}>
        <button className="btn text-light">
          <i className="bi bi-arrow-left fs-3">←</i>
        </button>
        <a href="#" className="text-light text-decoration-none">Saltar</a>
      </div>
      
      {/* Botón de continuar */}
      <button className="btn btn-primary rounded-pill px-5 py-2 mt-4">
        Continuar
      </button>
    </div>
  )
}