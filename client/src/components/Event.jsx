import { useEffect, useState } from 'react';
import { useCreateEvents  } from '../hooks/useCreateEvents';

export function Event() {
    
// (description, hostId, time, attendees, attendees_found) 
    const [eventData, setEventData] = useState({
        description: '',
        time: '',
        attendees: 0,
    });
    // const { error } = useCreateEvents();
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    // if (error) {
    //     return <div>Error creating event: {error.message}</div>;
    // }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(null);

        try {
            console.log(eventData)
            const response = await useCreateEvents(eventData);
            setSuccess(true);
            console.log('Event created successfully:', response);
            

        } catch (err) {
            setError('Failed to create event');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">

        <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Event created successfully!</p>}

            <div>
            <label className="block text-gray-700 font-bold mb-2">Description:</label>
            <textarea
                name="description" 
                placeholder="Description"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-y"
            />
            </div>

            <div>
            <label className="block text-gray-700 font-bold mb-2">Date:</label>
            <input
                type="date"
                name="time" 
                placeholder="date"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            </div>

            <div>
            <label className="block text-gray-700 font-bold mb-2">Attendees:</label>
            <input
                type="number"
                name="attendees" 
                placeholder="Number of attendees"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            </div>

            <button
                className="w-full font-bold py-2 px-4 rounded-lg transition duration-200 bg-blue-500 text-white hover:bg-blue-600"
                type="submit"
                disabled={isSubmitting}
                >
                {isSubmitting ? 'Creating...' : 'Create Event'}
            </button>
        </form>
        </div>
    );
};
