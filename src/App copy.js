import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: [],
      size: "",
      sort: "",
    };
  }
removeFromCart = (product) => {
  const cartItems = this.state.cartItems.slice();
  this.setState({
    cartItems: cartItems.filter((x) => x.id !== product._id),
  });
};  

// klon kopija
addToCart = (product) => {
  const cartItems = this.state.cartItems.slice();
  let alreadyInCart = false;
  cartItems.forEach((item) => {
    if (item._id === product.id) {
      item.count++;
      alreadyInCart = true;
    }
  });
  if (!alreadyInCart) {
    cartItems.push({...product, count: 1});
  }
  this.setState({cartItems})
};

  sortProducts = (event) => {
    // impl
    const sort = event.target.value;
    console.log(event.target.value);
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) => 
          sort === "lowest" 
            ? a.price > b.price
              ? 1 
              : -1
            : sort === "highest" 
            ? a.price < b.price
              ? 1 
              : -1
            : a._id  >  b._id
              ? 1
              : -1
        ),
    }));
  };

  filterProducts = (event) => {
    console.log(event.target.value);
    if (event.target.value === "") {
      this.setState({ size: event.target.value, product: data.products });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }  
  };
  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">K O R P A</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length}
              size={this.state.size}  // prop za filter komponentu
              sort={this.state.sort}  // prop za filter komponentu
              filterProducts={this.fiterProducts}
              sortProducts={this.sortProducts}
              ></Filter>
              <Products 
                products={this.state.products} 
                addToCart={this.addToCart}
              ></Products>
            </div>
            <div className="sidebar">
                <Cart cartItems={this.state.cartItems}
                 removeFromCart={this.removeFromCart}
               />           
            </div>
          </div>
        </main>
        <footer>Sva prava zadr??ana.</footer>

      </div>
    );
  }
}

export default App;
