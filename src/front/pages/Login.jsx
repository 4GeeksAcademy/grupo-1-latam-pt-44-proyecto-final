import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DormireLogo from "../assets/img/sheep_logo.svg";


export const Login = () => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [infoData, setInfoData] = useState();

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const loginData = {
            email,
            password,
        };

        try {

            console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
            console.log(`${import.meta.env.VITE_BACKEND_URL}/login`)

            const response = await fetch(`https://urban-space-umbrella-r4p6r6rqrrwjhpvp5-3001.app.github.dev/login`, {
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
                navigate('/categorias');
                window.location.reload();
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
            className="d-flex flex-column align-items-center justify-content-center vh-100 bg-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="text-center">
                <div className="logo mx-auto" style={{ width: '100px', height: '100px' }}>
                    <img className="logo" src={DormireLogo} alt="Logo" style={{ width: '100%', height: '100%', fill: 'white' }}/>
                </div>
                <h2 className="text-white fw-bold">Iniciar Sesión</h2>
                {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
            </div>

            <form onSubmit={handleSubmit} className="d-grid gap-3" style={{ maxWidth: '300px', width: '100%' }}>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control rounded-pill"
                        id="floatingemail"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        required
                    />
                    <label htmlFor="floatingemail" className="text-muted">Email</label>
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control rounded-pill"
                        id="floatingPassword"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="floatingPassword" className="text-muted">Contraseña</label>
                </div>
                {/* <div className="text-center">
                    <Link to="/forgot-password" className="text-warning text-decoration-none">
                        Olvidé mi contraseña
                    </Link>
                </div> */}
                <button type="submit" className="btn btn-info btn-block rounded-pill text-white px-1 py-2 fw-bold" style={{ fontSize: '1.2em', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 0 4px cyan, 0 0 0 3px #7fffd4' }}>
                    Ingresar
                </button>
            </form>

            <div className="text-center mt-3">
                <Link to="/register" className="btn btn-link text-white text-decoration-none">
                    Registrarse
                </Link>
            </div>

        </motion.div>
    );
};