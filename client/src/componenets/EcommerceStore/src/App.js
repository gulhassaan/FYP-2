import React from 'react';
import './App.css';
import { BrowserRouter as Router , Routes ,Route } from "react-router-dom";
import { Navbar } from "./Components/navbar";
import { Cart } from "./Pages/cart/cart";
import { Shop } from "./Pages/shop/shop";
import Checkout from "./checkout"; // Updated import statement
import { ShopContextProvider } from './context/shop-context';

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Shop/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
