import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, CheckCircle, XCircle, Loader } from 'lucide-react';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [token, setToken] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    // Extraer el token de la URL al cargar el componente
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const urlToken = queryParams.get('token');

        if (!urlToken) {
            setIsTokenValid(false);
            setErrorMessage('No se encontró el token de restablecimiento en la URL');
        } else {
            setToken(urlToken);
            // Opcionalmente, podrías validar el token aquí con una llamada al backend
        }
    }, [location.search]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            return;
        }

        // Validar longitud mínima de contraseña
        if (password.length < 8) {
            setErrorMessage('La contraseña debe tener al menos 8 caracteres');
            return;
        }

        setIsLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
            const response = await fetch(`${backendUrl}/reset-password`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ new_password: password })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message || '¡Contraseña actualizada con éxito!');
                // Redirigir al login después de unos segundos
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setErrorMessage(data.error || 'Error al restablecer la contraseña');
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

                            <h2 className="text-white fw-bold mb-3">Restablecer Contraseña</h2>
                            <p className="text-white-50 mb-4">Ingresa tu nueva contraseña para continuar</p>
                        </div>

                        {!isTokenValid ? (
                            // Mostrar error si el token no es válido
                            <div className="bg-dark bg-opacity-25 rounded-4 p-4 p-md-5 shadow-lg text-center">
                                <div className="d-flex justify-content-center mb-4">
                                    <div className="rounded-circle bg-danger d-flex align-items-center justify-content-center"
                                        style={{ width: '80px', height: '80px' }}>
                                        <XCircle size={50} className="text-white" />
                                    </div>
                                </div>
                                <h3 className="text-white mb-3">Error de validación</h3>
                                <p className="text-white-50 mb-4">{errorMessage}</p>
                                <button
                                    onClick={() => navigate('/forgot-password')}
                                    className="btn py-3 px-5"
                                    style={{
                                        backgroundColor: '#4ADE80',
                                        borderRadius: '30px',
                                        color: '#0F172A',
                                        fontWeight: 'bold',
                                        boxShadow: '0 0 15px rgba(74, 222, 128, 0.5)',
                                        minWidth: '200px'
                                    }}
                                >
                                    Solicitar nuevo enlace
                                </button>
                            </div>
                        ) : (
                            // Mostrar formulario si el token es válido
                            <div className="bg-dark bg-opacity-25 rounded-4 p-4 p-md-5 shadow-lg">
                                {successMessage ? (
                                    // Mensaje de éxito
                                    <div className="text-center">
                                        <div className="d-flex justify-content-center mb-4">
                                            <div className="rounded-circle bg-success d-flex align-items-center justify-content-center"
                                                style={{ width: '80px', height: '80px' }}>
                                                <CheckCircle size={50} className="text-white" />
                                            </div>
                                        </div>
                                        <h3 className="text-white mb-3">¡Contraseña actualizada!</h3>
                                        <p className="text-white-50 mb-4">{successMessage}</p>
                                        <p className="text-white-50">Serás redirigido a la página de inicio de sesión...</p>
                                    </div>
                                ) : (
                                    // Formulario
                                    <form onSubmit={handleSubmit}>
                                        {errorMessage && (
                                            <div className="alert alert-danger mb-4">
                                                {errorMessage}
                                            </div>
                                        )}

                                        <div className="mb-4 position-relative">
                                            <label htmlFor="password" className="form-label text-white mb-2">Nueva contraseña</label>
                                            <div className="position-relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    id="password"
                                                    className="form-control py-3"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                    style={{
                                                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                                                        border: 'none',
                                                        borderRadius: '30px',
                                                        color: 'white',
                                                        paddingLeft: '20px',
                                                        paddingRight: '45px'
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    className="btn position-absolute end-0 top-50 translate-middle-y"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    style={{ background: 'none', border: 'none' }}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff size={20} className="text-white-50" />
                                                    ) : (
                                                        <Eye size={20} className="text-white-50" />
                                                    )}
                                                </button>
                                            </div>
                                            <small className="text-white-50 d-block mt-2">
                                                La contraseña debe tener al menos 8 caracteres
                                            </small>
                                        </div>

                                        <div className="mb-4 position-relative">
                                            <label htmlFor="confirmPassword" className="form-label text-white mb-2">Confirmar contraseña</label>
                                            <div className="position-relative">
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    id="confirmPassword"
                                                    className="form-control py-3"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    required
                                                    style={{
                                                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                                                        border: 'none',
                                                        borderRadius: '30px',
                                                        color: 'white',
                                                        paddingLeft: '20px',
                                                        paddingRight: '45px'
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    className="btn position-absolute end-0 top-50 translate-middle-y"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    style={{ background: 'none', border: 'none' }}
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOff size={20} className="text-white-50" />
                                                    ) : (
                                                        <Eye size={20} className="text-white-50" />
                                                    )}
                                                </button>
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
                                                    'Cambiar Contraseña'
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
                            </div>
                        )}

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

export default ResetPassword;