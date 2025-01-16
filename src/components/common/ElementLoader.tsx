import React from 'react'

const ElementLoader = ({ color = 'primary', size = 8 }: { color?: 'primary' | 'white' , size?: number }) => {
  return (
    <div className="flex w-full h-full items-center justify-center relative">
      <div className={`w-${size} h-${size} border-4 border-t-transparent rounded-full animate-spin ${color === 'primary' ? 'border-primary' : 'border-white'}`}></div>
    </div>
  )
}

export default ElementLoader