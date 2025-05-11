import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Cloudinary } from "@cloudinary/url-gen";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const HistoriaPlayer = () => {
    const { id } = useParams();
    const { store, dispatch } = useGlobalReducer();

    const navigate = useNavigate();
    const [historia, setHistoria] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const playerRef = useRef(null);
    const progressIntervalRef = useRef(null);
    const cld = new Cloudinary({ cloud: { cloudName: 'dz71k8oei' } });


    const showMessage = (type, text, duration = 4000) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), duration);
    };




    const handleFavorite = async (historiaId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/favoritos/historias/${historiaId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`
                },
                body: JSON.stringify([])
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 409) {
                    showMessage("danger", "La Historia ya se encuentra en favoritos")
                } else {
                    showMessage("info", data.mensaje || `Error inesperado${response.status}`);
                }
                return;
            }

            dispatch({ type: "add_to_favorite", payload: { historia_id: historiaId, nombre_historia: data.favorito.nombre_historia } })
            showMessage("success", data.mensaje || `Historia se añadió a favoritos`);

        } catch (error) {
            console.error('Error al cargar la historia:', error);
            showMessage("info", "No se pudo procesar la solicitud. Intenta más tarde.");
        }
    }

    const fetchHistoria = useCallback(async (historiaId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/historias/${historiaId}`);
            if (!response.ok) {
                const message = `Error de la API: ${response.status}`;
                throw new Error(message);
            }
            const data = await response.json();
            setHistoria(data);
            setLoading(false);
        } catch (error) {
            console.error('Error al cargar la historia:', error);
            setLoading(false);
            navigate('/historias');
        }
    }, [navigate]);

    useEffect(() => {
        if (id) {
            fetchHistoria(id);
        } else {
            navigate('/historias');
        }
    }, [id, fetchHistoria, navigate]);

    // Función para manejar el mensaje de YouTube API
    const handleMessage = useCallback((event) => {
        if (event.origin !== 'https://www.youtube.com') return;

        const data = JSON.parse(event.data);
        switch (data.event) {
            case 'infoDelivery':
                if (data.info.duration !== undefined) {
                    setDuration(data.info.duration);
                }
                if (data.info.currentTime !== undefined) {
                    setCurrentTime(data.info.currentTime);
                }
                break;
            default:
                break;
        }
    }, []);

    // Configurar el event listener para los mensajes de YouTube
    useEffect(() => {
        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
            clearInterval(progressIntervalRef.current);
        };
    }, [handleMessage]);

    // Iniciar o limpiar el intervalo para actualizar el progreso
    useEffect(() => {
        if (isPlaying) {
            progressIntervalRef.current = setInterval(() => {
                if (playerRef.current) {
                    playerRef.current.contentWindow.postMessage(
                        JSON.stringify({
                            event: 'listening',
                            id: 'player',
                            channel: 'progress'
                        }),
                        'https://www.youtube.com'
                    );
                }
            }, 1000);
        } else {
            clearInterval(progressIntervalRef.current);
        }

        return () => {
            clearInterval(progressIntervalRef.current);
        };
    }, [isPlaying]);

    const handlePlayPause = useCallback(() => {
        if (playerRef.current) {
            playerRef.current.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: isPlaying ? 'pauseVideo' : 'playVideo' }),
                'https://www.youtube.com'
            );
            setIsPlaying(!isPlaying);
        }
    }, [isPlaying]);

    const handleVolumeChange = useCallback((event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        if (playerRef.current) {
            playerRef.current.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'setVolume', args: [newVolume * 100] }),
                'https://www.youtube.com'
            );
        }
    }, []);

    const handleSeek = useCallback((event) => {
        const seekTime = parseFloat(event.target.value) * duration;
        setCurrentTime(seekTime);
        if (playerRef.current) {
            playerRef.current.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'seekTo', args: [seekTime, true] }),
                'https://www.youtube.com'
            );
        }
    }, [duration]);

    const handleGoBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    // Formatear el tiempo en minutos:segundos
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#0a1744' }}>
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (!historia) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#0a1744', color: 'white' }}>
                <p>Historia no encontrada.</p>
            </div>
        );
    }

    return (
        <div
            className="position-relative min-vh-100 d-flex flex-column align-items-center justify-content-center"
            style={{
                backgroundColor: '#0a1744',
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
            }}
        >
            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 0, overflow: 'hidden' }}>
                <img
                    src={cld.image(historia.imagen).toURL()}
                    alt={historia.titulo}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover', opacity: 0.5 }}
                    onError={e => { e.target.onerror = null; }}
                />
                <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(10,23,68,0.5) 0%, rgba(10,23,68,0.9) 100%)',
                        pointerEvents: 'none'
                    }}
                />
            </div>

            {message.text && (
                <div className={`alert alert-${message.type} mb-4 rounded-3`}>
                    <i className="fa-solid fa-circle-exclamation me-2"></i>
                    {message.text}
                </div>
            )}

            <div className="position-relative z-1 d-flex flex-column align-items-center w-100 px-3" style={{ maxWidth: '800px' }}>
                <h1 className="text-white display-5 fw-bold text-center mb-3" style={{ textShadow: '0 2px 8px #000' }}>
                    {historia.titulo}
                </h1>
                <p className="text-white text-center mb-4" style={{ textShadow: '0 2px 8px #000' }}>
                    {historia.contenido}
                </p>
                <div
                    className="video-container"
                    style={{
                        maxWidth: '90%',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
                        width: '1px',
                        height: '1px',
                        opacity: 0,
                        position: 'absolute',
                        top: '-1000px',
                        left: '-1000px',
                        pointerEvents: 'none',
                    }}
                >
                    {historia.url ? (
                        <iframe
                            ref={playerRef}
                            width="640"
                            height="360"
                            src={`https://www.youtube.com/embed/${historia.url}?controls=0&enablejsapi=1&origin=${window.location.origin}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            style={{
                                backgroundColor: '#000',
                                width: '100%',
                                height: '100%',
                            }}
                        ></iframe>
                    ) : (
                        <p className="text-white">No se proporcionó una URL de YouTube para esta historia.</p>
                    )}
                </div>

                {/* Progress bar */}
                <div className="progress-container w-100 mb-3">
                    <div className="d-flex justify-content-between mb-1">
                        <span className="text-white small">{formatTime(currentTime)}</span>
                        <span className="text-white small">{formatTime(duration)}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max={duration}
                        step="0.1"
                        value={Math.min(currentTime, duration)}
                        onChange={e => {
                            const seekTime = parseFloat(e.target.value);
                            setCurrentTime(seekTime);
                            if (playerRef.current) {
                                playerRef.current.contentWindow.postMessage(
                                    JSON.stringify({ event: 'command', func: 'seekTo', args: [seekTime, true] }),
                                    'https://www.youtube.com'
                                );
                            }
                        }}
                        className="w-100"
                        style={{
                            height: '6px',
                            borderRadius: '3px',
                            background: `linear-gradient(to right, #fff ${(currentTime / (duration || 1)) * 100}%, #555 ${(currentTime / (duration || 1)) * 100}%)`,
                            cursor: 'pointer',
                        }}
                    />
                </div>

                {/* Controles personalizados */}
                <div className="controls mt-3 d-flex align-items-center" style={{ gap: '1rem' }}>
                    <button className="btn btn-light rounded-circle" onClick={handlePlayPause}>
                        <i className={`fa fa-${isPlaying ? 'pause' : 'play'}`}></i>
                    </button>
                    <div className="volume-control d-flex align-items-center">
                        <i className="fa fa-volume-up text-white"></i>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="form-range"
                            style={{ width: '100px' }}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleGoBack}>
                        Volver
                    </button>
                    <button className="btn btn-primary" onClick={() => { handleFavorite(id) }}>
                        <i className={store.favorites.some(f => f.historia_id === id) ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                    </button>

                </div>
            </div>
        </div>
    );
};