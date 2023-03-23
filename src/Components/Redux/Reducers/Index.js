import { 
    DELETE_FAVORITES,
    POST_FAVORITES 
  
} from "../Actions/Types"

const initialState = {
    allFavorites: [],
  
}

const rootReducer = (state = initialState , action) => {
    switch(action.type){

            case POST_FAVORITES:
                return{
                    ...state,
                    allFavorites: [...state.allFavorites, action.payload]
                    
                }

            case DELETE_FAVORITES:
                const favoriteFIlter = state.allFavorites.filter(e=> e.id !== action.payload)
                return{
                    ...state,
                    allFavorites: favoriteFIlter
                    
                }

            default: return{...state} 

        }

    }

       
export default rootReducer;           

