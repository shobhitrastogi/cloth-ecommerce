import { useEffect, useState } from "react";

const Cart = ({ cartItems,removeFromCart }) => { // Accept cartItems as prop
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // You can include logic here to fetch cart items from a server as needed
        setLoading(false);
    }, []);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-600">{error}</div>;

    return (
        <div className="max-w-lg mx-auto mt-8 p-5 bg-white shadow-lg rounded-lg">
            <h1 className="text-xl font-bold mb-4">Your Cart</h1>
            {Object.keys(cartItems).length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {Object.entries(cartItems).map(([itemId, quantity]) => (
                        <li key={itemId} className="flex justify-between mb-2">
                            <span>Item ID: {itemId}</span>
                            <span>Quantity: {quantity}</span>
                            <button 
                                className="text-red-500 ml-4" 
                                onClick={() => removeFromCart(itemId)}>Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;
