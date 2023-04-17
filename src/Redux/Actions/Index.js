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
    DELETE_CHART,
    GET_FAVORITES,
    GET_CHART_2,
    GET_REVIEWS,
    SAVE_RATING_AND_COMMENT,
    GET_ALL_ORDERS,
    MODIFICAR_USUARIO,
    SAVE_RATING_WEB,
    GET_RATING_WEB,
    GET_ORDERS_ID,
    GET_ALL_RATING_WEB
} from "./Types";

import axios from "axios";


export function getAllRatingsWeb() {
    try {
        return async function (dispatch) {
            let results = await axios.get(`https://pfservidor-production.up.railway.app/webreview`);

            return dispatch({
                type: GET_ALL_RATING_WEB,
                payload: results.data
            });

        }
    } catch (error) {
        console.log(error)
    }
}


export function getRatingWeb(id) {
    try {
        return async function (dispatch) {
            let results = await axios.get(`https://pfservidor-production.up.railway.app/webreview/${id}`);
            return dispatch({
                type: GET_RATING_WEB,
                payload: results.data
            });

        }
    } catch (error) {
        console.log(error)
    }
}
export function saveRatingWeb(payload) {
    try {
        return async function (dispatch) {
            let json = await axios.post(`https://pfservidor-production.up.railway.app/webreview`, payload);
            console.log("console.log", json)
            return dispatch({
                type: SAVE_RATING_WEB,
                payload: json.data,
            })
        }
    } catch (error) {
        console.log("error-post", error)

    }

}

export const getReviews = (id) => {
    try {
        return async function (dispatch) {
            let results = await axios.get(`https://pfservidor-production.up.railway.app/review/${id}`);
            console.log("console.log", results)
            return dispatch({
                type: GET_REVIEWS,
                payload: results.data
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export function saveRatingAndComment(payload) {
    try {
        return async function (dispatch) {
            let json = await axios.post(`https://pfservidor-production.up.railway.app/review`, payload);
            console.log("console.log", json)
            return dispatch({
                type: SAVE_RATING_AND_COMMENT,
                payload: json.data,
            })
        }
    } catch (error) {
        console.log("error-post", error)

    }

}

export const postFavorites = (payload) => {
    try {
        return async function (dispatch) {
            let json = await axios.post("https://pfservidor-production.up.railway.app/favorites/addFavorite", payload);
            console.log("console.log", json)

            return dispatch({
                type: POST_FAVORITES,
                payload: json.data,
            })
        }

    } catch (error) {
        console.log("error-post", error)

    }

}

export const deleteFavorites = (payload) => {
    try {
        return async function (dispatch) {
            let json = await axios.post("https://pfservidor-production.up.railway.app/favorites/restFavorite", payload);
            console.log("console.log", json)

            return dispatch({
                type: DELETE_FAVORITES,
                payload: json.data,
            })
        }

    } catch (error) {
        console.log("error-post", error)

    }

}

export const getFavorites = (id) => {
    try {
        return async function (dispatch) {
            let json = await axios.get(`https://pfservidor-production.up.railway.app/favorites/${id}`);
            console.log("console.log", json)

            return dispatch({
                type: GET_FAVORITES,
                payload: json.data,
            })
        }

    } catch (error) {
        console.log("error-post", error)

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

export const getChart = (id) => {
    console.log("getchards");
    try {
        return async function (dispatch) {
            let json = await axios.get(`https://pfservidor-production.up.railway.app/cart/${id}`)
            console.log("console.log", json)

            return dispatch({
                type: GET_CHART_2,
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



export const modificarUser = (id, payload) => {


    return async function (dispatch) {
        try {
            let json = await axios.put(`https://pfservidor-production.up.railway.app/user/promote-or-block/${id}`, payload);
            console.log("status", json)
            return dispatch({
                type: MODIFICAR_USUARIO,
                payload: json.data,
            })
        } catch (error) {
            console.log("error-post", error)

        }

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




export const getOrders = () => {
    try {
        return async function (dispatch) {
            let json = await axios.get('https://pfservidor-production.up.railway.app/orders/allOrders');
            console.log(json)
            return dispatch({
                type: GET_ALL_ORDERS,
                payload: json.data
            })
        }

    } catch (error) {
        console.log(error)

    }
}

export const getOrdersId = (id) => {
    try {
        return async function (dispatch) {
            let json = await axios.get(`https://pfservidor-production.up.railway.app/orders/${id}`);
            console.log(json)
            return dispatch({
                type: GET_ORDERS_ID,
                payload: json.data
            })
        }

    } catch (error) {
        console.log(error)

    }
}