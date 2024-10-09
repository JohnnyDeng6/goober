import React, { useState, useEffect} from 'react';
import { useUser } from '../hooks/useUser';
import { Cookies } from 'react-cookie';


export function Profile() {
    const { userData, error } = useUser();
    const [UserData, setUserData] = useState({});
    const [newUserData, setNewUserData] = useState({});
    const [saved, setSaved] = useState(true);

    const cookies = new Cookies(); 
    const user = cookies.get('user');
    // console.log(userData)

    useEffect(() => {
        if (userData) {
            setUserData({
                id: userData.id,
                name: userData.name,
                description: userData.description,
                password: userData.password
            });
        }
    }, [userData]);
    
    useEffect(() => {
        if (UserData) {
            setNewUserData({
                id: UserData.id,
                name: UserData.name || '',
                description: UserData.description || '',
                password: UserData.password || ''
            });
        }
    }, [UserData]);
    // console.log(UserData)
    // console.log(newUserData)

    useEffect(() => {
        setSaved(JSON.stringify(UserData) === JSON.stringify(newUserData) ? true : false)
        // console.log(saved)
    })

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
        setUserData({
            id: newUserData.id,
            name: newUserData.name,
            description: newUserData.description,
            password: newUserData.password
        });


        try {
            const apiUrl = process.env.REACT_APP_BACKEND_API + '/api/edit_user/' + user.id;
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUserData),
            });

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
                required
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
                required
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
                required
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                onChange={handleChange}
            />
            </div>

            <button
            type="submit"
            className={`w-full font-bold py-2 px-4 rounded-lg transition duration-200 ${
                saved ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            >
                {saved ? 'Saved' : 'Save'}
            </button>
        </form>
        </div>
    );
}
