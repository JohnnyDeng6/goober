import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  Home,
  Register,
  Login,
  CreateEvent,
  Invitations,
  Schedule,
  Profile,
} from './pages/index.js'

export function Main() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/invitations" element={<Invitations />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}
