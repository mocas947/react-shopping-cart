import { createStore, compose, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import { productsReducer } from "./reducers/productReducers";
// Curly brackets, because it's not a default export, it's been named export
const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        products: productsReducer,
           
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;

