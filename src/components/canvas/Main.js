import useBgStore from '@/state/useBgStore'
import React, { useState } from 'react'
import Intro from './Intro'
import Splash from './Splash'

const Main = () => {
  const [introAnimationComplete, setIntroAnimationComplete] = useState(false)
  const [color, setColor] = useState('#F25E7A')
  const setBg = useBgStore((s) => s.setBg)

  return (
    <>
      {introAnimationComplete ? (
        <Splash color={color} />
      ) : (
        <Intro
          onAnimationComplete={(color) => {
            setIntroAnimationComplete(true)
            setColor(color)
            setBg(color)
          }}
        />
      )}
    </>
  )
}

export default Main
