import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Cloudinary } from "@cloudinary/url-gen";

export const HistoriaPlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [historia, setHistoria] = useState(null);

    const cld = new Cloudinary({ cloud: { cloudName: 'dz71k8oei' } });

    // Datos de ejemplo (en una aplicación real, estos vendrían de una API)
    const historiasData = [
        {
            id: 1,
            titulo: "Los sueños del Faraón",
            imagen: "los_sueños_del_faraon_bbdvw3",
            youtubeId: "dQw4w9WgXcQ", // ID de ejemplo, reemplazar con ID real
            duracion: 29
        },
        {
            id: 2,
            titulo: "El viejo Búho de Baviera",
            imagen: "el_viejo_buho_fnezfz",
            youtubeId: "9bZkp7q19f0", // ID de ejemplo, reemplazar con ID real
            duracion: 55
        },
        // Más historias...
    ];

    // Cargar la historia seleccionada
    useEffect(() => {
        const selectedHistoria = historiasData.find(h => h.id === parseInt(id));
        if (selectedHistoria) {
            setHistoria(selectedHistoria);
        } else {
            navigate('/historias');
        } 
        if (!historia) return;
    }, [historia]);

    // Si la historia no está cargada, mostrar un spinner
    if (!historia) {
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
                    src={cld.image(historia.imagen).toURL()}
                    alt={historia.titulo}
                    className="w-100 h-100 object-fit-cover"
                    style={{ opacity: 0.6 }}
                    onError={(e) => {
                        e.target.onerror = null;;
                    }}
                />

                <video
                    width="192"
                    height="108"
                    src={cld.video(cld.video("")).toURL()}
                    controls
                    autoPlay
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
                    <h1 className="text-white display-4 fw-bold">{historia.titulo}</h1>
                </div>
            </div>

        </div>
    );
};