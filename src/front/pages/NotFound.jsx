import React from "react";
import { Link } from "react-router-dom";
import DormireLogo from "../assets/img/sheep_logo.svg";

export const NotFound = () => {
    return (
        <div
            className="w-100 min-vh-100 d-flex align-items-center justify-content-center position-relative"
            style={{
                backgroundColor: '#000000',
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
            }}
        >
            {/* Elementos decorativos */}
            <div className="position-absolute" style={{ top: '10%', left: '5%', color: 'rgba(255,255,255,0.1)', fontSize: '24px' }}>✦</div>
            <div className="position-absolute" style={{ top: '15%', right: '10%', color: 'rgba(255,255,255,0.1)', fontSize: '24px' }}>✦</div>
            <div className="position-absolute" style={{ bottom: '20%', left: '8%', color: 'rgba(255,255,255,0.1)', fontSize: '24px' }}>✦</div>
            <div className="position-absolute" style={{ bottom: '10%', right: '5%', color: 'rgba(255,255,255,0.1)', fontSize: '24px' }}>✦</div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div
                            className="text-center p-5 rounded-4 shadow-lg"
                            style={{
                                background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.3) 0%, rgba(10, 23, 68, 0.3) 100%)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.05)'
                            }}
                        >
                            <div className="mb-5">
                                <div
                                    className="logo-container position-relative mb-4"
                                >
                                    {/* Resplandor detrás del logo */}
                                    <div
                                        className="position-absolute top-50 start-50 translate-middle rounded-circle"
                                        style={{
                                            width: '120px',
                                            height: '120px',
                                            background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
                                            opacity: '0.3',
                                            filter: 'blur(20px)',
                                            zIndex: '0'
                                        }}
                                    ></div>

                                    {/* Logo con animación suave */}
                                    <img
                                        src={DormireLogo || "/placeholder.svg"}
                                        alt="Dormire"
                                        className="position-relative"
                                        style={{
                                            width: '120px',
                                            height: '120px',
                                            objectFit: 'contain',
                                            zIndex: '1',
                                            animation: 'float 3s ease-in-out infinite'
                                        }}
                                    />
                                </div>

                                <h1 className="text-white display-4 fw-bold mb-2">404</h1>
                                <h2 className="text-white mb-3">Página no encontrada</h2>
                                <p className="text-white-50 mb-4">
                                    Lo sentimos, la página que estás buscando no existe o ha sido movida.
                                </p>
                            </div>

                            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                                <Link
                                    to="/"
                                    className="btn py-2 px-4"
                                    style={{
                                        backgroundColor: '#3B82F6',
                                        borderRadius: '30px',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3B82F6'}
                                >
                                    <i className="fa-solid fa-house me-2"></i>
                                    Volver al inicio
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Estilos CSS para animaciones */}
            <style jsx>{`
                @keyframes float {
                    0% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                    100% {
                        transform: translateY(0px);
                    }
                }
            `}</style>
        </div>
    );
};