import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validar formato de email
        if (!validateEmail(email)) {
            setErrorMessage('Por favor, ingresa un correo electrónico válido');
            return;
        }

        setIsLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || '';

            // Enviar como objeto JSON con el header Content-Type adecuado
            const response = await fetch(`${backendUrl}/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.msg || 'Se ha enviado un enlace de recuperación a tu correo electrónico');
                setIsSubmitted(true);
            } else {
                setErrorMessage(data.msg || 'Error al procesar la solicitud');
            }
        } catch (error) {
            console.error('Error al comunicarse con el servidor:', error);
            setErrorMessage('Error de conexión con el servidor');
        } finally {
            setIsLoading(false);
        }
    };

    // Renderizar estrellas decorativas
    const renderStars = () => {
        return (
            <>
                <div className="position-absolute" style={{ top: '10%', left: '10%', color: 'rgba(255,255,255,0.3)', fontSize: '24px' }}>✦</div>
                <div className="position-absolute" style={{ top: '15%', right: '15%', color: 'rgba(255,255,255,0.3)', fontSize: '24px' }}>✦</div>
                <div className="position-absolute" style={{ bottom: '30%', left: '20%', color: 'rgba(255,255,255,0.3)', fontSize: '24px' }}>✦</div>
                <div className="position-absolute" style={{ bottom: '20%', right: '10%', color: 'rgba(255,255,255,0.3)', fontSize: '24px' }}>✦</div>
                <div className="position-absolute" style={{ bottom: '5%', right: '25%', color: 'rgba(255,255,255,0.3)', fontSize: '24px' }}>✦</div>
            </>
        );
    };

    // Renderizar puntos decorativos
    const renderDots = () => {
        return (
            <div className="position-absolute" style={{ top: '30%', left: '25%' }}>
                <div className="d-flex">
                    <div className="rounded-circle mx-1" style={{ width: '6px', height: '6px', backgroundColor: '#4ADE80' }}></div>
                    <div className="rounded-circle mx-1" style={{ width: '6px', height: '6px', backgroundColor: '#4ADE80' }}></div>
                    <div className="rounded-circle mx-1" style={{ width: '6px', height: '6px', backgroundColor: '#4ADE80' }}></div>
                </div>
            </div>
        );
    };

    return (
        <motion.div
            style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #0A1744 100%)',
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                width: '100%',
                minHeight: '100vh',
                position: 'relative',
                paddingTop: '50px',
                paddingBottom: '150px'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {renderStars()}
            {renderDots()}

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="text-center mb-4">
                            {/* Logo */}
                            <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                                style={{ width: '120px', height: '120px', backgroundColor: '#1E3A8A', position: 'relative' }}>
                                <img
                                    src="https://i.imgur.com/RIrjVgm.png"
                                    alt="Dormiré Logo"
                                    style={{ width: '80%', height: '80%' }}
                                />

                                {/* Estrellas alrededor del logo */}
                                <div className="position-absolute" style={{ top: '10%', right: '10%', color: 'white', fontSize: '16px' }}>✦</div>
                                <div className="position-absolute" style={{ bottom: '20%', right: '15%', color: 'white', fontSize: '16px' }}>✦</div>
                                <div className="position-absolute" style={{ top: '20%', left: '15%', color: 'white', fontSize: '16px' }}>✦</div>

                                {/* Puntos verdes alrededor del logo */}
                                <div className="position-absolute rounded-circle" style={{ top: '20%', right: '20%', width: '8px', height: '8px', backgroundColor: '#4ADE80' }}></div>
                                <div className="position-absolute rounded-circle" style={{ top: '20%', left: '20%', width: '8px', height: '8px', backgroundColor: '#4ADE80' }}></div>
                            </div>

                            <h2 className="text-white fw-bold mb-3">Recuperar Contraseña</h2>
                            <p className="text-white-50 mb-4">
                                Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
                            </p>
                        </div>

                        <div className="bg-dark bg-opacity-25 rounded-4 p-4 p-md-5 shadow-lg">
                            {isSubmitted ? (
                                // Mensaje de éxito después de enviar
                                <div className="text-center">
                                    <div className="d-flex justify-content-center mb-4">
                                        <div className="rounded-circle bg-success d-flex align-items-center justify-content-center"
                                            style={{ width: '80px', height: '80px' }}>
                                            <CheckCircle size={50} className="text-white" />
                                        </div>
                                    </div>
                                    <h3 className="text-white mb-3">¡Solicitud enviada!</h3>
                                    <p className="text-white-50 mb-4">{successMessage}</p>
                                    <p className="text-white-50 mb-4">
                                        Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
                                    </p>
                                    <div className="d-flex flex-column gap-3">
                                        <Link
                                            to="/login"
                                            className="btn py-3 px-5 mx-auto"
                                            style={{
                                                backgroundColor: '#4ADE80',
                                                borderRadius: '30px',
                                                color: '#0F172A',
                                                fontWeight: 'bold',
                                                boxShadow: '0 0 15px rgba(74, 222, 128, 0.5)',
                                                minWidth: '200px',
                                                textDecoration: 'none'
                                            }}
                                        >
                                            Volver al inicio de sesión
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                // Formulario para solicitar restablecimiento
                                <form onSubmit={handleSubmit}>
                                    {errorMessage && (
                                        <div className="alert alert-danger d-flex align-items-center mb-4">
                                            <AlertCircle size={20} className="me-2" />
                                            {errorMessage}
                                        </div>
                                    )}

                                    <div className="mb-4">
                                        <label htmlFor="email" className="form-label text-white mb-2">Correo electrónico</label>
                                        <div className="position-relative">
                                            <div className="position-absolute top-50 translate-middle-y ms-3">
                                                <Mail size={20} className="text-white-50" />
                                            </div>
                                            <input
                                                type="email"
                                                id="email"
                                                className="form-control py-3"
                                                placeholder="tu@email.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                style={{
                                                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                                                    border: 'none',
                                                    borderRadius: '30px',
                                                    color: 'white',
                                                    paddingLeft: '45px'
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Botón de envío con luna decorativa */}
                                    <div className="position-relative mt-5 text-center">
                                        <button
                                            type="submit"
                                            className="btn py-3 px-5"
                                            disabled={isLoading}
                                            style={{
                                                backgroundColor: '#4ADE80',
                                                borderRadius: '30px',
                                                color: '#0F172A',
                                                fontWeight: 'bold',
                                                boxShadow: '0 0 15px rgba(74, 222, 128, 0.5)',
                                                minWidth: '200px'
                                            }}
                                        >
                                            {isLoading ? (
                                                <Loader size={24} className="animate-spin" />
                                            ) : (
                                                <>
                                                    Enviar enlace
                                                    <ArrowRight size={18} className="ms-2" />
                                                </>
                                            )}
                                        </button>
                                        <div className="position-absolute" style={{ bottom: '-10px', right: '25%' }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                backgroundColor: '#F59E0B',
                                                boxShadow: '0 0 10px rgba(245, 158, 11, 0.5)',
                                                transform: 'rotate(230deg)'
                                            }}></div>
                                        </div>
                                    </div>
                                </form>
                            )}

                            <div className="text-center mt-4">
                                <Link to="/login" className="text-white text-decoration-underline">
                                    Volver al inicio de sesión
                                </Link>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="text-center mt-4 mb-5">
                            <div className="d-flex justify-content-center gap-3">
                                <a href="#" className="text-white-50 text-decoration-none" style={{ fontSize: '0.8rem' }}>
                                    Política de privacidad
                                </a>
                                <span className="text-white-50">|</span>
                                <a href="#" className="text-white-50 text-decoration-none" style={{ fontSize: '0.8rem' }}>
                                    Condiciones del servicio
                                </a>
                            </div>
                            <p className="mt-3 mb-0 text-white-50 small">
                                © {new Date().getFullYear()} Dormiré. Todos los derechos reservados.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ForgotPassword;