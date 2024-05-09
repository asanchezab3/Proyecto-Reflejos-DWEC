import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";
import data from "../data.js";

//Este es el componente que muestra con detalle cada resultado.
function Detalle({
  index,
  fecha,
  idDeportista,
  distancia,
  dispositivos,
  idPrograma,
}) {
  
  const [deportista, setDeportista] = useState();
  const [programa, setPrograma] = useState();
  /*
  Lo más importante de este componente es que buscaremos la información de cada deportista y de cada programa
  (según su id) en otras tablas. Esto lo haremos de la siguiente manera:
  */
  useEffect(() => {
    let getDatos = async () => {
      //Se cogen los datos del deportista según su tabla y su número identificativo (id)
      let deportistaRef = doc(db, "deportistas", idDeportista);
      let deportistaDoc = await getDoc(deportistaRef);
      setDeportista(deportistaDoc.data());

      //Se cogen los datos del programa según su tabla y su número identificativo (id)
      let programaRef = doc(db, "programas", idPrograma);
      let programaDoc = await getDoc(programaRef);
      setPrograma(programaDoc.data());
    };

    getDatos();
  }, []);

  //Estilo del div de cada deportista
  let style = {
    display: 'flex',
    flexDirection: index % 2 ? 'row-reverse' : 'row', 
    width: '100%',
    padding: "70px",
    boxShadow: "inset 0px 0px 0px 1px black"
  };

  let textStyle = { textAlign: index % 2 ? "right" : "left" };
  let imageStyle = { maxWidth: "80%", height: "auto" };

  //Buscamos el id del deportista en el archivo de data. Si el deportista existe sacaremos su género y su indice para poder buscar su foto en la API randomuser
  let persona2 = data.find(persona => persona.id === idDeportista);
  let gender = (persona2) ? persona2.gender : null; 
  let indice = (persona2) ? persona2.index : null;
  let imagen = `https://randomuser.me/api/portraits/${gender}/${indice}.jpg`;

  return (
    <div style={style}>
      {/* Finalmente se muestran los datos */}
      <div style={{ flex: 1, marginRight: '20px' }}>
        <h3 style={textStyle}>{fecha}</h3>
        <p style={textStyle}>
          Nombre del deportista:{" "}
          {deportista != null
            ? deportista.nombre + " " + deportista.apellido1
            : "No definido"}{" "}
        </p>
        <p style={textStyle}>
          Programa: {programa != null ? programa.descripcion : "No definido"}
        </p>
        <p style={textStyle}>Distancia: {distancia}</p>
        <p style={textStyle}>Dispositivos apagados: {dispositivos}</p>
      </div>
      <img src={imagen||null} alt={"Imagen del deportista"} style={imageStyle}></img>
    </div>
  );
}

export default Detalle;
