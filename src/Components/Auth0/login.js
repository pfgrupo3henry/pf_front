import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Login = ()=> {
    

/*     const {loginWithRedirect} = useAuth0();
 */    const {loginWithPopup} = useAuth0();

    const handleLoginClick = () => {
        loginWithPopup({
          height: 600,
          width: 400,
          timeoutInSeconds: 10,
         
        });
      }
    return (
    <div 
    onClick={handleLoginClick}
    >
        Login
    </div>
    )
    
}

