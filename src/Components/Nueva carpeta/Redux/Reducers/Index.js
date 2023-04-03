import { 
    GET_FAVORITES, 
    POST_FAVORITES, 
    ADD_ITEM_TO_CHART, 
    DELETE_FAVORITES, 
    GET_CARDS, 
    FILTER_CARDS, 
    GET_SEARCH, 
    SET_NAME_FILTER, 
    ORDER_BY_NAME, 
    ORDER_BY_PRICE, 
    ORDER_BY_RATE,
    POST_NEW_PRODUCT,
    GET_ALL_USERS
} from "../Actions/Types";

const initialState = {
    allFavorites: localStorage.getItem(`allFavorites`) && JSON.parse(localStorage.getItem('allFavorites')) || [],
    shoppingChart: [], /* localStorage.getItem(`shoppingChart`) && JSON.parse(localStorage.getItem('shoppingChart')) || [], */
    allGames: [],
    cards: [],
    filteredCards: [],
    nameFilter: '',
    allUsers: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {


        case POST_FAVORITES:
            localStorage.setItem('allFavorites', JSON.stringify([...state.allFavorites, action.payload]));
            return {
                ...state,
                allFavorites: [...state.allFavorites, action.payload]
            }

        case DELETE_FAVORITES:

            const favoriteFIlter = state.allFavorites.filter(e => e.id !== action.payload);
            localStorage.setItem('allFavorites', JSON.stringify([...favoriteFIlter]));
            return {
                ...state,
                allFavorites: favoriteFIlter
            }


        case POST_NEW_PRODUCT:
            return {
                ...state,
                allGames: action.payload
            }


        case ADD_ITEM_TO_CHART:
            return {
                ...state,
                shoppingChart: action.payload

            }

            



/*             let flag = false;

            state.shoppingChart.length && state.shoppingChart.forEach(el => {
                if (JSON.stringify(el) === JSON.stringify(action.payload)) {
                    flag = true;
                }
            })

            if (!flag) {
                localStorage.setItem('shoppingChart', JSON.stringify([...state.shoppingChart, action.payload]));
                return {
                    ...state,
                    shoppingChart: [...state.shoppingChart, action.payload]
                }
            } else {
                const filteredChart = state.shoppingChart.filter(el => {
                    return JSON.stringify(el) !== JSON.stringify(action.payload)
                });
                localStorage.setItem('shoppingChart', JSON.stringify([...filteredChart]));
                return {
                    ...state,
                    shoppingChart: [...filteredChart]
                }
            } */

        case GET_CARDS:
            return {
                ...state,
                cards: action.payload,
                filteredCards: action.payload,
            }
        
            case GET_ALL_USERS:
                return {
                    ...state,
                    allUsers: action.payload,
                    
                }


        case FILTER_CARDS:
            return {
                ...state,
                filteredCards: action.payload,
            }

        case GET_SEARCH:
            return {
                ...state,
                filteredCards: action.payload,
            }

        case SET_NAME_FILTER:
            return {
                ...state,
                nameFilter: action.payload,
            }

        case ORDER_BY_NAME: {
            let orderAz = [...state.filteredCards];
            orderAz = orderAz.sort((a, b) => {
                switch (action.payload) {
                    case 1:
                        if (a.name < b.name) {
                            return -1;
                        } else return 1
                    case 2:
                        if (a.name > b.name) {
                            return -1;
                        } else return 1
                    default: return 0;
                }
            })
            return {
                ...state,
                filteredCards: orderAz
            }
        }
        case ORDER_BY_PRICE: {
            let ordenAscendente = true;
            let orderPrice = [...state.filteredCards];
            if (ordenAscendente) {
                orderPrice = orderPrice.sort((a, b) => a.price - b.price);
                ordenAscendente = false
            }
            else {
                orderPrice = orderPrice.sort((a, b) => b.price - a.price);
                ordenAscendente = true
            }
            return { ...state, filteredCards: orderPrice }
        }
        // case ORDER_BY_RATE: {
        //     let orderRate = [...state.filteredCards];
        //     orderRate = orderRate.sort((a, b) => a.price - b.price)
        //     return { ...state, filteredCards: orderRate }
        // }
        default:
            return { ...state }
    }
}



export default rootReducer; 