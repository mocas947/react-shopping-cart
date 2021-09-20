import React from "react";
// import data from "./data.json"; now comes from server
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import  HomeScreen  from "./screens/HomeScreen";
import  AdminScreen  from "./screens/AdminScreen";

class App extends React.Component {
   render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
        <div className="grid-container">
          <header>
            <Link to="/">T O R B A</Link>
            <Link to="/admin">Administracija</Link>
          </header>
          <main>
            <Route path="/admin" component={AdminScreen} />
            <Route path="/" component={HomeScreen} exact />
         
          </main>
          <footer>Sva prava zadržana.</footer>

        </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
