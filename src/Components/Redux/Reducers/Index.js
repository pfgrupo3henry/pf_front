import { 
    GET_FAVORITES,
    POST_FAVORITES 
  
} from "../Actions/Types"

const initialState = {
    allFavorites: [],
  
}

const rootReducer = (state = initialState , action) => {
    switch(action.type){
        // case GET_FAVORITES:
        //     return{
        //         ...state,
        //         allFavorites: [...state.allFavorites, ...action.payload],
                
        //     }

        case POST_FAVORITES:
            return{
                ...state,
                allFavorites: [...state.allFavorites, action.payload]
                
            }

            default: return{...state} 

        }}
          
export default rootReducer;           



/* function rootReducer(state = initialState, action) {
    if (action.type === "ADD_MOVIE_FAVORITE") {
        return {
          ...state,
          moviesFavourites: state.moviesFavourites.concat(action.payload)
        }
    }
    if (action.type === "REMOVE_MOVIE_FAVORITE") {
        return {
          ...state,
          moviesFavourites: state.moviesFavourites.filter((movie) => movie.id !== action.payload)
        }
    } */