import {
    // GET_FAVORITES,
    POST_FAVORITES,
    ADD_ITEM_TO_CHART,
    DELETE_FAVORITES,
    POST_NEW_PRODUCT,
    GET_CARDS,
    FILTER_CARDS,
    GET_SEARCH,
    SET_NAME_FILTER,
    ORDER_BY_NAME, ORDER_BY_PRICE,
    ORDER_BY_RATE,
    GET_ALL_USERS,
    DELETE_CHART
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
    return function (dispatch) {
        dispatch({
            type: DELETE_FAVORITES,
            payload: id
        })
    }

}


export const addItemToChart = (payload) => {
    try {
        return async function (dispatch) {
            let json = await axios.post("https://pfservidor-production.up.railway.app/cart/addQuantity", payload);
            console.log("console.log", json)

            return dispatch({
                type: ADD_ITEM_TO_CHART,
                payload: json.data,
            })
        }

    } catch (error) {
        console.log("error-post", error)

    }

}

export const deleteChart = (payload) => {
    try {
        return async function (dispatch) {
            let json = await axios.post(`https://pfservidor-production.up.railway.app/cart/delete`, payload)
            console.log("console.log", json)

            return dispatch({
                type: DELETE_CHART,
                payload: json.data,
            })
        }

    } catch (error) {
        console.log("error-post", error)

    }

}




export const getUsers = () => {
    try {
        return async function (dispatch) {
            let json = await axios.get('https://pfservidor-production.up.railway.app/user/all-users');
            console.log(json)
            return dispatch({
                type: GET_ALL_USERS,
                payload: json.data
            })
        }

    } catch (error) {
        console.log(error)

    }


}




export const getCards = () => {
    return async function (dispatch) {
        try {
            const response = await fetch('https://pfservidor-production.up.railway.app/videogames');
            const data = await response.json();
            console.log(data);
            dispatch({
                type: GET_CARDS,
                payload: data,
            })
        } catch (error) {
            console.error(error);
        }
    }
}


export const postNewProduct = (payload) => {

    try {
        return async function (dispatch) {
            let json = await axios.post("https://pfservidor-production.up.railway.app/videogames", payload);
            console.log("console.log", json)
            return dispatch({
                type: POST_NEW_PRODUCT,
                payload: json.data,
            })
        }

    } catch (error) {
        console.log("error-post", error)

    }

}


export const filterCards = (data) => {
    return function (dispatch) {
        dispatch({
            type: FILTER_CARDS,
            payload: data,
        })
    }
}

export const searchByName = (data) => {
    return async function (dispatch) {
        try {
            const response = await fetch(`https://pfservidor-production.up.railway.app/videogames?name=${data}`);
            const result = await response.json();
            console.log(result);
            dispatch({
                type: GET_SEARCH,
                payload: result,
            })
        } catch (error) {
            console.error(error);
        }
    }
}

export const setNameFilter = (data) => {
    return function (dispatch) {
        dispatch({
            type: SET_NAME_FILTER,
            payload: data,
        })
    }
}

export const orderByName = (data) => {
    return function (dispatch) {
        dispatch({
            type: ORDER_BY_NAME,
            payload: data,
        })
    }
}

export const orderByPrice = (data) => {
    return function (dispatch) {
        dispatch({
            type: ORDER_BY_PRICE,
            payload: data,
        })
    }
}

// export const orderByRate = (data) => {
//     return function (dispatch) {
//         dispatch({
//             type: ORDER_BY_RATE,
//             payload: data,
//         })
//     }
// }