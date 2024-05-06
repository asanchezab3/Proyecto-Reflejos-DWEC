import React, { useState, useEffect } from 'react'; 
import { db } from '../firebase/config.js'; 
import { collection, getDocs } from 'firebase/firestore';

function Info() {
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    let getDatos = async () => {
      let resultados = await getDocs(collection(db, "resultados"));
      //let cont = 0;
      let resultadosArray = [];
      resultados.forEach((resultado) => {
        let data = resultado.data();
        //console.log(`A ${cont} ->`, data);
        //cont++;
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
    <table>
      <thead>
        <tr>
          <th>Distancia</th>
          <th>Fecha</th>
          <th>ID deportista</th>
          <th>ID programa</th>
          <th>Tiempo reacción</th>
          <th>Dispositivos apagados</th>
          <th>Fallos</th>
          <th>Tiempo ejercicio</th>
          <th>Tiempo total</th>
        </tr>
      </thead>
      <tbody>        
        {
          resultados.map((resultado, index) => (
            <tr key={index}> 
              <td>{resultado.distanciaaldispositivo || 'No definido'}</td>
              <td>{resultado.fecha.toDate().toLocaleString() || 'No definido'}</td>
              <td>{resultado.iddeportista._key.path.segments[6] || 'No definido'}</td>
              <td>{resultado.idprograma._key.path.segments[6] || 'No definido'}</td>
              <td>{resultado.mediatiemporeaccion|| 'No definido'}</td>
              <td>{resultado.numerodispositivosapagados || 'No definido'}</td>
              <td>{resultado.numerofallos|| 'No definido'}</td>
              <td>{resultado.tiempototalejercicio || 'No definido'}</td>
              <td>{resultado.tiempototalempleado|| 'No definido'}</td>
            </tr>
          ))
        }

      </tbody>
    </table>
    </>
  );
}
    
export default Info