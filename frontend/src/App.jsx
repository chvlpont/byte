import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductList from "../src/pages/ProductList";
import ProductDetails from "../src/components/ProductDetails";
import NavBar from "../src/components/NavBar";
import ContactForm from "../src/pages/ContactForm";
import LandingPage from "../src/pages/LandingPage";
import Checkout from "../src/pages/Checkout";
import { Provider } from "react-redux";
import Store from "../src/redux/Store";
import Register from "../src/auth/RegisterPage";
import OrderHistory from "../src/private/OrderHistory";
import Login from "../src/auth/LoginPage";
import { AuthProvider } from "../src/auth/AuthContext";
import OrderCompleted from "../src/pages/OrderCompleted";
import Footer from "../src/components/Footer";

function App() {
  return (
    <Provider store={Store}>
      <AuthProvider>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/products" element={<ProductList />}></Route>
          <Route path="/products/:id" element={<ProductDetails />}></Route>
          <Route path="/contact" element={<ContactForm />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/orders" element={<OrderHistory />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/order-completed" element={<OrderCompleted />}></Route>
        </Routes>
        <Footer />
      </AuthProvider>
    </Provider>
  );
}

export default App;
