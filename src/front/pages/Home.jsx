import React, { useEffect, useState } from "react"
import SplashScreen from "../components/SplashScreen.jsx";
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { Link } from 'react-router-dom';

export const Home = () => {

	const [loading, setLoading] = useState(true)
	const cld = new Cloudinary({ cloud: { cloudName: 'dz71k8oei' } });

	// Use this sample image or upload your own via the Media Explorer
	const img = cld
		.image('sheep_logo_bdmk04')
		.format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
		.quality('auto')
		.resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL
			console.log(backendUrl)

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })
			setLoading(false)

			return data

		} catch (error) {
			setLoading(false)
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage();
	}, [])

	return (
		<div>
			{loading ? <SplashScreen /> :
				<>

					<div className="container-fluid p-0">
						<header className="bg-info text-white text-center py-5">
							<div className="d-flex justify-content-center align-items-center mb-3">
								<div style={{ width: '80px', height: '80px' }}>
									<AdvancedImage cldImg={img} />	
								</div>
							</div>
							<h1 className="display-4">Bienvenido a Dormire</h1>
							<p className="lead">Tu compañero para un sueño reparador.</p>
						</header>

						<section className="py-5 bg-light">
							<div className="container">
								<h2 className="text-center mb-4">Explora nuestras categorías</h2>
								<div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
									<div className="col">
										<div className="card h-100 shadow-sm">
											<div className="card-body text-center">
												<h5 className="card-title text-info">Historias para dormir</h5>
												<p className="card-text text-muted">Déjate llevar por narraciones suaves y envolventes diseñadas para calmar tu mente y prepararte para un descanso profundo.</p>
											</div>
										</div>
									</div>
									<div className="col">
										<div className="card h-100 shadow-sm">
											<div className="card-body text-center">
												<h5 className="card-title text-warning">Meditaciones</h5>
												<p className="card-text text-muted">Encuentra la paz interior y reduce el estrés con nuestras sesiones de meditación guiada, perfectas para relajar tu cuerpo y mente antes de dormir.</p>
											</div>
										</div>
									</div>
									<div className="col">
										<div className="card h-100 shadow-sm">
											<div className="card-body text-center">
												<h5 className="card-title text-primary">Sonidos relajantes</h5>
												<p className="card-text text-muted">Disfruta de una variedad de sonidos armónicos y melodías suaves creadas específicamente para inducir la relajación y facilitar un sueño tranquilo.</p>
											</div>
										</div>
									</div>
									<div className="col">
										<div className="card h-100 shadow-sm">
											<div className="card-body text-center">
												<h5 className="card-title text-success">Sonidos de la naturaleza</h5>
												<p className="card-text text-muted">Sumérgete en la tranquilidad de la naturaleza con paisajes sonoros relajantes como la lluvia suave, el canto de los pájaros y el susurro del mar.</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>

						<section className="py-5 bg-info text-white text-center">
							<div className="container">
								<h2 className="mb-4">Comienza a dormir mejor hoy</h2>						
							</div>
						</section>

						<footer className="bg-dark text-light text-center py-3">
							<div className="container">
								<p className="mb-0">&copy; 2025 Dormire. Todos los derechos reservados.</p>
							</div>
						</footer>
					</div>

				</>
			}
		</div>
	);
}; 