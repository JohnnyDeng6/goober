import React from 'react';
import { useInvitations } from '../hooks/useInvitations';

export function Invitations() {
    const { invitations, error } = useInvitations();

    if (error) {
        return <div>Error fetching invitations: {error.message}</div>;
    }

    return (
        <div className="space-y-4 p-4">
          {invitations.map((invitation) => (
            <div
              key={invitation.event_id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
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
                <span className="font-semibold">Event ID:</span>
                <span>{invitation.event_id}</span>
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
        // Optionally navigate or update state after accepting
    }

    function handleReject(event_id) {
        // Logic to reject the invitation
        console.log(`Rejected invitation with ID: ${event_id}`);
        // Optionally navigate or update state after rejecting
    }
}
