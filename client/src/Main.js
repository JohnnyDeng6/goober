import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  Home,
  Register,
  Login,
} from './pages/index.js'

export function Main() {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}
