import React, { useState, useEffect} from 'react';
import { useUser } from '../hooks/useUser';
import { Cookies } from 'react-cookie';


export function Profile() {
    const { userData, error } = useUser();
    const [newUserData, setNewUserData] = useState(userData || { name: '', description: '', password: '' });

    const cookies = new Cookies(); 
    const user = cookies.get('user');

    useEffect(() => {
        if (userData) {
            setNewUserData({
                name: userData.name || '',
                description: userData.description || '',
                password: '' // Password is left empty for security
            });
        }
    }, [userData]);

    if (error) {
        return <div>Error fetching Profile: {error.message}</div>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUserData((prevData) => ({
        ...prevData,
        [name]: value, // Dynamically set the state based on the input field name
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        console.log(newUserData)

        // if not set
        newUserData.name = newUserData.name !== '' ? newUserData.name : userData.name;
        newUserData.description = newUserData.description !== '' ? newUserData.description : userData.description;
        newUserData.password = newUserData.password !== '' ? newUserData.password : userData.password;
        console.log(newUserData)

        try {
            const apiUrl = process.env.REACT_APP_BACKEND_API + '/api/edit_user/' + user.id;
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUserData),
            });


            if (response.ok) {
                setCookie('user', JSON.stringify(newUserData), { path: '/', maxAge: 3600 });
                alert('Profile set successful!');
            } else {
                alert('failed to set profile');
            }
        } catch (error) {
            console.error('Error', error);
        }
    };


    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <form className="space-y-6" onSubmit={handleSave}>
            <div>
            <label className="block text-gray-700 font-bold mb-2">Name:</label>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={newUserData.name || ""} 
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                onChange={handleChange}
            />
            </div>

            <div>
            <label className="block text-gray-700 font-bold mb-2">Description:</label>
            <textarea
                name="description" 
                placeholder="Description"
                value={newUserData.description || ""}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-y"
                onChange={handleChange}
            />
            </div>

            <div>
            <label className="block text-gray-700 font-bold mb-2">Password:</label>
            <input
                type="password"
                name="password" 
                placeholder="Password"
                value={newUserData.password || ""}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                onChange={handleChange}
            />
            </div>

            <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
            Save
            </button>
        </form>
        </div>
    );
}
