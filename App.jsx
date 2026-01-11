import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Link
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

import { Header as AdminHeader } from "./pages/admin/Header";
import { Sidebar as AdminSidebar } from "./pages/admin/Sidebar";
import { ProductsPage } from "./pages/admin/ProductsPage";
import { CategoriesPage } from "./pages/admin/CategoriesPage";
import { OrdersPage as AdminOrdersPage } from "./pages/admin/OrdersPage";
import { UsersPage } from "./pages/admin/UsersPage";

import { useAuth } from "./pages/context/AuthContext";
import AdminDashboard from "./pages/admin/AdminDashboard";
import VerifyEmail from "./pages/customer/VerifyPage";
import ForgotPassword from "./pages/customer/ForgotPassword";
import CategoryPage from "./pages/customer/CategoryPage";
import AccountLayout from "./pages/customer/components/account/AccountLayout";

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
  const isAuthPage = ["/login", "/signup","/forgot-password", "/verify-email"].includes(pathname);
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Header />}
      {user && !user.is_active && !isAuthPage && (
        <div className="bg-amber-50 border-b border-amber-200 py-2.5 text-center text-sm text-amber-800">
          <span className="font-medium">Tài khoản của bạn chưa được xác thực.</span>
          <Link to="/verify-email" state={{ email: user.email }} className="ml-2 font-bold underline hover:text-amber-900">
            Xác thực ngay để mở khóa toàn bộ tính năng
          </Link>
        </div>
      )}
      <main className="flex-grow">{children}</main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

const AppContent = () => {
  // const { user } = useAuth();
  const user = localStorage.getItem("user_info");
  const location = useLocation();
  
  const isAdminPath = location.pathname.startsWith('/admin');


  if (isAdminPath) {
    // if (!user?.isAdmin) return <Navigate to="/" replace />; 
    return (
      <AdminLayout>
        <Routes>
  <Route path="/admin/dashboard" element={user?<AdminDashboard />: <Navigate to="/login" />} />
  <Route path="/admin/products" element={user?<ProductsPage />: <Navigate to="/login" />} />
  <Route path="/admin/categories" element={user?<CategoriesPage />: <Navigate to="/login" />} />
  <Route path="/admin/orders" element={user?<AdminOrdersPage />: <Navigate to="/login" />} />
  <Route path="/admin/users" element={user?<UsersPage />: <Navigate to="/login" />} />
  <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
</Routes>

      </AdminLayout>
    );
  }

  return (
    <CustomerLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        
        <Route path="/orders" element={user ? <OrdersPage /> : <Navigate to="/login" />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/favorites" element={user ? <FavoritesPage /> : <Navigate to="/login" />} />
        <Route path="/account" element={<AccountLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notification" element={<Notifications />} />
          <Route path="addresses" element={<Addresses />} />
        </Route>

        
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