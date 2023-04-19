import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import GoogleButton from 'react-google-button';



export const Login = () => {


  //const { loginWithRedirect } = useAuth0();
  const { loginWithPopup } = useAuth0();

  const handleLoginClick = () => {
    loginWithPopup({
      height: 600,
      width: 400,
      timeoutInSeconds: 10,
    }).then((res) => {
      window.location.href = "/";
    })

  };

  return (
    <div>
      <GoogleButton style={{ width: "22rem" }}
        onClick={handleLoginClick} 
        label="Iniciar sesión con Google"/>
    </div>
  )

}
