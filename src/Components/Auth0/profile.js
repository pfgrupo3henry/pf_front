import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./profile.css"
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export const Profile =()=> {
    const {user, isAuthenticated, isLoading} = useAuth0();

    if(isLoading){
        return <AiOutlineLoading3Quarters/>
    }

    return (
        isAuthenticated && (
            
            <div className="profile">
                <img className="imgProfile" src={user.picture} alt={user.name}></img>
                {/* <h4 className="nameProfile">{user.name}</h4> */}
                {/* <p className="infoProfile"> Email: {user.email}</p> */}
            </div>
        )
    )


}