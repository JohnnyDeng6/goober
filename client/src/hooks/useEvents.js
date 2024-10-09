
import { useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';

//gets events
export function useEvents() {
    const cookies = new Cookies();
    const user = cookies.get('user');
    
    const [events, setEvents] = useState([]); 
    const [error, setError] = useState(null); // State to hold any error messages

    useEffect(() => {
        const fetchEvents = async () => { // Renamed the inner function to avoid naming conflicts
            try {
                const apiUrl = process.env.REACT_APP_BACKEND_API + '/api/get_events/' + user.id;
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

                const data = await response.json(); // Parse the response data
                console.log(data);
                setEvents(data); 

            } catch (err) {
                console.log("Could not fetch events", err); // Log the error
                setError(err.message);
            }
        };

        fetchEvents(); // Call the fetch function
    }, []); // Empty dependency array to run this effect only once on mount

    return { events, error }; 
};
