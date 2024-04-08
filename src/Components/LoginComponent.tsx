import React, { useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import IUserLogin from "../Interface/IUserLogin";
import DatosComponent from "./DatosComponent";

const LoginComponent = () => {
  const [formState, setFormState] = useState<IUserLogin>({
    email: "",
  });
  const [alerta, setAlerta] = useState<boolean | null>();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (event) => {
    getDatos(formState.email);
    event.preventDefault();
  };

  let getDatos = async (email: string) => {
    const users = await getDocs(collection(db, "users"));
    setAlerta(true);
    users.forEach((user) => {
      if (user.data().email === email) {
        sessionStorage.setItem("userID", JSON.stringify(user.data().email));
        let deps: string[] = [];
        for (let i = 0; i < user.data().deortistas.length; i++) {
          deps.push(user.data().deortistas[i]._key.path.segments[6]);
        }
        sessionStorage.setItem("deportistas", JSON.stringify(deps));
        setAlerta(false);
      }
    });
  };

  return (
    <div className="mt-3">
      {/* Si la alerta es distinta de null y en estado falso cambiamos de componente */}
      {alerta != null && alerta === false ? (
        <DatosComponent />
      ) : (
        <div>
          {/* Muestra la alerta si no se ha verificado el usuario */}
          {alerta != null && alerta == true ? (
            <div className="alert alert-danger" role="alert">
              Error al verificar usuario.
            </div>
          ) : (
            <></>
          )}
          {/* Formulario de login */}
          <form className="container mt-3" onSubmit={handleSubmit}>
            <h1>LOGIN</h1>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Usuario
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                value={formState.email}
                onChange={handleInputChange}
                aria-describedby="emailHelp"
                required
              />
              <div id="emailHelp" className="form-text">
                Usuario para poder acceder a la aplicación. Formato de email.
              </div>
            </div>
            <div className="row">
              <div className="col d-flex justify-content-end">
                <button type="submit" className="btn btn-outline-success">
                  Entrar
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginComponent;
