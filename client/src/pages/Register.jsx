import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Header, Footer } from '../components/index.js';

export function Register() {
  // State variables for user inputs
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['user']);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!id || !name || !description || !password) {
      alert('Please fill in all the fields');
      return;
    }

    const userData = {
      id,
      name,
      description,
      password,
    };

    try {
      const apiUrl = process.env.REACT_APP_BACKEND_API + '/api/register';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });


      if (response.ok) {
        const result = await response.json();
        setCookie('user', JSON.stringify(userData), { path: '/', maxAge: 3600 });

        setId('');
        setName('');
        setDescription('');
        setPassword('');
        alert('Registration successful!');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error);
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
            Register
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
              <label className="block text-gray-700">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              ></textarea>
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
              Register
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
