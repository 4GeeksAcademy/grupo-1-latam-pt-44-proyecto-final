import React, { useState, useEffect } from "react";
import { NavbarAdministrator } from "../components/Administrator/NavbarAdministrator";
import { Sidebar } from "../components/Administrator/Sidebar";
import { TableUsers } from "../components/Administrator/TableUsers";
import { TableCategories } from "../components/Administrator/TableCategories";
import { TableStories } from "../components/Administrator/TableStories";

export const Administrator = () => {
    const [selectedTable, setSelectedTable] = useState("users");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Detectar si es dispositivo móvil
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 992);
            if (window.innerWidth < 992) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        // Verificar al cargar
        checkIfMobile();

        // Verificar al cambiar el tamaño de la ventana
        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    // Función para alternar el sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div
            className="min-vh-100 d-flex flex-column"
            style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #0A1744 100%)',
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                overflow: 'hidden'
            }}
        >
            {/* Navbar */}
            <NavbarAdministrator toggleSidebar={toggleSidebar} />

            {/* Contenido principal */}
            <div className="d-flex flex-grow-1 position-relative overflow-hidden">
                {/* Sidebar con animación */}
                <div
                    className={`sidebar-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
                    style={{
                        position: isMobile ? 'absolute' : 'relative',
                        zIndex: 1030,
                        height: '100%',
                        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
                        transition: 'transform 0.3s ease-in-out',
                        boxShadow: sidebarOpen ? '0 0 20px rgba(0, 0, 0, 0.2)' : 'none'
                    }}
                >
                    <Sidebar changeTable={setSelectedTable} />
                </div>

                {/* Overlay para cerrar el sidebar en móvil */}
                {isMobile && sidebarOpen && (
                    <div
                        className="position-fixed top-0 start-0 w-100 h-100"
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 1020
                        }}
                        onClick={toggleSidebar}
                    ></div>
                )}

                {/* Contenedor de tablas con animación */}
                <div
                    className="flex-grow-1 overflow-auto"
                    style={{
                        transition: 'margin-left 0.3s ease-in-out',
                        marginLeft: isMobile ? 0 : (sidebarOpen ? 0 : '-280px'),
                        width: '100%'
                    }}
                >
                    {/* Tablas con transición */}
                    <div
                        className="table-container p-3 p-md-4"
                        style={{
                            opacity: 1,
                            transition: 'opacity 0.3s ease-in-out'
                        }}
                    >
                        {selectedTable === "users" && <TableUsers />}
                        {selectedTable === "categories" && <TableCategories />}
                        {selectedTable === "stories" && <TableStories />}
                    </div>
                </div>
            </div>

            {/* Estilos CSS para la responsividad */}
            <style jsx>{`
                @media (max-width: 991.98px) {
                    .sidebar-closed {
                        transform: translateX(-100%);
                    }
                    .sidebar-open {
                        transform: translateX(0);
                    }
                }
                
                /* Estilos para scrollbar personalizado */
                .overflow-auto::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                
                .overflow-auto::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                
                .overflow-auto::-webkit-scrollbar-thumb {
                    background: rgba(59, 130, 246, 0.5);
                    border-radius: 10px;
                }
                
                .overflow-auto::-webkit-scrollbar-thumb:hover {
                    background: rgba(59, 130, 246, 0.7);
                }
            `}</style>
        </div>
    );
};