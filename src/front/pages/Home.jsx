import React, { useEffect, useState } from "react";
import SplashScreen from "../components/SplashScreen.jsx";
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { Link } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
    const {store, dispatch } = useGlobalReducer();
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(null);
    const cld = new Cloudinary({ cloud: { cloudName: 'dz71k8oei' } });

    // Use this sample image or upload your own via the Media Explorer
    const img = cld
        .image('sheep_logo_bdmk04')
        .format('auto')
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(120).height(120));

    const loadMessage = async () => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            console.log(backendUrl);

            if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");

            const response = await fetch(backendUrl + "/api/hello");
            const data = await response.json();

            if (response.ok) dispatch({ type: "set_hello", payload: data.message });
            
            // Simular un tiempo de carga mínimo para mostrar el splash screen
            setTimeout(() => {
                setLoading(false);
            }, 1500);

            return data;
        } catch (error) {
            setLoading(false);
            if (error.message) throw new Error(
                `Could not fetch the message from the backend.
                Please check if the backend is running and the backend port is public.`
            );
        }
    };

    useEffect(() => {
        loadMessage();
    }, []);

    // Categorías con sus datos
    const categories = [
        {
            id: 1,
            title: "Historias para dormir",
            description: "Déjate llevar por narraciones suaves y envolventes diseñadas para calmar tu mente y prepararte para un descanso profundo.",
            icon: "fa-book",
            color: "#4ADE80", // Verde
            route: "/categorias/1"
        },
        {
            id: 2,
            title: "Meditaciones",
            description: "Encuentra la paz interior y reduce el estrés con nuestras sesiones de meditación guiada, perfectas para relajar tu cuerpo y mente antes de dormir.",
            icon: "fa-om",
            color: "#F59E0B", // Ámbar
            route: "/categorias/2"
        },
        {
            id: 3,
            title: "Música relajante",
            description: "Disfruta de una variedad de sonidos armónicos y melodías suaves creadas específicamente para inducir la relajación y facilitar un sueño tranquilo.",
            icon: "fa-music",
            color: "#3B82F6", // Azul
            route: "/categorias/3"
        },
        {
            id: 4,
            title: "Sonidos de la naturaleza",
            description: "Sumérgete en la tranquilidad de la naturaleza con paisajes sonoros relajantes como la lluvia suave, el canto de los pájaros y el susurro del mar.",
            icon: "fa-leaf",
            color: "#EC4899", // Rosa
            route: "/categorias/4"
        }
    ];

    // Función para manejar el hover en las categorías
    const handleCategoryHover = (id) => {
        setActiveCategory(id);
    };

    return (
        <div>
            {loading ? <SplashScreen /> : (
                <div className="min-vh-100 d-flex flex-column" style={{ 
                    backgroundColor: '#0a1744',
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', 
                    backgroundSize: '50px 50px'
                }}>
                    {/* Elementos decorativos */}
                    <div className="position-absolute" style={{ top: '10%', left: '5%', color: 'rgba(255,255,255,0.3)', fontSize: '24px' }}>✦</div>
                    <div className="position-absolute" style={{ top: '15%', right: '10%', color: 'rgba(255,255,255,0.3)', fontSize: '24px' }}>✦</div>
                    <div className="position-absolute" style={{ bottom: '20%', left: '15%', color: 'rgba(255,255,255,0.3)', fontSize: '24px' }}>✦</div>
                    <div className="position-absolute" style={{ bottom: '10%', right: '5%', color: 'rgba(255,255,255,0.3)', fontSize: '24px' }}>✦</div>
                    
                    {/* Header con logo y título */}
                    <header className="text-white text-center py-5">
                        <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" 
                             style={{ width: '120px', height: '120px', position: 'relative' }}>
								
                            <div style={{ width: '80px', height: '80px', left: '0px', top: '29px', position: 'absolute' }}>
                                <AdvancedImage cldImg={img} />
                            </div>
                            
                            {/* Estrellas alrededor del logo */}
                            {/* <div className="position-absolute" style={{ top: '10%', right: '10%', color: 'white', fontSize: '16px' }}>✦</div>
                            <div className="position-absolute" style={{ bottom: '20%', right: '15%', color: 'white', fontSize: '16px' }}>✦</div>
                            <div className="position-absolute" style={{ top: '20%', left: '15%', color: 'white', fontSize: '16px' }}>✦</div> */}
                            
                            {/* Puntos verdes alrededor del logo */}
                            {/* <div className="position-absolute rounded-circle" style={{ top: '20%', right: '20%', width: '8px', height: '8px', backgroundColor: '#4ADE80' }}></div>
                            <div className="position-absolute rounded-circle" style={{ top: '20%', left: '20%', width: '8px', height: '8px', backgroundColor: '#4ADE80' }}></div> */}
                        </div>
                        <h1 className="display-4 fw-bold mb-2">Bienvenido a Dormire</h1>
                        <p className="lead mb-5">Tu compañero para un sueño reparador</p>
                    </header>

                    {/* Sección de categorías */}
                    <section className="py-4 flex-grow-1">
                        <div className="container">
                            <h2 className="text-center text-white mb-5">Explora nuestras categorías</h2>
                            <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center">
                                {categories.map((category) => (
                                    <div className="col" key={category.id} style={{ maxWidth: '450px' }}>
                                        <Link 
                                            to={category.route} 
                                            className="text-decoration-none"
                                            onMouseEnter={() => handleCategoryHover(category.id)}
                                            onMouseLeave={() => handleCategoryHover(null)}
                                        >
                                            <div className="card h-100 border-0 shadow-lg" 
                                                style={{ 
                                                    borderRadius: '16px', 
                                                    backgroundColor: 'rgba(30, 58, 138, 0.5)',
                                                    transform: activeCategory === category.id ? 'translateY(-5px)' : 'translateY(0)',
                                                    transition: 'all 0.3s ease',
                                                    boxShadow: activeCategory === category.id ? `0 10px 25px rgba(${category.color.replace('#', '').match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.3)` : 'none'
                                                }}
                                            >
                                                <div className="card-body p-4">
                                                    <div className="d-flex align-items-center mb-3">
                                                        <div className="rounded-circle d-flex align-items-center justify-content-center me-3" 
                                                            style={{ 
                                                                width: '50px', 
                                                                height: '50px', 
                                                                backgroundColor: category.color,
                                                                boxShadow: `0 0 15px ${category.color}`
                                                            }}
                                                        >
                                                            <i className={`fa-solid ${category.icon} text-white fs-4`}></i>
                                                        </div>
                                                        <h3 className="card-title text-white mb-0">{category.title}</h3>
                                                    </div>
                                                    <p className="card-text text-white-50">{category.description}</p>
                                                    <div className="text-end mt-3">
                                                        <span className="text-white-50">
                                                            Explorar <i className="fa-solid fa-arrow-right ms-1"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Sección de llamada a la acción */}
                    <section className="py-5 text-center" style={{ 
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(37, 99, 235, 0.8) 100%)',
                        borderRadius: '30px 30px 0 0',
                        marginTop: '30px'
                    }}>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-8">
                                    <h2 className="text-white mb-4">Comienza a dormir mejor hoy</h2>
                                    <p className="text-white-50 mb-4">Descubre cómo nuestras historias, meditaciones y sonidos pueden transformar tu rutina de sueño y mejorar tu bienestar general.</p>
                                    <Link to="/categorias" className="btn btn-light btn-lg px-5 py-3 rounded-pill">
                                        Comenzar ahora <i className="fa-solid fa-arrow-right ms-2"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Imagen decorativa de luna */}
                    <div className="position-absolute" style={{ bottom: '80px', right: '50px', zIndex: 1 }}>
                        <div style={{ 
                            width: '60px', 
                            height: '60px', 
                            borderRadius: '50%', 
                            backgroundColor: '#F59E0B',
                            boxShadow: '0 0 20px rgba(245, 158, 11, 0.5)',
                            transform: 'rotate(230deg)'
                        }}></div>
                    </div>

                    {/* Footer */}
                    {/* <footer className="bg-dark text-light text-center py-4">
                        <div className="container">
                            <div className="mb-3">
                                <a href="#" className="text-white-50 mx-2">
                                    <i className="fa-brands fa-facebook-f"></i>
                                </a>
                                <a href="#" className="text-white-50 mx-2">
                                    <i className="fa-brands fa-twitter"></i>
                                </a>
                                <a href="#" className="text-white-50 mx-2">
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                            </div>
                            <div className="d-flex justify-content-center mb-3">
                                <a href="#" className="text-white-50 text-decoration-none mx-2">Política de privacidad</a>
                                <span className="text-white-50">|</span>
                                <a href="#" className="text-white-50 text-decoration-none mx-2">Condiciones del servicio</a>
                            </div>
                            <p className="mb-0 text-white-50">&copy; 2025 Dormire. Todos los derechos reservados.</p>
                        </div>
                    </footer> */}
                </div>
            )}
        </div>
    );
};