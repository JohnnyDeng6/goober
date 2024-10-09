import React, { useState, useEffect} from 'react';
import { useInvitations } from '../hooks/useInvitations';
import { Cookies } from 'react-cookie';
import { handleCancelEvent } from '../hooks/handleAcceptReject';

export function Schedule() {
    const { invitations, error } = useInvitations();
    const [invitationsList, setInvitationsList] = useState([]);
    const cookies = new Cookies(); 
    const user = cookies.get('user');

    
    useEffect(() => {
        setInvitationsList(invitations);
    }, [invitations]);

    if (invitationsList.filter(invitation => invitation.confirmed).length === 0) {
        return <div>You have nothing Scheduled, host an event!</div>
    }

    if (error) {
        return <div>Error fetching events: {error.message}</div>;
    }

    // console.log(events)
    // console.log(invitations)
    // console.log(confirmedInvitations)

    return (
            <div className="space-y-4 p-4 mt-16 mb-16">
            {invitationsList.filter(invitation => invitation.confirmed).map((invitation) => (
                <div
                key={invitation.event_id}
                className="bg-white shadow-md rounded-lg p-5 border border-gray-250"
                >
                    <h1 className="text-center font-bold">
                        {invitation.host_id == user.id ? 'Hosting' : 'Attending'}
                        </h1>
                <div className="flex justify-between mb-2">
                    <span className="font-semibold">Event ID:</span>
                    <span>{invitation.event_id}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="font-semibold">Description:</span>
                    <span>{invitation.description}</span>
                </div>
                <div className="flex justify-between mb-4">
                    <span className="font-semibold mx-1">Date:</span>
                    <span>{invitation.time}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="font-semibold">Attendees:</span>
                    <span>{invitation.attendees_found}/{invitation.attendees}</span>
                </div>
                <div className="flex space-x-2">
                    <button
                    className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    onClick={() => handleCancel(invitation.event_id)}
                    >
                    Cancel
                    </button>
                </div>
                </div>
            ))}
            </div>
      );
      
    async function handleCancel(event_id) {
        setInvitationsList(prevInvitations => 
            prevInvitations.filter(invitation => invitation.event_id !== event_id)
        );

        
        console.log(`cancelled event ID: ${event_id}`);
        await handleCancelEvent(event_id);

    }

}

