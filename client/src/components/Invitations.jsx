import React from 'react';
import { useNavigate } from 'react-router-dom';
import useInvitations from '../hooks/useInvitations';

export function Invitations() {
    const navigate = useNavigate();
    const { invitations, error } = useInvitations();

    if (error) {
        return <div>Error fetching invitations: {error.message}</div>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Event ID</th>
                    <th>Confirmed</th>
                    <th>Expires</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {invitations.map(invitation => (
                    <tr key={invitation.id}>
                        <td>{invitation.id}</td>
                        <td>{invitation.event_id}</td>
                        <td>{invitation.confirmed ? 'Yes' : 'No'}</td>
                        <td>{invitation.expires}</td>
                        <td>
                            <button onClick={() => handleAccept(invitation.id)}>Accept</button>
                            <button onClick={() => handleReject(invitation.id)}>Reject</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    // Functions to handle accept/reject actions
    function handleAccept(id) {
        // Logic to accept the invitation
        console.log(`Accepted invitation with ID: ${id}`);
        // Optionally navigate or update state after accepting
    }

    function handleReject(id) {
        // Logic to reject the invitation
        console.log(`Rejected invitation with ID: ${id}`);
        // Optionally navigate or update state after rejecting
    }
}
