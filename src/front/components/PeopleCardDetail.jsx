import React from 'react'
import useGlobalReducer from '../hooks/useGlobalReducer';
import { useParams } from 'react-router-dom';

const PeopleCardDetail = () => {

    const { dispatch, store } = useGlobalReducer();
    console.log("Imprimiendo store");
    console.log(store);
    const params = useParams();
    console.log("Imprimiendo param");
    console.log(params);


    let personaje = store.people.find(item => item.uid === params.contactID);
    console.log("Imprimiendo personajeSeleccionado");
    console.log(personaje);


    return (

        <div className="container text-start">
            <div className="card mb-3 mt-5">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="https://picsum.photos/id/1/540/540" className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body text-center">
                            <h2 className="card-title">{personaje.properties.name}</h2>
                            <p className="card-text"> {personaje.description}</p>
                        </div>
                    </div>
                </div>

            </div>
            <hr className="border-danger border-2 opacity-100"></hr>
            <div className="row text-center">
                <div className="col">Name <p>{personaje.properties.name}</p></div>
                <div className="col">Birth Year <p>{personaje.properties.birth_year}</p></div>
                <div className="col">Gender <p>{personaje.properties.gender}</p></div>
                <div className="col">Height <p>{personaje.properties.height}</p></div>
                <div className="col">Skin Color <p>{personaje.properties.skin_color}</p></div>
                <div className="col">Eye Color <p>{personaje.properties.eye_color}</p></div>
            </div>
        </div>

    )
}

export default PeopleCardDetail