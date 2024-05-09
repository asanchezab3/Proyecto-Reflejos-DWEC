import React, { useState, useEffect } from "react";
import { db } from "../firebase/config.js";
import { collection, getDocs } from "firebase/firestore";

//Este es el componente que muestra los datos en modo de tabla
function Info() {
  const [resultados, setResultados] = useState([]); //Utilizaremos el hook useState para guardar los datos a mostrar

  //Lo primero que hacemos es recoger los datos de la base de datos
  useEffect(() => {
    let getDatos = async () => {
      let resultados = await getDocs(collection(db, "resultados")); //En este caso cogemos los datos de la tabla "resultados"
      let resultadosArray = []; //Creamos un array para guardarlos
      //Recorremos los datos y los vamos metiendo al array
      resultados.forEach((resultado) => {
        let data = resultado.data();
        resultadosArray.push(data);
      });
      setResultados(resultadosArray); //Finalmente actualizamos la variable "resultados" con el hook useState mencionado anteriormente
    };
    getDatos();
  }, []);

  //También creamos unos cuantos estilos que añadiremos despue´s a la tabla
  //El estilo de la tabla en general (le añadirá los bordes)
  let tablaStyle = {
    border: "1px solid black"        
  };

  //El estilo de los titulos de la tabla 
  let headerStyle = {
    backgroundColor: "#e6e6e6",   //color del fondo
    border: "1px solid black",    //bordes entre los titulos
    textAlign: "center",          //centra el texto
    padding: "17px"               //para dejar espacio
  }
  
  //El estilo de las celdas de la tabla (lo mismo que el anterior pero cambiando algunos valores)
  let cellStyle = {
    backgroundColor: "#f8f8f8",   
    border: "1px solid black",
    textAlign: "center",
    padding: "7px"
  }

  return (
    <>
      <h1 style={{ marginTop: '70px', marginBottom: '50px'}}>RESULTADOS</h1>

      {/*Se crea la tabla con todos los estilos mencionados anteriormente */}
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
        {/*Para hacer el cuerpo de la tabla se van recorriendo los datos y para cada uno se crea una línea con los valores */}
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
