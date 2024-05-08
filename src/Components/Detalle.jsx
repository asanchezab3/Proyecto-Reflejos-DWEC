import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";
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

  useEffect(() => {
    let getDatos = async () => {
      let deportistaRef = doc(db, "deportistas", idDeportista);
      let deportistaDoc = await getDoc(deportistaRef);
      setDeportista(deportistaDoc.data());

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
