import axios from "axios";
import { 
    DELETE_FAVORITES,
    POST_FAVORITES
 } from "./Types";



export const postFavorites = (data) => {
    return function(dispatch) {
        dispatch({
            type: POST_FAVORITES,
            payload: data,
        })
    }

} 

export const deleteFavorites = (id) => {
    return function(dispatch) {
        dispatch({
            type: DELETE_FAVORITES,
            payload: id
        })
    }

} 


