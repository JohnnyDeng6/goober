import React from 'react'
import { useNavigate } from 'react-router-dom'

export function Header() {
  const navigate = useNavigate()

  return (
<div className="fixed top-0 w-full flex items-center justify-center bg-slate-200 font-bold p-3">
  <button className="p-3 text-xl" onClick={() => navigate('/home')}>Goober</button>
  
  <div className="absolute right-0 flex space-x-4 mx-4">
    {/* <button
      className="p-3 hover:bg-slate-400 rounded"
      onClick={() => navigate('/register')}
    >
      Register
    </button>
    <button
      className="p-3 hover:bg-slate-400 rounded"
      onClick={() => navigate('/login')}
    >
      Login
    </button> */}
  </div>
</div>



  )
}
