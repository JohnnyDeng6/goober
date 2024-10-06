import React from 'react'
import { useNavigate } from 'react-router-dom'

export function Footer() {
  const navigate = useNavigate()

  return (
    <div className="fixed bottom-0 w-full bg-slate-300">
      <div className="flex justify-around items-center p-2">
        <button
          className="text-center text-lg font-bold p-2 hover:bg-slate-400 rounded"
          onClick={() => navigate('/register')}
        >
          Register
        </button>
        <button
          className="text-center text-lg font-bold p-2 hover:bg-slate-400 rounded"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        <button
          className="text-center text-lg font-bold p-2 hover:bg-slate-400 rounded"
          onClick={() => navigate('/invitations')}
        >
          Invitations
        </button>
        <button
          className="text-center text-lg font-bold p-2 hover:bg-slate-400 rounded"
          onClick={() => navigate('/create-event')}
        >
          Create Event
        </button>
        <button
          className="text-center text-lg font-bold p-2 hover:bg-slate-400 rounded"
          onClick={() => navigate('/schedule')}
        >
          Schedule
        </button>
        <button
          className="text-center text-lg font-bold p-2 hover:bg-slate-400 rounded"
          onClick={() => navigate('/profile')}
        >
          Profile
        </button>
      </div>
    </div>
  )
}