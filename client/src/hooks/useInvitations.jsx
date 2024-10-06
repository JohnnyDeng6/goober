
//fetch invitations api, gets in list
//send to initations.jsx


import { useState, useEffect } from 'react';
// import { Cookies } from 'react-cookies';

const useInvitations = () => {
    // const cookies = new Cookies();
    // const userId = cookies.get('userid');
    
    const [invitations, setInvitations] = useState([]); // State to hold the invitations
    const [error, setError] = useState(null); // State to hold any error messages

    useEffect(() => {
        const fetchInvitations = async () => { // Renamed the inner function to avoid naming conflicts
            try {
                const response = await fetch(`http://localhost:8000/api/get_invitations/bicwang`, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                });


                if (!response.ok) { // Check if the response is OK (status in the range 200-299)
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json(); // Parse the response data
                setInvitations(data); // Update the state with the invitations

            } catch (err) {
                console.log("Could not fetch invitations", err); // Log the error
                setError(err); // Set the error state
            }
        };

        fetchInvitations(); // Call the fetch function
    }, []); // Empty dependency array to run this effect only once on mount

    return { invitations, error }; // Return invitations and error states
};

export default useInvitations;
