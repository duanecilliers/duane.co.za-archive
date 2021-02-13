import { Environment, OrbitControls, Sphere } from '@react-three/drei'
import { range } from 'ramda'
import React, { useRef } from 'react'
import { Suspense } from 'react-is'
import { useFrame } from 'react-three-fiber'

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
  const objectsRef = useRef()

  // useFrame((time) => {
  //   objectsRef.rotation.x = objectsRef.rotation.x * time
  // })

  const randomPoint = () => (Math.random() - 0.5) * 5

  const Objects = () =>
    range(0, 20)
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
      <Objects />
      <group ref={objectsRef}>
        <Environment preset={'studio'} />
      </group>
      <OrbitControls />
    </Suspense>
  )
}

export default Splash
