import React from 'react'
import { Header, Footer } from '../components/index.js'

export function Schedule() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10">
        <Header />
      </header>

      <main className="flex-grow flex items-center justify-center">
        <p className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold p-4">
          SCHEDULE
        </p>
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  )
}