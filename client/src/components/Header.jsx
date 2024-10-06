import React from 'react'
import { useNavigate } from 'react-router-dom'

export function Header() {
  const navigate = useNavigate()

  return (
    <div className="text-center text-lg bg-slate-200 p-4 font-bold">
      <button onClick={() => navigate('/')}>Goober</button>
    </div>
  )
}
