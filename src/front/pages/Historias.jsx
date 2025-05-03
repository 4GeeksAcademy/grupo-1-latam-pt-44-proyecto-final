import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Historias = () => {
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
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Historias`, {
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
    <div className="contaier d-flex justify-content-center align-items-center">
      <div className="container-fluid p-4 rounded-3 shadow-lg text-center">
        <div className="logo mb-3">🐑</div>
        <h2 className="text-white mb-4">Historias</h2>

      </div>
    </div>
  );
}