import React, { useState, useEffect } from "react";
import { db } from "../firebase/config.js";
import { collection, getDocs } from "firebase/firestore";

function Info() {
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    let getDatos = async () => {
      let resultados = await getDocs(collection(db, "resultados"));
      let resultadosArray = [];
      resultados.forEach((resultado) => {
        let data = resultado.data();
        resultadosArray.push(data);
      });
      setResultados(resultadosArray);
    };
    getDatos();
  }, []);

  let tablaStyle = {
    border: "1px solid black"        
  };

  let headerStyle = {
    backgroundColor: "#e6e6e6",   
    border: "1px solid black",
    textAlign: "center",
    padding: "17px"
  }
  
  let cellStyle = {
    backgroundColor: "#f8f8f8",   
    border: "1px solid black",
    textAlign: "center",
    padding: "7px"
  }

  return (
    <>
      <p></p>
      <h1>RESULTADOS</h1>
      <p></p>
      <p></p>
      <table style={tablaStyle}>
        <thead>
          <tr>
            <th style={headerStyle}>Distancia</th>
            <th style={headerStyle}>Fecha</th>
            <th style={headerStyle}>Tiempo reacción</th>
            <th style={headerStyle}>Dispositivos apagados</th>
            <th style={headerStyle}>Fallos</th>
            <th style={headerStyle}>Tiempo ejercicio</th>
            <th style={headerStyle}>Tiempo total</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map((resultado, index) => (
            <tr key={index}>
              <td style={cellStyle}>{resultado.distanciaaldispositivo || "No definido"}</td>
              <td style={cellStyle}>
                {resultado.fecha.toDate().toLocaleString() || "No definido"}
              </td>
              <td style={cellStyle}>{resultado.mediatiemporeaccion || "No definido"}</td>
              <td style={cellStyle}>{resultado.numerodispositivosapagados || "No definido"}</td>
              <td style={cellStyle}>{resultado.numerofallos || "No definido"}</td>
              <td style={cellStyle}>{resultado.tiempototalejercicio || "No definido"}</td>
              <td style={cellStyle}>{resultado.tiempototalempleado || "No definido"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Info;
