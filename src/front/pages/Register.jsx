import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DormireLogo from "../assets/img/sheep_logo.svg";
import { motion } from 'framer-motion';

export const Register = () => {
    const [username, setUserName] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden.');
            setSuccessMessage('');
            return;
        }

        const registrationData = {
            username,
            nombre,
            apellido,
            email,
            password,
            is_active: true,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message);
                setErrorMessage('');
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            } else {
                if (data.errors) {
                    setErrorMessage(Object.values(data.errors).join('\n'));
                } else if (data.error) {
                    setErrorMessage(data.error);
                } else {
                    setErrorMessage('Error al registrar la cuenta.');
                }
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error al comunicarse con el backend:', error);
            setErrorMessage('Error al comunicarse con el servidor.');
            setSuccessMessage('');
        }
    };

    return (
        <motion.div
            style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #0A1744 100%)',
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                width: '100%',
                minHeight: '100vh', // Cambiado a minHeight: 100vh
                position: 'relative', // Cambiado de absolute a relative
                paddingTop: '50px',
                paddingBottom: '150px' // Aumentado el padding inferior para dejar espacio al footer
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Elementos decorativos */}
            <div className="position-absolute" style={{ top: '10%', left: '10%', color: 'rgba(255,255,255,0.3)', fontSize: '24px', zIndex: 1 }}>✦</div>
            <div className="position-absolute" style={{ top: '15%', right: '15%', color: 'rgba(255,255,255,0.3)', fontSize: '24px', zIndex: 1 }}>✦</div>
            <div className="position-absolute" style={{ bottom: '30%', left: '20%', color: 'rgba(255,255,255,0.3)', fontSize: '24px', zIndex: 1 }}>✦</div>
            <div className="position-absolute" style={{ bottom: '20%', right: '10%', color: 'rgba(255,255,255,0.3)', fontSize: '24px', zIndex: 1 }}>✦</div>
            <div className="position-absolute" style={{ bottom: '5%', right: '25%', color: 'rgba(255,255,255,0.3)', fontSize: '24px', zIndex: 1 }}>✦</div>

            {/* Puntos decorativos */}
            <div className="position-absolute" style={{ top: '30%', left: '25%', zIndex: 1 }}>
                <div className="d-flex">
                    <div className="rounded-circle mx-1" style={{ width: '6px', height: '6px', backgroundColor: '#4ADE80' }}></div>
                    <div className="rounded-circle mx-1" style={{ width: '6px', height: '6px', backgroundColor: '#4ADE80' }}></div>
                    <div className="rounded-circle mx-1" style={{ width: '6px', height: '6px', backgroundColor: '#4ADE80' }}></div>
                </div>
            </div>

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8">
                        <div className="text-center mb-4">
                            {/* Logo */}
                            <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                                style={{ width: '120px', height: '120px', backgroundColor: '#1E3A8A', position: 'relative' }}>
                                <img src={DormireLogo || "/placeholder.svg"} alt="Logo" style={{ width: '80%', height: '80%' }} />

                                {/* Estrellas alrededor del logo */}
                                <div className="position-absolute" style={{ top: '10%', right: '10%', color: 'white', fontSize: '16px' }}>✦</div>
                                <div className="position-absolute" style={{ bottom: '20%', right: '15%', color: 'white', fontSize: '16px' }}>✦</div>
                                <div className="position-absolute" style={{ top: '20%', left: '15%', color: 'white', fontSize: '16px' }}>✦</div>

                                {/* Puntos verdes alrededor del logo */}
                                <div className="position-absolute rounded-circle" style={{ top: '20%', right: '20%', width: '8px', height: '8px', backgroundColor: '#4ADE80' }}></div>
                                <div className="position-absolute rounded-circle" style={{ top: '20%', left: '20%', width: '8px', height: '8px', backgroundColor: '#4ADE80' }}></div>
                            </div>

                            <h2 className="text-white fw-bold mb-3">Registro de Usuario</h2>

                            {errorMessage && (
                                <div className="alert alert-danger mx-auto mb-4" style={{ maxWidth: '500px' }}>
                                    {errorMessage}
                                </div>
                            )}

                            {successMessage && (
                                <div className="alert alert-success mx-auto mb-4" style={{ maxWidth: '500px' }}>
                                    {successMessage}
                                </div>
                            )}
                        </div>

                        <div className="bg-dark bg-opacity-25 rounded-4 p-4 p-md-5 shadow-lg">
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className="form-control py-3"
                                                placeholder="Nombre de Usuario"
                                                value={username}
                                                onChange={(e) => setUserName(e.target.value)}
                                                required
                                                style={{
                                                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                                                    border: 'none',
                                                    borderRadius: '30px',
                                                    color: 'white',
                                                    paddingLeft: '20px'
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className="form-control py-3"
                                                placeholder="Nombre"
                                                value={nombre}
                                                onChange={(e) => setNombre(e.target.value)}
                                                required
                                                style={{
                                                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                                                    border: 'none',
                                                    borderRadius: '30px',
                                                    color: 'white',
                                                    paddingLeft: '20px'
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className="form-control py-3"
                                                placeholder="Apellido"
                                                value={apellido}
                                                onChange={(e) => setApellido(e.target.value)}
                                                required
                                                style={{
                                                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                                                    border: 'none',
                                                    borderRadius: '30px',
                                                    color: 'white',
                                                    paddingLeft: '20px'
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <input
                                                type="email"
                                                className="form-control py-3"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                style={{
                                                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                                                    border: 'none',
                                                    borderRadius: '30px',
                                                    color: 'white',
                                                    paddingLeft: '20px'
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3 position-relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control py-3"
                                                placeholder="Contraseña"
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
                                                <i className={`fa-solid fa-eye${showPassword ? '-slash' : ''} text-white-50`}></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3 position-relative">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                className="form-control py-3"
                                                placeholder="Confirmar contraseña"
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
                                                <i className={`fa-solid fa-eye${showConfirmPassword ? '-slash' : ''} text-white-50`}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Botón de registro con luna decorativa */}
                                <div className="position-relative mt-4 text-center">
                                    <button
                                        type="submit"
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
                                        Registrarse
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

                                <div className="text-center mt-4">
                                    <Link to="/login" className="text-white text-decoration-underline">
                                        ¿Ya tienes una cuenta? Inicia sesión
                                    </Link>
                                </div>
                            </form>
                        </div>

                        {/* Footer interno del componente */}
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
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};