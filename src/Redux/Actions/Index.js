import {
    // GET_FAVORITES,
    POST_FAVORITES,
    ADD_ITEM_TO_CHART,
    DELETE_FAVORITES,
    POST_NEW_PRODUCT
} from "./Types";

import axios from "axios";

export const postFavorites = (data) => {
    return function (dispatch) {
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


export const addItemToChart = (data) => {
    return function (dispatch) {
        dispatch({
            type: ADD_ITEM_TO_CHART,
            payload: data,
        })
    }
}


export const postNewProduct =(payload)=> {

    try {
        return async function(dispatch){
            let json = await axios.post("https://pfservidor-production.up.railway.app/videogames" , payload);
            console.log("console.log" , json)
            return dispatch({
                type: POST_NEW_PRODUCT,
                payload: json.data,
            })
        }
            
    } catch (error) {   
        console.log("error-post", error)
        
    }

}

