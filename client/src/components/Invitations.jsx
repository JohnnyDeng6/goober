import React from 'react';
import { useInvitations } from '../hooks/useInvitations';

export function Invitations() {
    const { invitations, error } = useInvitations();

    if (error) {
        return <div>Error fetching invitations: {error.message}</div>;
    }

    return (
        <div className="space-y-4 p-4 mt-16 mb-16">
          {invitations.map((invitation) => (
            <div
              key={invitation.event_id}
              className="bg-white shadow-md rounded-lg p-5 border border-gray-250"
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Event ID:</span>
                <span>{invitation.event_id}</span>
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
                  onClick={() => handleAccept(invitation.id)}
                >
                  Accept
                </button>
                <button
                  className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  onClick={() => handleReject(invitation.id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      );
      

    function handleAccept(event_id) {
        // Logic to accept the invitation
        console.log(`Accepted invitation with ID: ${event_id}`);
        // if accepted, make post to attendees table
        // remove from invitation list
    }

    function handleReject(event_id) {
        // Logic to reject the invitation
        console.log(`Rejected invitation with ID: ${event_id}`);
        // remove from invitation list
    }
}
