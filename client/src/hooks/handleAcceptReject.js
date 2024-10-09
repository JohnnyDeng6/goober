import { Cookies } from 'react-cookie';

export async function handleAcceptInvitation(eventId) {
    const cookies = new Cookies();
    const user = cookies.get('user');
    
    try {
        const apiUrl = process.env.REACT_APP_BACKEND_API + '/api/accept_invitation?user=' + user.id + "&pwd=" + user.password + "&event=" + eventId;
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        console.log(response)

        if (!response.ok) { 
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

    } catch (err) {
        console.log("Failed to accept invitation", err); // Log the error
    }
};

export async function handleRejectInvitaion(eventId) {
    const cookies = new Cookies();
    const user = cookies.get('user');
    
    try {
        const apiUrl = process.env.REACT_APP_BACKEND_API + '/api/reject_invitation?user=' + user.id + "&pwd=" + user.password + "&event=" + eventId;
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        console.log(response)

        if (!response.ok) { 
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

    } catch (err) {
        console.log("Failed to reject invitation", err); // Log the error
    }


};
export async function handleCancelEvent(eventId) {
    const cookies = new Cookies();
    const user = cookies.get('user');
    
    try {
        const apiUrl = process.env.REACT_APP_BACKEND_API + '/api/cancel_event?user=' + user.id + "&pwd=" + user.password + "&event=" + eventId;
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        console.log(response)

        if (!response.ok) { 
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

    } catch (err) {
        console.log("Failed to cancel event", err); // Log the error
    }


};