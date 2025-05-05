import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import SplashScreen from "../components/SplashScreen.jsx";

export const Home = () => {

	const [loading, setLoading] = useState(true)
	
	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

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
		<div className="text-center mt-5">
			{loading ? <SplashScreen />:<div>¡Bienvenido!</div>}
		</div>
	);
}; 