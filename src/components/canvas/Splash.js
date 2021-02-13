import { Environment, Sphere } from '@react-three/drei'
import React from 'react'
import { Suspense } from 'react-is'

const Splash = ({ color }) => {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} />
      {/* <textBufferGeometry>Testing</textBufferGeometry> */}
      <Sphere args={[1, 32, 32]}>
        <meshToonMaterial color={color} />
      </Sphere>
      <Environment preset={'studio'} />
    </Suspense>
  )
}

export default Splash
