import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

// Layout & Components cho Khách hàng
import Header from "./pages/customer/components/layout/Header";
import Footer from "./pages/customer/components/layout/Footer";

// Các trang cho Khách hàng
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

// Layout & Components cho Admin
import { Header as AdminHeader } from "./pages/admin/Header";
import { Sidebar as AdminSidebar } from "./pages/admin/Sidebar";
import { ProductsPage } from "./pages/admin/ProductsPage";
import { CategoriesPage } from "./pages/admin/CategoriesPage";
import { OrdersPage as AdminOrdersPage } from "./pages/admin/OrdersPage";
import { UsersPage } from "./pages/admin/UsersPage";

import { useAuth } from "./pages/context/AuthContext";
import AdminDashboard from "./pages/admin/AdminDashboard";

const AdminLayout = ({ children }) => {
  const { pathname } = useLocation();
  const pageName = pathname.split('/').pop() || 'dashboard';

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar currentPage={pageName} /> 
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader /> 
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

const CustomerLayout = ({ children }) => {
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

const AppContent = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  const isAdminPath = location.pathname.startsWith('/admin');

  if (isAdminPath) {
    // if (!user?.isAdmin) return <Navigate to="/" replace />; 
    return (
      <AdminLayout>
        <Routes>
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
  <Route path="/admin/products" element={<ProductsPage />} />
  <Route path="/admin/categories" element={<CategoriesPage />} />
  <Route path="/admin/orders" element={<AdminOrdersPage />} />
  <Route path="/admin/users" element={<UsersPage />} />
</Routes>

      </AdminLayout>
    );
  }

  return (
    <CustomerLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/orders" element={user ? <OrdersPage /> : <Navigate to="/login" />} />
        <Route path="/favorites" element={user ? <FavoritesPage /> : <Navigate to="/login" />} />
        <Route path="/account" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/account/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/account/notification" element={user ? <Notifications /> : <Navigate to="/login" />} />
        <Route path="/account/addresses" element={user ? <Addresses /> : <Navigate to="/login" />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CustomerLayout>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;