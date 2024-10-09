// import exp from 'constants';
import { useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';

export function useInvitations() {
    const cookies = new Cookies();
    const user = cookies.get('user');
    
    const [invitations, setInvitations] = useState([]); 
    const [error, setError] = useState(null); 
// app.get('/api/get_eventById/:event_id', async (req, res) => {

    useEffect(() => {
        const fetchInvitations = async () => {
            try {
                const apiUrl = process.env.REACT_APP_BACKEND_API + '/api/get_invitations/' + user.id;
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
                console.log(data);
                setInvitations(data); 

            } catch (err) {
                console.log("Could not fetch invitations", err);
                setError(err.message);
            }
        };

        fetchInvitations(); 
    }, []); 

    return { invitations, error };
};
