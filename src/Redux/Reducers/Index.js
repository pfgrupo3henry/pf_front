import {
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
    GET_ORDERS_ID

} from "../Actions/Types";

const initialState = {
    allFavorites: [],
    shoppingChart: [],
    allGames: [],
    cards: [],
    filteredCards: [],
    nameFilter: '',
    allUsers: [],
    reviews: [],
    allOrders: [],
    ordersID: [],
    ratingsWeb: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RATING_WEB:
            return {
                ...state,
                ratingsWeb: action.payload,

            }
        case SAVE_RATING_WEB: {
            return {
                ...state,
                ratingsWeb: action.payload
            }
        }
        case SAVE_RATING_AND_COMMENT: {
            return {
                ...state,
                reviews: action.payload
            }
        }

        case GET_REVIEWS:
            return {
                ...state,
                reviews: action.payload,

            }


        case POST_FAVORITES:

            return {
                ...state,
                allFavorites: action.payload
            }

        case DELETE_FAVORITES:

            return {
                ...state,
                allFavorites: action.payload
            }

        case GET_FAVORITES:

            return {
                ...state,
                allFavorites: action.payload
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

        case DELETE_CHART:
            return {
                ...state,
                shoppingChart: action.payload

            }

        case GET_CHART_2:
            return {
                ...state,
                shoppingChart: action.payload

            }


        case GET_CARDS:
            return {
                ...state,
                cards: action.payload,
                filteredCards: action.payload,
            }



        case GET_ALL_ORDERS:
            return {
                ...state,
                allOrders: action.payload,
            }

        case GET_ORDERS_ID:
            return {
                ...state,
                ordersID: action.payload,
            }

        case GET_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload,

            }


        /*    case MODIFICAR_USUARIO:
   
               return{
                   ...state,
   
               } */

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
                        if (a.name.toLowerCase() < b.name.toLowerCase()) {
                            return -1;
                        } else return 1
                    case 2:
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
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
            let orderPrice = [...state.filteredCards];
            switch (action.payload) {
                case 'MENOR PRECIO': {
                    let orderPriceMayor = orderPrice.sort((a, b) => a.price - b.price);
                    return {
                        ...state,
                        filteredCards: orderPriceMayor
                    }
                }
                case 'MAYOR PRECIO': {
                    let orderPriceMenor = orderPrice.sort((a, b) => b.price - a.price);
                    return { ...state, filteredCards: orderPriceMenor }
                }
            }

        }





        default:
            return { ...state }
    }
}



export default rootReducer;











/*       let flag = false;
 
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