import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const accessToken = sessionStorage.getItem('access_token');
	const navigate = useNavigate();

	useEffect(() => {
		if (!accessToken) {
			return;
		}
	}, [accessToken]);

	const handleLogout = () => {
		sessionStorage.removeItem('access_token');
		//setToken(null);
		navigate('/');
	};

	const { store, dispatch } = useGlobalReducer();

	const deleteFromFavorites = async (historiaId) => {
		console.log(historiaId)

		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/favoritos/${historiaId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("access_token")}`
				}
			});

			const data = await response.json();
			if (response.ok) {
				dispatch({ type: 'delete_from_favorite', payload: { historia_id:historiaId } })
			} else {
				if (data.error) {
					setErrorMessage(data.error);
				} else {
					setErrorMessage('Error al eliminar Favoritos del usuario');
				}
			}
		} catch (error) {
			console.error('Error al comunicarse con el backend:', error);
			setErrorMessage('Error al comunicarse con el servidor.');
		}

	};

	return (
		<nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#000000' }} >
			<div className="container-fluid">
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavNegro" aria-controls="navbarNavNegro" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse justify-content-center" id="navbarNavNegro">
					<ul className="navbar-nav">
						<li className="nav-item text-center mx-2">
							<Link className="nav-link text-white d-flex flex-column align-items-center" to="/">
								<i className="fa-solid fa-home mb-1 fs-5"></i>
								<span>Inicio</span>
							</Link>
						</li>
						{accessToken ? "" : (<><li className="nav-item text-center mx-2">
							<Link className="nav-link text-white d-flex flex-column align-items-center" to="/login">
								<i className="fa-solid fa-sign-in-alt mb-1 fs-5"></i>
								<span>Login</span>
							</Link>
						</li><li className="nav-item text-center mx-2">
								<Link className="nav-link text-white d-flex flex-column align-items-center" to="/register">
									<i className="fa-solid fa-user-plus mb-1 fs-5"></i>
									<span>Registro</span>
								</Link>
							</li></>)}




						{/* Botón de logout */}
						{accessToken && (
							<><li className="nav-item text-center mx-2">
								<Link className="nav-link text-white d-flex flex-column align-items-center" to="/categorias">
									<i className="fa-solid fa-list mb-1 fs-5"></i>
									<span>Categorías</span>
								</Link>
							</li><li className="nav-item text-center mx-2">
									<Link className="nav-link text-white d-flex flex-column align-items-center" to="/perfil">
										<i className="fa-solid fa-moon mb-1 fs-5"></i>
										<span>Perfil</span>
									</Link>
								</li><li className="nav-item text-center mx-2 dropdown">
									<button
										className="btn nav-link text-white d-flex flex-column align-items-center dropdown-toggle"
										type="button"
										data-bs-toggle="dropdown"
										aria-expanded="false"
										style={{ border: 'none', background: 'transparent' }}
									>
										<i className="fa-solid fa-star mb-1 fs-5"></i>
										<span>Favoritos <span className="badge bg-danger">{store.favorites.length}</span></span>
									</button>

									<ul className="dropdown-menu">
										{store.favorites.length === 0 ? (
											<li><span className="dropdown-item text-muted">No favorites yet</span></li>
										) : (
											store.favorites.map((item, index) => {
												return <li key={index}>
													<div className="dropdown-item d-flex justify-content-between align-items-center">
														<Link to={`${import.meta.env.VITE_FRONTEND_URL}/historias/${item.historia_id}`} className="text-decoration-none text-dark">
															{item.nombre_historia}
														</Link>
														<i className="fa-solid fa-trash"
															style={{ cursor: "pointer" }}
															onClick={() => {
																deleteFromFavorites(item.historia_id);
															}}
														></i>
													</div>
												</li>
											})
										)}
									</ul>
								</li><li className="nav-item text-center mx-2">
									<button className="btn nav-link text-danger d-flex flex-column align-items-center" onClick={handleLogout} style={{ border: 'none', background: 'transparent' }}>
										<i className="fa-solid fa-sign-out-alt mb-1 fs-5"></i>
										<span>Logout</span>
									</button>
								</li></>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};