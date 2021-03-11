import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Products from "./pages/Products";
import EditProduct from "./pages/EditProduct";
import AddProduct from "./pages/AddProduct";
import Container from "react-bootstrap/Container";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Container>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" component={Login} />
            <Route path="/products" component={Products} />
            <Route path="/edit/:id" component={EditProduct} />
            <Route path="/add" component={AddProduct} />
          </Switch>
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
