import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
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
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Login`, {
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
        <div className="contaier d-flex justify-content-center align-items-center">
            <div className="container-fluid p-4 rounded-3 shadow-lg text-center">
                <div className="logo mb-3">🐑</div>
                <h2 className="text-white mb-4">Login</h2>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <form onSubmit={handleSubmit} className='row g-5'>
                    <div className="mb-3 col-md-4">
                        <input type="text" className="form-control rounded-pill" placeholder="Nombre de Usuario" value={username} onChange={(e) => setUserName(e.target.value)} required style={{ borderColor: 'cyan', borderWidth: '3px', borderStyle: 'solid', backgroundColor: '#3f51b5' }} />
                    </div>
                    <div className="mb-3 col-md-4">
                        <input type="text" className="form-control rounded-pill" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={{ borderColor: 'cyan', borderWidth: '3px', borderStyle: 'solid', backgroundColor: '#3f51b5' }} />
                    </div>
                    <div className="mb-3 col-md-4">
                        <input type="text" className="form-control rounded-pill" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required style={{ borderColor: 'cyan', borderWidth: '3px', borderStyle: 'solid', backgroundColor: '#3f51b5' }} />
                    </div>
                    <div className="mb-3 col-md-4">
                        <input type="text" className="form-control rounded-pill" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ borderColor: 'cyan', borderWidth: '3px', borderStyle: 'solid', backgroundColor: '#3f51b5' }} />
                    </div>
                    <div className="mb-3 col-md-4">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control rounded-pill"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ borderColor: 'cyan', borderWidth: '3px', borderStyle: 'solid', backgroundColor: '#3f51b5' }}
                        />
                        <div className="form-check mt-2 col-4">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="showPassword"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            <label className="form-check-label text-white col-md-4" htmlFor="showPassword">Mostrar contraseña</label>
                        </div>
                    </div>
                    <div className="mb-3 col-md-4">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="form-control rounded-pill"
                            placeholder="Confirmar contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            style={{ borderColor: 'cyan', borderWidth: '3px', borderStyle: 'solid', backgroundColor: '#3f51b5' }}
                        />
                        <div className="form-check mt-2 col-md-4">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="showConfirmPassword"
                                checked={showConfirmPassword}
                                onChange={() => setShowConfirmPassword(!showConfirmPassword)}
                            />
                            <label className="form-check-label text-white col-md-4" htmlFor="showConfirmPassword">Mostrar contraseña</label>
                        </div>
                    </div>
                    <div className='col-12 text-center'>
                        <button type="submit" className="btn btn-info btn-block rounded-pill color-black px-1 py-2 fw-bold" style={{ fontSize: '1.2em', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 0 4px cyan, 0 0 0 3px #7fffd4' }}>Continuar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}