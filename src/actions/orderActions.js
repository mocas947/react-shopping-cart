import { CREATE_ORDER, CLEAR_CART, CLEAR_ORDER } from "../types";

export const createOrder = (order) => (dispatch) => {
  fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())  // kovert rezultat u Json
    .then((data) => {    // use JSON data as data
      dispatch({ type: CREATE_ORDER, payload: data });   //order data
      localStorage.clear("cartItems");
      dispatch({ type: CLEAR_CART });
    });
};
export const clearOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_ORDER });
};