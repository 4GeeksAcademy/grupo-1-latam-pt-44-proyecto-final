import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DormireIcon from "../assets/img/sheep_color_icon.svg";

export const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden.');
            setSuccessMessage('');
            return;
        }

        const loginData = {
            email,
            password
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
                setSuccessMessage(data.message);
                setErrorMessage('');
                setTimeout(() => {
                    navigate('/categorias');
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
        <div className="login container d-flex justify-content-center align-items-center min-vh-100">
            <div className="container-fluid p-4 rounded-3 text-center">
                <img className="icon-login mb-5" src={DormireIcon} alt="Icon" />
                <h2 className="text-white mb-4">Registro de Usuario</h2>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <form onSubmit={handleSubmit} className='row g-5'>

                    <div className="d-flex flex-column align-items-center">
                        <div className="mb-3">
                            <input type="text" className="form-control rounded-pill" placeholder="Nombre de Usuario" value={username} onChange={(e) => setUserName(e.target.value)} required style={{ borderColor: 'cyan', borderWidth: '3px', borderStyle: 'solid', backgroundColor: '#3f51b5' }} />
                        </div>
                        <div className="mb-3">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control rounded-pill"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{ borderColor: 'cyan', borderWidth: '3px', borderStyle: 'solid', backgroundColor: '#3f51b5' }}
                            />
                            <div className="form-check mt-2">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="showPassword"
                                    checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)}
                                />
                                <label className="form-check-label text-white" htmlFor="showPassword">Mostrar contraseña</label>
                            </div>
                        </div>
                        <div className="olvide">Olvidé mi contraseña</div>
                        <div className='col-12 text-center'>
                            <button type="submit" className="btn btn-info btn-block rounded-pill color-black px-1 py-2 fw-bold" style={{ fontSize: '1.2em', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 0 4px cyan, 0 0 0 3px #7fffd4' }}>Ingresar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}