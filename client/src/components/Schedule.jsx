import React from 'react';
import { useInvitations } from '../hooks/useInvitations';
import { useEvents } from '../hooks/useEvents';

export function Schedule() {
    const { invitations, error } = useInvitations();
    const { events } = useEvents();

    const confirmedInvitations = invitations.filter(invitation => invitation.confirmed === true);


    if (error) {
        return <div>Error fetching events: {error.message}</div>;
    }

    console.log(events)
    console.log(invitations)
    console.log(confirmedInvitations)

    return (
            <div className="space-y-4 p-4 mt-16 mb-16">
            {confirmedInvitations.map((invitation) => (
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
                    className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    onClick={() => handleCancel(invitation.event_id)}
                    >
                    Cancel
                    </button>
                </div>
                </div>
            ))}
            {events.map((event) => (
                <div
                key={event.event_id}
                className="bg-white shadow-md rounded-lg p-5 border border-gray-250"
                >
                <div className="flex justify-between mb-2">
                    <span className="font-semibold">Event ID:</span>
                    <span>{event.id}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="font-semibold">Description:</span>
                    <span>{event.description}</span>
                </div>
                <div className="flex justify-between mb-4">
                    <span className="font-semibold mx-1">Date:</span>
                    <span>{event.time}</span>
                </div>
                <div className="flex justify-between mb-4">
                    <span className="font-semibold mx-1">Attendees:</span>
                    <span>{event.attendees}</span>
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
      

    function handleCancel(event_id) {
        console.log(`Accepted invitation with ID: ${event_id}`);
        // remove from invitations where event_id = event_id, events(attendees_found)--
    }
}

