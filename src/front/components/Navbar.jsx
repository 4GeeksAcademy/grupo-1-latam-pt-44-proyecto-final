import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const [token ,setToken] = useState(sessionStorage.getItem('access_token'));
	const navigate = useNavigate();
	
	useEffect(() => {

		if (!token) {
			return;
		}
	}, [token]);

	const handleLogout = () => {
        sessionStorage.removeItem('access_token');
        setToken(null);
        navigate('/login'); 
    };

	const { store, dispatch } = useGlobalReducer();

	const deleteFromFavorites = (uid, category) => {
		dispatch({ type: 'delete_from_favorite', payload: { uid, category } })
	};

	return (
		<nav className="navbar navbar-expand-lg" style={{backgroundColor: '#3f51b5'}} >
			<div className="container-fluid">
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavNegro" aria-controls="navbarNavNegro" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse justify-content-end" id="navbarNavNegro">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className="nav-link text-white" to="/">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link text-white" to="/login">
								Login
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link text-white" to="/register">
								Registro de Usuario
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link text-white" to="/categorias">
								Categorias
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link text-white" to="/favoritos">
								Perfil
							</Link>
						</li>
						{token && ( 
							<li>
								<button className="dropdown-item text-info" onClick={handleLogout}>
									Logout
								</button>
							</li>
						)}
					</ul>
				</div>

				<div className="dropdown">
					<button
						className="btn btn-primary dropdown-toggle"
						type="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Favorites <span>{"(" + store.favorites.length + ")"}</span>
					</button>

					<ul className="dropdown-menu">
						{store.favorites.map((item, index) => (
							<li key={index} >
								<div className="dropdown-item d-flex justify-content-between align-items-center">

									<Link to={item.linkto} className="text-decoration-none text-dark">
										{item.name}
									</Link>

									<i className="fa-solid fa-trash"
										style={{ cursor: "pointer" }}
										onClick={() => {
											deleteFromFavorites(item.uid, item.category);
										}}
									></i>
								</div>
							</li>
						))}
					</ul>

				</div>

			</div>
		</nav>
	);
};