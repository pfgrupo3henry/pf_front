import {
    // GET_FAVORITES,
    POST_FAVORITES,
    ADD_ITEM_TO_CHART,
    DELETE_FAVORITES
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


