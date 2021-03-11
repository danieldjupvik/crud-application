import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Nav from "./components/Nav";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Products from "./pages/Products";
import EditProduct from "./pages/EditProduct";
import AddProduct from "./pages/AddProduct";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/products" component={Products} />
          <Route path="/edit/:id" component={EditProduct} />
          <Route path="/add" component={AddProduct} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
