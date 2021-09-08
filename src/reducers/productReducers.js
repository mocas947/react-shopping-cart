import { FETCH_PRODUCT, FILTER_PRODUCT_BY_SIZE, ORDER_PRODUCT_BY_PRICE } from "../types";

export const productsReducer = (state = {}, action) => {
    switch (action.type) {
        case FILTER_PRODUCT_BY_SIZE:
            return {
                ...state,
                size: action.payload.size,
                filteredItems: action.payload.items,
            };
            
        case ORDER_PRODUCT_BY_PRICE: 
            return {
                ...state,
                sort: action.payload.sort,
                filteredItems: action.payload.items,
            };

        case FETCH_PRODUCT:
            return { items: action.payload, filteredItems: action.payload };
        default:
            return state;
    }
    
};