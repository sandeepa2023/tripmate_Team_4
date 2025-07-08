import React from 'react'
import Left from '../components/planner/Left'
import Right from '../components/planner/Right'

function Planner() {
  return (
    <div className="grid grid-cols-2 h-screen w-screen">
      <div className="flex items-center justify-center bg-blue-100">
        <Left />
      </div>
      <div className="flex items-center justify-center bg-green-100">
        <Right />
      </div>
    </div>
  )
}

export default Planner
