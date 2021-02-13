import { Environment, Sphere } from '@react-three/drei'
import React from 'react'
import { Suspense } from 'react-is'

const PlaceHolderMesh = ({ position = [0, 1, 0] }) => {
  return (
    <mesh position={position}>
      <meshNormalMaterial attach='material' />
    </mesh>
  )
}

const Splash = ({ color }) => {
  console.log('color', color)
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} />
      {/* <textBufferGeometry>Testing</textBufferGeometry> */}
      <Sphere args={[1, 32, 32]}>
        <meshToonMaterial color={color} />
      </Sphere>
      <PlaceHolderMesh />
      <Environment preset={'studio'} />
    </Suspense>
  )
}

export default Splash
