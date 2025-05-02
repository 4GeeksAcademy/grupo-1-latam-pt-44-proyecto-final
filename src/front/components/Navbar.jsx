import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {

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
					</ul>
				</div>
			</div>
		</nav>
	);
};



// import { Link } from "react-router-dom";

// export const Navbar = () => {

// 	return (
// 		<nav className="navbar navbar-light bg-light">
// 			<div className="container">
// 				<Link to="/">
// 					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
// 				</Link>
// 				<div className="ml-auto">
// 					<Link to="/demo">
// 						<button className="btn btn-primary">Check the Context in action</button>
// 					</Link>
// 				</div>
// 			</div>
// 		</nav>
// 	);
// };