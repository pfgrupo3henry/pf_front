import axios from "axios";
import { 
    GET_FAVORITES,
    POST_FAVORITES
 } from "./Types";

export const getFavorites =(payload)=> {
    return {
        type: GET_FAVORITES,
        payload
    }

}  

export const postFavorites =(payload)=> {
    return {
        type: POST_FAVORITES,
        payload
    }

} 

export const deletetFavorites =(payload)=> {
    return {
        type: POST_FAVORITES,
        payload
    }

} 
