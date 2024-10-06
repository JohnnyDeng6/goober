import React, { useState } from 'react'
import { Header, Footer } from '../components/index.js'
import { mockUser } from './mockData.js'

export function Profile() {
  const [userData, setUserData] = useState(mockUser)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSave = () => {
    console.log('Saving user data...', userData)
    // make API call
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10">
        <Header />
      </header>

      <main className="flex-grow flex items-center justify-center">
        <p className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold p-4">
          PROFILE
        </p>
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  )
}
