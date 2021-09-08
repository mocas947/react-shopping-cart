import React from "react";
// import data from "./data.json"; now comes from server
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import store from "./store";
import { Provider } from "react-redux";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // products: data.products,
      cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
      // size: "", now comes from Redux Store
      // sort: "",
    };
  }
  createOrder = (order) => {
    alert("Need to save order for " + order.name);
  }
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
  localStorage.setItem(
    "cartItems", 
    JSON.stringify(cartItems.filter((x) => x._id !== product._id)));
};  

// klon kopija
addToCart = (product) => {
  const cartItems = this.state.cartItems.slice();
  let alreadyInCart = false;
  cartItems.forEach((item) => {
    if (item._id === product._id) {
      item.count++;
      alreadyInCart = true;
    }
  });
  if (!alreadyInCart) {
    cartItems.push({...product, count: 1});
  }
  this.setState({cartItems});
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};


  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">K O R P A</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter 

                ></Filter>
                <Products 
                  addToCart={this.addToCart}
                ></Products>
              </div>
              <div className="sidebar">
                  <Cart 
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}
                />           ;
              </div>
            </div>
          </main>
          <footer>Sva prava zadržana.</footer>

        </div>
      </Provider>
    );
  }
}

export default App;
