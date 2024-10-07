import React, { useState } from 'react';
import { Header, Footer, Invitations, Schedule, Event, Profile} from '../components/index.js'

export function Home() {

  const [clickedText, setClickedText] = useState("");

  const handleClick = (event) => {
    const buttonText = event.target.innerText;
    setClickedText(buttonText);
    console.log(buttonText)
  }; 

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10">
        <Header />
      </header>

      <main className="flex-grow flex items-center justify-center">
        <span className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold p-4">

          <div className={`${clickedText === "Invitations" ? "" : "hidden"}`}>
            <Invitations />
          </div>
          <div className={`${clickedText === "Schedule" ? "" : "hidden"}`}>
            <Schedule />
          </div>
          <div className={`${clickedText === "Event" ? "" : "hidden"}`}>
            <Event />
          </div>
          <div className={`${clickedText === "Profile" ? "" : "hidden"}`}>
            <Profile />
          </div>
        </span>
      </main>

      <footer className="mt-auto">
        <Footer handleClick={handleClick}/>
      </footer>
    </div>
  )
}
