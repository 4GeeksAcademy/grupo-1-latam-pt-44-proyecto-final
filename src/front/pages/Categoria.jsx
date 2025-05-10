import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cloudinary } from "@cloudinary/url-gen";
import SplashScreen from "../components/SplashScreen.jsx";

export const Categoria = () => {
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState(null);
    const token = sessionStorage.getItem('access_token');
    const cld = new Cloudinary({ cloud: { cloudName: 'dz71k8oei' } });

    const handleCategoria = async (categoryId) => {
        try {
            const response = await
                fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categorias/${categoryId}`);
            console.log(response)
            if (!response.ok) {
                if (data && data.error) {
                    console.error('Error al cargar categorias:', data.error);
                } else {
                    console.error('Error al cargar categorias. Código de estado: ', response.status);
                }
            }
            // Simular un tiempo de carga mínimo para mostrar el splash screen
            setTimeout(() => {
                setLoading(false);
            }, 1500);
            const data = await response.json();

            setCategoria(data);
            console.log(data);
        } catch (error) {
            console.error('Error al comunicarse con el backend:', error);
        }
    };
 useEffect(() => {
    if (token) {
        if (id) {
            handleCategoria(id);
        }
    }
    else{
      navigate('/login');
      return;
    }
  }, [navigate, token]);

    return (
        <div>
            {loading ? <SplashScreen /> : (
                <div className="min-vh-100 d-flex flex-column" style={{
                    backgroundColor: '#0a1744',
                    backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '50px 50px'
                }}>

                    <div className="position-relative vh-100 d-flex flex-column" style={{
                            backgroundColor: '#0a1744',
                            backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '50px 50px'
                        }}>

                        {/* Elementos decorativos */}
                        <div className="position-absolute" style={{ top: '10%', right: '10%', color: 'rgba(255,255,255,0.3)', fontSize: '24px', zIndex: 1
                        }}>✦</div>
                        <div className="position-absolute" style={{ bottom: '20%', left: '15%', color: 'rgba(255,255,255,0.3)', fontSize: '24px', zIndex: 1
                        }}>✦</div>

                        {/* Contenido principal */}
                        <div className="container d-flex flex-column flex-grow-1 position-relative" style={{ zIndex: 1 }}>
                            {/* Título */}
                            <div className="text-center my-auto">
                                <h1 className="text-white" style={{ fontSize: '3rem', fontWeight: 'bold'
                                }}>{categoria?.nombre}</h1>
                                <p className="text-white" style={{ fontSize: '1.5rem'
                                }}>{categoria?.descripcion}</p>

                                {/* Cuadrícula de historias */}
                                <div className="row g-4">
                                    {categoria?.historias.map((historia) => ( <div className="col-12 col-md-6 col-lg-4" key={historia.id}>
                                            {/* Tarjeta de historia */}
                                            <div
                                                className="card h-100 bg-transparent border-0 position-relative overflow-hidden"
                                                onClick={() =>
                                                    navigate(`/historias/${historia.id}`)}
                                                role="button"
                                                tabIndex={0}
                                                onKeyDown={(e) => {
                                                    if (e.key ===
                                                        'Enter' || e.key === ' ') {
                                                        e.preventDefault();
                                                        navigate(`/historias/${historia.id}`);
                                                    }
                                                }}
                                                style={{
                                                    cursor: 'pointer',
                                                    borderRadius: '16px',
                                                    boxShadow: '0 0 0 3px #3b82f6',
                                                    transition: 'all 0.3s ease'
                                                }}
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
                                                <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0, 0, 0, 0.8) 100%)', borderRadius: '16px' }}>
                                            </div>
                                            <div className="position-absolute top-0 start-0 m-3 px-2 py-1 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
                                                <span className="text-white small">{historia.duracion}</span>
                                            </div>
                                            <div className="position-absolute bottom-0 start-0 w-100 p-3">
                                                <h5 className="text-white mb-0">{historia.titulo}</h5>
                                            </div>
                                        </div>
                                            </div>
                            </div>
                                    ))}
                        </div>


                        {/* Botón de volver */}
                        <div className="d-flex justify-content-center mt-4">
                            <button className="btn btn-primary rounded-pill px-4 py-2"
                                onClick={() => navigate(-1)}
                                style={{ backgroundColor: '#3b82f6', border: 'none' }}
                            >
                                Volver
                            </button>
                        </div>
                    </div>
                </div >

                    </div >
                </div >
            )}
        </div >
    );
};