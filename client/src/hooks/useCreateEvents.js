
import { Cookies } from 'react-cookie';

export async function useCreateEvents(eventData) {
    const cookies = new Cookies();
    const user = cookies.get('user');

    try {
        console.log(user)
        console.log(user.password)
        const apiUrl = process.env.REACT_APP_BACKEND_API + '/api/create_event?user=' + user.id + "&pwd=" + user.password;
        // POST /api/create_event?user=user_id&pwd=password

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        });
        console.log(response)


        if (!response.ok) { 
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

    } catch (err) {
        console.log("Could not fetch events", err); 
        throw err;
    }


};
