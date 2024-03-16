import { db } from './firebase/config'; 
import { collection, getDocs } from 'firebase/firestore';

//Se recogen los datos de una colección (en este caso "deportistas") de la base de datos, y los muestra por consola
let Datos = () => {
  let getDatos = async () => {
    const deportistas = await getDocs(collection(db, "deportistas"));
    let cont = 0;
    deportistas.forEach((deportista) => {
      console.log(`Deportista ${cont} ->`, deportista.data());
      cont++;
    });
  };

  getDatos();
};

export default Datos;