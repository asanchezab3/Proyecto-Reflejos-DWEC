import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";

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

  let style = {
    padding: "70px",
    boxShadow: "inset 0px 0px 0px 1px black" 
  };

  let textStyle = { textAlign: index % 2 ? "left" : "right" };

  return (
    <div style={style}>
      {/* Finalmente se muestran los datos */}
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
  );
}

export default Detalle;
