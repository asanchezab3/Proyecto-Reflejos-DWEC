import React, { useState, useEffect } from "react";
import LoginComponent from "./LoginComponent";
import { getAuth, signOut } from "firebase/auth";
import Info from "./Info";
import Cuadricula from "./Cuadricula.jsx";

const DatosComponent = () => {
  const [userEmail, setUserEmail] = useState<string | null | undefined>();
  const [login, setLogin] = useState<boolean | null>();
  const [modoTabla, setModoTabla] = useState(1);

  useEffect(() => {
    setUserEmail(sessionStorage.getItem("userID"));
  }, []);

  const cerrarSesion = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem("userID");
        sessionStorage.removeItem("token");
        setLogin(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mt-3">
      {login != null && login ? (
        <LoginComponent />
      ) : (
        <div>
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                <div>
                  <span className="navbar-text">
                    <i className="bi bi-person"></i> {userEmail}
                  </span>{" "}
                  <span className="navbar-text ml-2">
                    <button
                      className="btn btn-outline-danger"
                      onClick={cerrarSesion}
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      {" Cerrar sesion"}
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </nav>

          <div>
            <button
              className="btn btn-outline-info"
              onClick={() => setModoTabla(modoTabla == 1 ? 0 : 1)}
            >
              <i className="bi bi-gear-wide-connected"></i> Cambiar vista
            </button>
          </div>

          <div className="row mt-3">
            {modoTabla == 1 ? <Info /> : <Cuadricula />}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatosComponent;
