// Home.js
import React from "react";
import ProductList from "../components/ProductList";

const Home = ({ onLogout }) => {
  return (
    <div className="p-10">
      <h2 className="text-2xl">Welcome to the Home Page!</h2>
      <ProductList />
     
    </div>
  );
};

export default Home;
