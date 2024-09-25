// src/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate= useNavigate()
  const handleSignup = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:4000/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (data.success) {
      alert("User registered successfully");
      // Redirect or perform additional actions
      navigate('/')
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl mb-4">Create Account</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="block w-full mb-4 p-2 border" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full mb-4 p-2 border" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full mb-4 p-2 border" />
        <button type="submit" className="bg-blue-500 text-white w-full py-2">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
