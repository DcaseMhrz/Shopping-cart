import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Index";
import Shop from "./pages/Shop";
import About from "./pages/About";
import NavBarComponent from "./components/Navbar";
import { CartContextProvider } from "./Contexts/cartContext";

function App() {
  return (
    <BrowserRouter>
      <CartContextProvider>
        <NavBarComponent />
        <Routes>
          <Route Component={Home} path="/" />
          <Route Component={Shop} path="/shop" />
          <Route Component={About} path="/about" />
        </Routes>
      </CartContextProvider>
    </BrowserRouter>
  );
}

export default App;
