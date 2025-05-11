import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DormireLogo from "../assets/img/sheep_logo.svg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Login = () => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [infoData, setInfoData] = useState();

    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    const getUserFavorites = async () => {

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/favoritos`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`
                }
            });

            const data = await response.json();
            if (response.ok) {
                dispatch({ type: "set_favorites", payload: { datafavorites: data.favoritos } })
            } else {
                if (data.error) {
                    setErrorMessage(data.error);
                } else {
                    setErrorMessage('Error al iniciar sesión.');
                }
            }
        } catch (error) {
            console.error('Error al comunicarse con el backend:', error);
            setErrorMessage('Error al comunicarse con el servidor.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const loginData = {
            email,
            password,
        };

        try {

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();
            if (response.ok) {
                sessionStorage.setItem("access_token", data.access_token)
                setInfoData(data)
                getUserFavorites()
                if (data.rol === 'ADMIN') {
                    navigate('/administrator');
                } else {
                    navigate('/categorias');
                }

                //window.location.reload();
            } else {
                if (data.error) {
                    setErrorMessage(data.error);
                } else {
                    setErrorMessage('Error al iniciar sesión.');
                }
            }
        } catch (error) {
            console.error('Error al comunicarse con el backend:', error);
            setErrorMessage('Error al comunicarse con el servidor.');
        }
    };

    useEffect(() => {
        const token = sessionStorage.getItem('access_token');

        if (token) {
            navigate('/categorias');
            return;
        }

    }, [navigate]);

    return (
        <motion.div
            className="d-flex flex-column align-items-center justify-content-center vh-100 position-relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #0A1744 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Estrellas decorativas */}
            <div className="position-absolute" style={{ top: '10%', left: '10%', color: 'rgba(255,255,255,0.3)', fontSize: '24px' }}>✦</div>
            <div className="position-absolute" style={{ top: '15%', right: '15%', color: 'rgba(255,255,255,0.3)', fontSize: '24px' }}>✦</div>
            <div className="position-absolute" style={{ bottom: '30%', left: '20%', color: 'rgba(255,255,255,0.3)', fontSize: '24px' }}>✦</div>
            <div className="position-absolute" style={{ bottom: '20%', right: '10%', color: 'rgba(255,255,255,0.3)', fontSize: '24px' }}>✦</div>

            {/* Puntos decorativos */}
            <div className="position-absolute" style={{ top: '30%', left: '25%' }}>
                <div className="d-flex">
                    <div className="rounded-circle mx-1" style={{ width: '6px', height: '6px', backgroundColor: '#4ADE80' }}></div>
                    <div className="rounded-circle mx-1" style={{ width: '6px', height: '6px', backgroundColor: '#4ADE80' }}></div>
                    <div className="rounded-circle mx-1" style={{ width: '6px', height: '6px', backgroundColor: '#4ADE80' }}></div>
                </div>
            </div>

            {/* Logo */}
            <div className="text-center mb-5">
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
            </div>

            {errorMessage && <div className="alert alert-danger mb-4" style={{ maxWidth: '300px', width: '100%' }}>{errorMessage}</div>}

            <form onSubmit={(e) => { handleSubmit(e) }} className="d-flex flex-column align-items-center" style={{ maxWidth: '300px', width: '100%' }}>
                {/* Campo de usuario */}
                <div className="mb-3 w-100">
                    <input
                        type="text"
                        className="form-control py-3"
                        placeholder="Usuario"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
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

                {/* Campo de contraseña */}
                <div className="mb-2 w-100">
                    <input
                        type="password"
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
                            paddingLeft: '20px'
                        }}
                    />
                </div>

                {/* Olvidé mi contraseña */}
                <div className="text-center mb-4 w-100">
                    <Link to="/forgot-password" className="text-white-50 text-decoration-none" style={{ fontSize: '0.9rem' }}>
                        Olvidé mi contraseña
                    </Link>
                </div>

                {/* Botón de ingresar con luna decorativa */}
                <div className="position-relative w-100 mb-3">
                    <button type="submit" className="btn w-100 py-2"
                        style={{
                            backgroundColor: '#4ADE80',
                            borderRadius: '30px',
                            color: '#0F172A',
                            fontWeight: 'bold',
                            boxShadow: '0 0 15px rgba(74, 222, 128, 0.5)'
                        }}>
                        Ingresar
                    </button>
                    <div className="position-absolute" style={{ bottom: '-10px', right: '-30px' }}>
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

                {/* Registrarse */}
                <div className="text-center mb-5">
                    <Link to="/register" className="text-white text-decoration-underline">
                        Registrarse
                    </Link>
                </div>

                {/* Iconos de redes sociales */}
                <div className="d-flex justify-content-center gap-4 mb-5">
                    <a href="#" className="text-white-50">
                        <i className="fa-solid fa-envelope fs-5"></i>
                    </a>
                    <a href="#" className="text-white-50">
                        <i className="fa-brands fa-facebook fs-5"></i>
                    </a>
                    <a href="#" className="text-white-50">
                        <i className="fa-brands fa-instagram fs-5"></i>
                    </a>
                </div>

                {/* Footer */}
                <div className="text-center position-absolute bottom-0 mb-4">
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
            </form>
        </motion.div>
    );
};
