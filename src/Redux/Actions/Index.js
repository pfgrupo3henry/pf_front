import {
    // GET_FAVORITES,
    POST_FAVORITES,
    ADD_ITEM_TO_CHART,
} from "./Types";

export const postFavorites = (data) => {
    return function (dispatch) {
        dispatch({
            type: POST_FAVORITES,
            payload: data,
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


