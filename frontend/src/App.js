import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './pages/Cart';
import Footer from './components/Footer';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Load theme preference from local storage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const addToCart = (productId) => {
        setCartItems((prevItems) => {
            const currentQuantity = prevItems[productId] || 0;
            return { ...prevItems, [productId]: currentQuantity + 1 };
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => {
            const newItems = { ...prevItems };
            delete newItems[productId];
            return newItems;
        });
    };

    return (
        <div className={isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}>
            <Router>
                <Navbar 
                    isLoggedIn={isLoggedIn} 
                    onLogout={handleLogout} 
                    toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    isDarkMode={isDarkMode}
                />
                <Routes>
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/" element={<ProductList />} />
                    <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
                    <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
