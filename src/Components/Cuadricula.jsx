import React, { useState, useEffect } from 'react'; 
import { db } from '../firebase/config.js'; 
import { collection, getDocs } from 'firebase/firestore';
import Detalle from './Detalle.jsx';

//Este componente es el que mostrará los datos en vista de cuadricula
function Cuadricula() {
  const [resultados, setResultados] = useState([]);

  //Primero se recogen los datos de la tabla "resultados" y se guardan en la variable "resultados" haciendo uso del hook useState
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

  

  return (
    <>
    <h1 style={{ marginTop: '70px', marginBottom: '50px'}}>RESULTADOS</h1>
    
   
    {
      //De cada resultado obtenido se sacan los datos relevantes y se pasan al componente "Detalle"
      resultados.map((resultado, index) => {
        let fecha = resultado.fecha.toDate().toLocaleString();
        let idDeportista = resultado.iddeportista._key.path.segments[6];
        let distancia = resultado.distanciaaldispositivo;
        let dispositivo = resultado.numerodispositivosapagados;
        let idPrograma = resultado.idprograma._key.path.segments[6]

        return (
          <Detalle key={index} index={index} fecha={fecha} idDeportista={idDeportista} distancia={distancia} dispositivos={dispositivo} idPrograma={idPrograma}/>
        )
      })
    }   
    </>
  );
}
    
export default Cuadricula




