import {
    // GET_FAVORITES,
    POST_FAVORITES,
    ADD_ITEM_TO_CHART,
    DELETE_FAVORITES,
    GET_CARDS,
    FILTER_CARDS,
    GET_SEARCH,
    SET_NAME_FILTER,
} from "./Types";

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

export const getCards = () => {
    return async function(dispatch) {
        try {
            const response = await fetch('https://pfservidor-production.up.railway.app/videogames');
            const data = await response.json();
            console.log(data);
            dispatch ({
                type: GET_CARDS,
                payload: data,
            })
        } catch (error) {
            console.error(error);
        }
    }
}

export const filterCards = (data) => {
    return function(dispatch) {
        dispatch({
            type: FILTER_CARDS,
            payload: data,
        })
    }
}

export const searchByName = (data) => {
    return async function(dispatch) {
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
    return function(dispatch) {
        dispatch({
            type: SET_NAME_FILTER,
            payload: data,
        })
    }
}