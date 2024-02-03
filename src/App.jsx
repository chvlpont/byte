import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetails from "./components/ProductDetails";
import NavBar from "./components/NavBar";
import ContactForm from "./pages/ContactForm";
import LandingPage from "./pages/LandingPage";
import Checkout from "./pages/Checkout";
import { Provider } from "react-redux";
import Store from "./redux/store";
import Register from "./auth/RegisterPage";
import OrderHistory from "./private/OrderHistory";
import Login from "./auth/LoginPage";
import { AuthProvider } from "./auth/AuthContext";
import OrderCompleted from "./pages/OrderCompleted";
import Footer from "./components/Footer";

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
