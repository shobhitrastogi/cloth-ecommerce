import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout, toggleDarkMode, isDarkMode }) => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

    const goToLogin = () => {
        navigate('/login');
    };

    const goToSignup = () => {
        navigate('/signup');
    };

    const goToCart = () => {
        navigate('/cart');
    };

    return (
        <nav className={`bg-white shadow-md dark:bg-gray-800`}>
            <div className="flex justify-between items-center max-w-6xl mx-auto px-4 py-4">
                <div className="flex items-center">
                    <h1 className="text-xl font-bold">
                        <Link to="/">
                            eCommerce
                        </Link>
                    </h1>
                </div>
                
                {/* Hamburger Icon for Small Screens */}
                <div className="md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-800 dark:text-white">
                        {isMobileMenuOpen ? '✖' : '☰'} {/* Simple toggle icon */}
                    </button>
                </div>

                {/* Desktop Menu (Hidden on Small Screens) */}
                <div className={`hidden md:flex items-center space-x-4`}>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={goToCart}>
                        Cart
                    </button>
                    <button onClick={toggleDarkMode} className="border p-2 rounded">
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    {isLoggedIn ? (
                        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onLogout}>Logout</button>
                    ) : (
                        <>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={goToLogin}>Login</button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={goToSignup}>Sign Up</button>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu (Visible on Small Screens) */}
            <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
                <div className="flex flex-col items-center bg-white dark:bg-gray-800 py-2 space-y-2">
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={goToCart}>
                        Cart
                    </button>
                    <button onClick={toggleDarkMode} className="border p-2 rounded">
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    {isLoggedIn ? (
                        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onLogout}>Logout</button>
                    ) : (
                        <>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={goToLogin}>Login</button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={goToSignup}>Sign Up</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
