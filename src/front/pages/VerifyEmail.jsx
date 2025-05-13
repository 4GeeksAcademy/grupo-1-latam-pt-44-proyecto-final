

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { CheckCircle, XCircle, Loader, Star, Moon } from 'lucide-react'

export const VerifyEmail = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [verificationState, setVerificationState] = useState({
    loading: true,
    success: false,
    error: null,
    message: "Verificando su correo electrónico...",
  })

  useEffect(() => {
    // Extraer el token de la URL
    const queryParams = new URLSearchParams(location.search)
    const token = queryParams.get("token")

    if (!token) {
      setVerificationState({
        loading: false,
        success: false,
        error: "No se encontró el token de verificación en la URL",
        message: "No se pudo verificar su correo electrónico",
      })
      return
    }

    // Función para verificar el email con el backend
    const verifyEmail = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || ""
        const response = await fetch(`${backendUrl}/verify-email`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        const data = await response.json()

        if (response.ok) {
          setVerificationState({
            loading: false,
            success: true,
            error: null,
            message: data.msg || "¡Su cuenta ha sido verificada correctamente!",
          })
        } else {
          setVerificationState({
            loading: false,
            success: false,
            error: data.msg || "Error al verificar el correo electrónico",
            message: "No se pudo verificar su correo electrónico",
          })
        }
      } catch (error) {
        setVerificationState({
          loading: false,
          success: false,
          error: "Error de conexión con el servidor",
          message: "No se pudo verificar su correo electrónico",
        })
      }
    }

    verifyEmail()
  }, [location.search])

  // Estrellas decorativas para el fondo
  const renderStars = () => {
    return (
      <>
        <div className="position-absolute" style={{ top: '10%', left: '10%', opacity: 0.3 }}>
          <Star size={24} color="white" />
        </div>
        <div className="position-absolute" style={{ top: '30%', right: '15%', opacity: 0.3 }}>
          <Star size={32} color="white" />
        </div>
        <div className="position-absolute" style={{ bottom: '20%', left: '20%', opacity: 0.3 }}>
          <Star size={28} color="white" />
        </div>
        <div className="position-absolute" style={{ bottom: '30%', right: '10%', opacity: 0.3 }}>
          <Star size={36} color="white" />
        </div>
      </>
    )
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 position-relative"
      style={{
        background: "linear-gradient(180deg, #026EEC 0%, #051B47 100%)",
        overflow: "hidden"
      }}
    >
      {renderStars()}
      
      <div className="text-center p-5 rounded-4 shadow-lg" 
        style={{ 
          maxWidth: "500px", 
          width: "90%",
          backgroundColor: "rgba(3, 69, 140, 0.3)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
        
        <div className="mb-4 text-center">
          <img 
            src="https://i.ibb.co/b5sLkxLM/sheep-color-icon.png" 
            alt="Dormiré Logo" 
            style={{ height: "100px" }} 
            className="mb-3"
          />
          <h2 className="text-white mb-0">Dormiré</h2>
        </div>
        
        {verificationState.loading ? (
          // Estado de carga
          <div className="mb-4">
            <div className="d-flex justify-content-center mb-4">
              <Loader size={64} className="text-white animate-spin" />
            </div>
            <h3 className="mb-3 text-white">Verificando su correo electrónico</h3>
            <p className="text-white opacity-75">Por favor espere mientras procesamos su solicitud...</p>
          </div>
        ) : verificationState.success ? (
          // Estado de éxito
          <div className="mb-4">
            <div className="d-flex justify-content-center mb-4">
              <div className="rounded-circle bg-success d-flex align-items-center justify-content-center" 
                style={{ width: "80px", height: "80px" }}>
                <CheckCircle size={50} className="text-white" />
              </div>
            </div>
            <h3 className="mb-3 text-white">¡Su cuenta ha sido verificada!</h3>
            <p className="mb-4 text-white opacity-75">Ya puede iniciar sesión con sus credenciales</p>

            <button 
              className="btn px-4 py-2 rounded-pill" 
              onClick={() => navigate("/login")}
              style={{ 
                backgroundColor: "#27F0A8", 
                color: "#051B47", 
                fontWeight: "bold",
                border: "none"
              }}
            >
              Iniciar sesión
            </button>
          </div>
        ) : (
          // Estado de error
          <div className="mb-4">
            <div className="d-flex justify-content-center mb-4">
              <div className="rounded-circle bg-danger d-flex align-items-center justify-content-center" 
                style={{ width: "80px", height: "80px" }}>
                <XCircle size={50} className="text-white" />
              </div>
            </div>
            <h3 className="mb-3 text-white">Error de verificación</h3>
            <p className="text-white opacity-75 mb-4">{verificationState.error}</p>

            <div className="d-flex flex-column gap-3">
              <button 
                className="btn px-4 py-2 rounded-pill" 
                onClick={() => navigate("/login")}
                style={{ 
                  backgroundColor: "#27F0A8", 
                  color: "#051B47", 
                  fontWeight: "bold",
                  border: "none"
                }}
              >
                Iniciar sesión
              </button>
              <button 
                className="btn px-4 py-2 rounded-pill" 
                onClick={() => navigate("/")}
                style={{ 
                  backgroundColor: "transparent", 
                  color: "white", 
                  fontWeight: "bold",
                  border: "2px solid white"
                }}
              >
                Volver al inicio
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}