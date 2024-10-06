import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Header, Footer } from '../components/index.js';

export function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['user']);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || !password) {
      alert('Please fill in all the fields');
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_BACKEND_API + '/api/login';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: id, password }), 
      });

      if (response.ok) {
        const result = await response.json();
        setCookie('user', JSON.stringify({ id }), { path: '/', maxAge: 3600 });

        alert('Login successful!');
        window.location.href = '/profile'; 
      } else {
        const result = await response.json();
        alert('Login failed: ' + result.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10">
        <Header />
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="p-6 max-w-md w-full bg-white shadow-md rounded-lg">
          <h2 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4">
            Login
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">ID:</label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
