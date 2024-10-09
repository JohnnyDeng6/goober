import React, { useState, useEffect } from 'react';
import { useInvitations } from '../hooks/useInvitations';
import { handleAcceptInvitation, handleRejectInvitaion } from '../hooks/handleAcceptReject';

export function Invitations() {
    const { invitations, error } = useInvitations();
    const [invitationsList, setInvitationsList] = useState([]);

    useEffect(() => {
        setInvitationsList(invitations); // Set initial state when invitations are fetched
    }, [invitations]);

    if (error) {
        return <div>Error fetching invitations: {error.message}</div>;
    }

    if (invitationsList.filter(invitation => !invitation.confirmed).length === 0) {
        return <div>Currently no Invitations, check again later</div>
    }

    return (
        <div className="space-y-4 p-4 mt-16 mb-16 w-full">
          {invitationsList.filter(invitation => !invitation.confirmed).map((invitation) => (
            <div
              key={invitation.event_id}
              className="bg-white shadow-md rounded-lg p-5 border border-gray-250 w-full"
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Event ID:</span>
                <span>{invitation.event_id}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Description:</span>
                <span>{invitation.description}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Date:</span>
                <span>{invitation.time}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Attendees:</span>
                <span>{invitation.attendees_found}/{invitation.attendees}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Confirmed:</span>
                <span>{invitation.confirmed ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="font-semibold mx-1">Expires:</span>
                <span>{invitation.expires}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                  onClick={() => handleAccept(invitation.event_id)}
                >
                  Accept
                </button>
                <button
                  className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  onClick={() => handleReject(invitation.event_id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      );

    async function handleAccept(event_id) {
        setInvitationsList(prevInvitations => 
            prevInvitations.filter(invitation => invitation.event_id !== event_id)
        );
        console.log(`Accepted invitation with ID: ${event_id}`);
        await handleAcceptInvitation(event_id);

        // Update state to remove the accepted invitation
        console.log("chnaging state")
    }

    async function handleReject(event_id) {
        setInvitationsList(prevInvitations => 
            prevInvitations.filter(invitation => invitation.event_id !== event_id)
        );
        console.log(`Rejected invitation with ID: ${event_id}`);
        await handleRejectInvitaion(event_id);
        console.log("chnaging state")

        // Update state to remove the rejected invitation
    }
}

