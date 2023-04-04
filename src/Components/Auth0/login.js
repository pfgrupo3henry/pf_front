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
      window.location.href = "https://pf-front-y72g-git-develop-pfgrupo3henry.vercel.app/home";
    })

  };

  return (
    <div>
      <GoogleButton onClick={handleLoginClick} />
    </div>
  )

}

