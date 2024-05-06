import React, { useState, useEffect } from 'react'; 
import { db } from '../firebase/config.js'; 
import { collection, getDocs } from 'firebase/firestore';
import Detalle from './Detalle.jsx';

function Cuadricula() {
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

  

  return (
    <>
    <p></p>
    <h1>RESULTADOS</h1>
    <p></p>
    <p></p>
    {
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




