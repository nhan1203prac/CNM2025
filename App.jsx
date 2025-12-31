import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

import Header from "./pages/customer/components/layout/Header";
import Footer from "./pages/customer/components/layout/Footer";

import Home from "./pages/customer/Home";
import ProductDetail from "./pages/customer/ProductDetail";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/customer/Account/Dashboard";
import Profile from "./pages/customer/Account/Profile";
import ProductList from "./pages/customer/ProductList";
import Notifications from "./pages/customer/Account/Notifications";
import Addresses from "./pages/customer/Account/Addresses";
import OrdersPage from "./pages/customer/OrdersPage";
import FavoritesPage from "./pages/customer/FavouritePage";

import { useAuth } from "./pages/context/AuthContext";

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const isAuthPage = ["/login", "/signup"].includes(pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Header />}
      <main className="flex-grow">{children}</main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

const App = () => {
  const { user } = useAuth(); 

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/orders"
            element={user ? <OrdersPage /> : <Navigate to="/login" />}
          />

          <Route
            path="/favorites"
            element={user ? <FavoritesPage /> : <Navigate to="/login" />}
          />

          <Route
            path="/account"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />

          <Route
            path="/account/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />

          <Route
            path="/account/notification"
            element={user ? <Notifications /> : <Navigate to="/login" />}
          />

          <Route
            path="/account/addresses"
            element={user ? <Addresses /> : <Navigate to="/login" />}
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
