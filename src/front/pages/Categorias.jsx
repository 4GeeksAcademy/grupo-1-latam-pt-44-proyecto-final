import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import PeopleCard from "../components/PeopleCard.jsx";

const category = "1"

export const Categorias = ({ item }) => {
  const { dispatch, store } = useGlobalReducer();
  const navigate = useNavigate();

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
    const token = sessionStorage.getItem('access_token');

    if (!token) {
      navigate('/login');
      return;
    }
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
  )
}

