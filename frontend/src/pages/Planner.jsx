import React from 'react'

function Planner() {
  return (
    <div className="grid grid-cols-2 h-screen w-screen">
      <div className="flex items-center justify-center bg-blue-100">
        <div>Left Block - Hello</div>
      </div>
      <div className="flex items-center justify-center bg-green-100">
        <div>Right Block - Planner</div>
      </div>
    </div>
  )
}

export default Planner
