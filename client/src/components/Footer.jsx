import React from 'react'
import { useNavigate } from 'react-router-dom'

export function Footer({ handleClick }) {

  return (
    <div className="fixed bottom-0 w-full bg-slate-300">
      <div className="flex justify-around items-center p-2">
        <button
          className="text-center text-lg font-bold p-2 hover:bg-slate-400 rounded"
          onClick={handleClick}
        >
          Invitations
        </button>
        <button
          className="text-center text-lg font-bold p-2 hover:bg-slate-400 rounded"
          onClick={handleClick}
        >
          Event
        </button>
        <button
          className="text-center text-lg font-bold p-2 hover:bg-slate-400 rounded"
          onClick={handleClick}
        >
          Schedule
        </button>
        <button
          className="text-center text-lg font-bold p-2 hover:bg-slate-400 rounded"
          onClick={handleClick}
        >
          Profile
        </button>
      </div>
    </div>
  )
}
