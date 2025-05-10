import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cloudinary } from "@cloudinary/url-gen";

export const Categoria = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState(null);

    const cld = new Cloudinary({ cloud: { cloudName: 'dz71k8oei' } });

    const handleCategoria = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/categorias/` + id, {
                method: 'GET',
            });

            const data = await response.json(); 

            setCategoria(data);
            console.log(data); 

            if (!response.ok) {
                if (data && data.error) { 
                    console.error('Error al cargar categorias:', data.error);
                } else {
                    console.error('Error al cargar categorias. Código de estado:', response.status);
                }
            }
        } catch (error) {
            console.error('Error al comunicarse con el backend:', error);
        }
    };

    useEffect(() => {
        handleCategoria();
    }, [id]); 

    // Si la categoria no está cargada, mostrar un spinner
    if (!categoria) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#0a1744' }}>
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="position-relative vh-100 d-flex flex-column" style={{
            backgroundColor: '#0a1744',
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
        }}>

            {/* Imagen de fondo con overlay */}
            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 0 }}>
                <img
                    src={cld.image(categoria.imagen).toURL()}
                    alt={categoria.titulo}
                    className="w-100 h-100 object-fit-cover"
                    style={{ opacity: 0.6 }}
                    onError={(e) => {
                        e.target.onerror = null;;
                    }}
                />

                <div className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(10,23,68,0.5) 0%, rgba(10,23,68,0.9) 100%)',
                    }}>
                </div>
            </div>

            {/* Elementos decorativos */}
            <div className="position-absolute" style={{ top: '10%', right: '10%', color: 'rgba(255,255,255,0.3)', fontSize: '24px', zIndex: 1 }}>✦</div>
            <div className="position-absolute" style={{ bottom: '20%', left: '15%', color: 'rgba(255,255,255,0.3)', fontSize: '24px', zIndex: 1 }}>✦</div>

            {/* Contenido principal */}
            <div className="container d-flex flex-column flex-grow-1 position-relative" style={{ zIndex: 1 }}>
                {/* Título */}
                <div className="text-center my-auto">
                    <h1 className="text-white display-4 fw-bold">{categoria.titulo}</h1>
                </div>
            </div>

        </div>
    );
};