import { GET_FAVORITES, POST_FAVORITES, ADD_ITEM_TO_CHART, DELETE_FAVORITES } from "../Actions/Types"

const initialState = {
    allFavorites: [],
    shoppingChart: [],
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

        
        case ADD_ITEM_TO_CHART:
            let flag = false;

            state.shoppingChart.length && state.shoppingChart.forEach(el => {
                if (JSON.stringify(el) === JSON.stringify(action.payload)) {
                    flag = true;
                }
            })

            if (!flag) {
                return{
                    ...state,
                    shoppingChart: [...state.shoppingChart, action.payload]
                }
            } else {
                const filteredChart = state.shoppingChart.filter(el => {
                    return JSON.stringify(el) !== JSON.stringify(action.payload)
                });
                return{
                    ...state,
                    shoppingChart: [...filteredChart]
                }
            }

        default: return{...state} 
    }}

        
          
export default rootReducer; 