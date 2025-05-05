import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import PeopleCard from "../components/PeopleCard.jsx";

const category = "1"

export const Categorias = ({ item }) => {

  const { dispatch, store } = useGlobalReducer();

  const getPeople = async () => {

    try {
      const response = await fetch('https://www.swapi.tech/api/people');

      if (!response.ok) {
        throw new Error("Ocurrió un error al llamar el endpoint 'people' ");
      }

      const data = await response.json();
      console.log(data);
      const urls = data.results.map((item) => item.url);
      console.log(urls);

      let ListaPersonajes = [];
      for (let index = 0; index < urls.length; index++) {
        const personaje = await getElementDetailById(urls[index], "Personaje");
        ListaPersonajes = [...ListaPersonajes, personaje]
      }

      console.log("Imprimir ListaPersonajes:");
      console.log(ListaPersonajes);

      dispatch({ type: 'set_people_data', payload: ListaPersonajes })

    } catch (error) {
      console.log(error);
    }
  };

  const getElementDetailById = async (url, elemento) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Ocurrió un error al llamar el endpoint: " + elemento);
      }

      const data = await response.json();
      return data.result;

    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    getPeople();
  }, []);



  return (

    <div className="container mt-5">
      <h2>Characters</h2>
      <div className="row mt-5 justify-content-center">
        <div className="d-flex flex-row overflow-auto"
          style={{ maxWidth: "1200px", overflowX: "scroll" }}>
          {store.people.map((item, index) => {
            return (
              <div className="mx-2" key={item.uid}>
                <PeopleCard key={item.uid} item={item} />
              </div>)
          })}
        </div>
      </div>
      <br></br>
    </div>



    // <div className="card" style={{ width: "18rem" }}>
    //   <img src={`https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${item.uid}.jpg`} className="card-img-top" alt="People card" />
    //   <div className="card-body">
    //     <h5 className="card-title">{item.properties.name}</h5>
    //     <p className="card-text m-0">Gender: {item.properties.gender}</p>
    //     <p className="card-text m-0">Hair-Color: {item.properties.hair_color}</p>
    //     <p className="card-text"> Eye-Color: {item.properties.eye_color}</p>
    //     <div className='d-flex justify-content-between'>
    //       <Link to={`/detailspeople/${item.uid}`} >
    //         <button className="btn btn-primary">Learn more!</button>
    //       </Link>

    //       <a href="#" className="btn btn-primary">

    //         {store.favorites.some(favorito => favorito.uid === item.uid && favorito.category === category) ?
    //           <i className="fa-solid fa-heart" onClick={() => {
    //             deleteFromFavorites(item.uid);
    //           }}></i> :
    //           <i className="fa-regular fa-heart" onClick={() => {
    //             addToFavorites(item.uid, item.properties.name);
    //           }}>
    //           </i>
    //         }
    //       </a>
    //     </div>
    //   </div>
    // </div>

  )
}

// export default Categorias

// export const Categorias = () => {
//   const [username, setUserName] = useState('');
//   const [nombre, setNombre] = useState('');
//   const [apellido, setApellido] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (password !== confirmPassword) {
//       setErrorMessage('Las contraseñas no coinciden.');
//       setSuccessMessage('');
//       return;
//     }

//     const registrationData = {
//       username,
//       nombre,
//       apellido,
//       email,
//       password,
//       is_active: true,
//     };

//     try {
//       const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Categorias`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(registrationData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccessMessage(data.message);
//         setErrorMessage('');
//         setTimeout(() => {
//           navigate('/login');
//         }, 1500);
//       } else {
//         if (data.errors) {
//           setErrorMessage(Object.values(data.errors).join('\n'));
//         } else if (data.error) {
//           setErrorMessage(data.error);
//         } else {
//           setErrorMessage('Error al registrar la cuenta.');
//         }
//         setSuccessMessage('');
//       }
//     } catch (error) {
//       console.error('Error al comunicarse con el backend:', error);
//       setErrorMessage('Error al comunicarse con el servidor.');
//       setSuccessMessage('');
//     }
//   };

//   return (
//     <div className="contaier d-flex justify-content-center align-items-center">
//       <div className="container-fluid p-4 rounded-3 shadow-lg text-center">
//         <div className="logo mb-3">🐑</div>
//         <h2 className="text-white mb-4">Categorias</h2>

//       </div>
//     </div>
//   );
// }