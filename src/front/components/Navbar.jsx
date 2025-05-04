import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

	return (
		<nav className="navbar navbar-expand-lg" style={{backgroundColor: '#3f51b5'}} >
			<div className="container-fluid">
				<button	className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavNegro"	aria-controls="navbarNavNegro" aria-expanded="false" aria-label="Toggle navigation">
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
			</div>
		</nav>
	);
};