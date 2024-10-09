import { useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';

export function useUser() {
    const cookies = new Cookies();
    const user = cookies.get('user');
    
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const apiUrl = process.env.REACT_APP_BACKEND_API + '/api/get_userdata/' + user.id;
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                });
                console.log(response)


                if (!response.ok) { 
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("calling");
                setUserData(data); 

            } catch (err) {
                console.log("Could not fetch user", err);
                setError(err.message);
            }
        };

        fetchUser (); 
    }, []);

    return { userData, error };
};
