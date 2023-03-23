import axios from "axios";
import { 
    // GET_FAVORITES,
    POST_FAVORITES
 } from "./Types";

// export const getFavorites = () => {
//     // data = fetch
//     return function(dispatch) {
//         dispatch({
//             type: GET_FAVORITES,
//             payload: data,
//         })
//     }

// }  

export const postFavorites = (data) => {
    // return {
    //     type: POST_FAVORITES,
    //     payload
    // }
    return function(dispatch) {
        dispatch({
            type: POST_FAVORITES,
            payload: data,
        })
    }

} 

// export const deletetFavorites = (data) => {
//     // return {
//     //     type: POST_FAVORITES,
//     //     payload
//     // }
//     return function(dispatch) {
//         dispatch({
//             type: GET_FAVORITES,
//             payload: data,
//         })
//     }
// } 
