import { Environment, OrbitControls, Sphere } from '@react-three/drei'
// import * as THREE from 'three'
import { range } from 'ramda'
import React, { useRef } from 'react'
import { Suspense } from 'react-is'
import { useFrame } from 'react-three-fiber'
import { a } from 'react-spring/three'

const PlaceHolderMesh = ({
  args = [0.1, 32, 32],
  position = [-0.5, 0, 0.5],
}) => {
  return (
    <Sphere args={args} position={position}>
      <meshBasicMaterial attach='material' />
    </Sphere>
  )
}

const Splash = ({ color }) => {
  const group = useRef()

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()
    const rotation = Math.PI * elapsedTime * 0.025
    group.current.rotation.x = rotation
    group.current.rotation.y = rotation
  })

  const randomPoint = () => (Math.random() - 0.5) * 10

  const Objects = () =>
    range(0, 100)
      .map(() => ({
        position: [randomPoint(), randomPoint(), randomPoint()],
      }))
      .map((obj, i) => <PlaceHolderMesh key={i} position={obj.position} />)

  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} />
      {/* <textBufferGeometry>Testing</textBufferGeometry> */}
      <Sphere args={[1, 32, 32]}>
        <meshToonMaterial color={color} />
      </Sphere>
      <a.group ref={group}>
        <Objects />
      </a.group>
      <Environment preset={'studio'} />
      <OrbitControls />
    </Suspense>
  )
}

export default Splash
