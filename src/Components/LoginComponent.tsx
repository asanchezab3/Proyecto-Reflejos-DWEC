import React, { useState } from "react";
import { db } from '../firebase/config'; 
import { collection, getDocs } from 'firebase/firestore';
import IUserLogin from "../Interface/IUserLogin";

const LoginComponent = () => {
  const [formState, setFormState] = useState<IUserLogin>({
    user: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (event) => {
    console.log("The form was submitted: ", formState);
    console.log("user: ", formState.user);
    console.log("pass: ", formState.password);
    event.preventDefault();
  };

  return (
    <form className="container mt-3" onSubmit={handleSubmit}>
      <h1>LOGIN</h1>
      <div className="mb-3">
        <label htmlFor="user" className="form-label">
          Usuario
        </label>
        <input
          type="email"
          className="form-control"
          name="user"
          id="user"
          value={formState.user}
          onChange={handleInputChange}
          aria-describedby="userHelp"
          required
        />
        <div id="userHelp" className="form-text">
          Usuario para poder acceder a la aplicación. Formato de email.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Contraseña
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          id="password"
          value={formState.password}
          onChange={handleInputChange}
          aria-describedby="passwordHelp"
          required
        />
        <div id="passwordHelp" className="form-text">
          Contraseña correspondiente al usuario para poder acceder a la
          aplicación.
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
  );
};

export default LoginComponent;
