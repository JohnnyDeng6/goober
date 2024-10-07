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


                if (!response.ok) { // Check if the response is OK (status in the range 200-299)
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);
                setUserData(data); 

            } catch (err) {
                console.log("Could not fetch user", err);
                setError(err.message);
            }
        };

        fetchUser (); // Call the fetch function
    }, []);

    return { userData, error };
};
