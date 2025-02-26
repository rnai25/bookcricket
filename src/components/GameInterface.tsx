'use client'

import { useState } from 'react'
import { FaTrophy } from 'react-icons/fa'

export default function GameInterface() {
  const [score, setScore] = useState({ india: 0, australia: 0 })
  const [currentOver, setCurrentOver] = useState(0)
  const [isIndiaBatting, setIsIndiaBatting] = useState(true)

  const playBall = () => {
    const runs = Math.floor(Math.random() * 7) // 0-6 runs
    if (isIndiaBatting) {
      setScore(prev => ({ ...prev, india: prev.india + runs }))
    } else {
      setScore(prev => ({ ...prev, australia: prev.australia + runs }))
    }
    setCurrentOver(prev => prev + 1)
    
    if (currentOver >= 5) {
      setIsIndiaBatting(false)
    }
  }

  return (
    <div className="p-4">
      <nav className="mb-8">
        <ul className="flex gap-4">
          <li>
            <button className="bg-emerald-800 text-white px-4 py-2 rounded">
              Play Game
            </button>
          </li>
          <li>
            <button className="text-white px-4 py-2">
              My Games
            </button>
          </li>
        </ul>
      </nav>

      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-2">
          <FaTrophy className="text-yellow-400 text-2xl" />
          <div>
            <h2 className="text-yellow-400 text-xl">India</h2>
            <p className="text-yellow-400 text-4xl">{score.india}/0</p>
            <p className="text-sm text-yellow-400">{currentOver/6} overs</p>
          </div>
        </div>

        <div className="text-right">
          <h2 className="text-white text-xl">Australia</h2>
          <p className="text-white text-4xl">{score.australia}/0</p>
          <p className="text-sm text-white">{currentOver/6} overs</p>
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-white mb-2">Match Progress</p>
        <div className="flex justify-center gap-2">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className={`w-3 h-3 rounded-full ${i < currentOver/6 ? 'bg-yellow-400' : 'bg-gray-600'}`}
            />
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={playBall}
          className="bg-yellow-400 text-emerald-900 px-8 py-3 rounded text-lg font-semibold hover:bg-yellow-300"
        >
          Play Ball
        </button>
      </div>
    </div>
  )
} 