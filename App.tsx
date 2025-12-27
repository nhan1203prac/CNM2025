
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Product, CartItem, User } from './types';
import { MOCK_USER } from './data';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Account/Dashboard';
import Profile from './pages/Account/Profile';
import Orders from './pages/Account/Orders';
import Favorites from './pages/Account/Favorites';

// Contexts
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

// Layout Wrapper
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Header />}
      <main className="flex-grow">{children}</main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(MOCK_USER); // Mocking logged in state

  const addToCart = (product: Product, quantity: number, size: string, color: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size && item.selectedColor === color);
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity, selectedSize: size, selectedColor: color }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const login = () => setUser(MOCK_USER);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, subtotal }}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/account" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/account/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
              <Route path="/account/orders" element={user ? <Orders /> : <Navigate to="/login" />} />
              <Route path="/account/favorites" element={user ? <Favorites /> : <Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Layout>
        </Router>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
