// import exp from 'constants';
import { useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';

export function useInvitations() {
    const cookies = new Cookies();
    const user = cookies.get('user');
    
    const [invitations, setInvitations] = useState([]); // State to hold the invitations
    const [error, setError] = useState(null); // State to hold any error messages

    useEffect(() => {
        const fetchInvitations = async () => { // Renamed the inner function to avoid naming conflicts
            try {
                const apiUrl = process.env.REACT_APP_BACKEND_API + '/api/get_invitations/' + user.id;
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

                const data = await response.json(); // Parse the response data
                console.log(data);
                setInvitations(data); // Update the state with the invitations

            } catch (err) {
                console.log("Could not fetch invitations", err); // Log the error
                setError(err.message);
            }
        };

        fetchInvitations(); // Call the fetch function
    }, []); // Empty dependency array to run this effect only once on mount

    return { invitations, error }; // Return invitations and error states
};
