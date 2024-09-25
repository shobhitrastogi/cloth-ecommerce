import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const ProductDetail = ({ addToCart, isLoggedIn }) => { // Accept isLoggedIn as prop
    const { id: productId } = useParams(); 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/product/${productId}`);
                setProduct(response.data.data);
                setLoading(false); 
            } catch (error) {
                setError("Error fetching product details");
                setLoading(false); 
            }
        };
        fetchProduct();
    }, [productId]);

    if (loading) {
        return <div className="text-center text-xl animate-pulse">Loading...</div>;
    }

    if (error) {
        return (
            <div className="text-red-600 text-center">
                <p>{error}</p>
                <Link to="/" className="text-blue-500 underline">Go back to Home</Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (isLoggedIn) {
            addToCart(productId);
            alert("Item added to cart!");
        } else {
            alert("You must be logged in to add items to the cart.");
            navigate('/login'); // Redirect to login
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-8 p-5 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-80 duration-800">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg mb-4 transition-transform duration-300 transform hover:scale-105" />
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-lg font-bold text-green-600 mb-4">${product.price}</p>
            <button 
                className="w-full inline-block text-center bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300" 
                onClick={handleAddToCart} // Use the new handler
            >
                Add to Cart
            </button>
            <Link to="/" className="w-full mt-4 inline-block text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                Back to Products
            </Link>
        </div>
    );
};

export default ProductDetail;
