import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const categories = ["All", "tshirts", "Jeans"]; // Include All category

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All"); // Default to All

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/product/list");
                setProducts(response.data.data);
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = selectedCategory === "All"
        ? products
        : products.filter((product) => product.category === selectedCategory);

    return (
        <div className="flex flex-wrap">
            <div className="w-full md:w-1/5 p-5 border-b md:border-r">
                <h2 className="text-xl mb-4">Categories</h2>
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`block w-full text-left p-2 rounded ${selectedCategory === category ? "bg-blue-500 text-white" : "text-blue-500"}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            
            <div className="w-full md:w-3/4 p-5">
                <h2 className="text-xl mb-4">Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {products.length === 0 ? (
                        <p>No items available.</p>
                    ) : filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Link to={`/product/${product._id}`} key={product._id} className="border rounded p-4 block hover:shadow-lg">
                                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
                                <h3 className="font-bold mt-2">{product.name}</h3>
                                <p>{product.description}</p>
                                <p className="text-lg font-bold">${product.price}</p>
                            </Link>
                        ))
                    ) : (
                        <p>No products found in this category.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
