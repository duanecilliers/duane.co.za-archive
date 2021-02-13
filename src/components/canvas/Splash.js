import { Center, Environment, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { range } from 'ramda'
import React, { useRef } from 'react'
import { Suspense } from 'react-is'
import { useFrame } from 'react-three-fiber'
import { a } from 'react-spring/three'
import Domine from '../../../public/fonts/Domine_Bold.json'
import Roboto from '../../../public/fonts/Roboto_Regular.json'

const fontLoader = new THREE.FontLoader()

const ObjectMesh = ({
  args = [Math.random() * 0.1, 32, 32],
  position = [-0.5, 0, 0.5],
  color,
}) => {
  return (
    <Sphere args={args} position={position}>
      <meshToonMaterial attach='material' color={color} />
    </Sphere>
  )
}

const Heading = () => {
  const font = fontLoader.parse(Domine)

  const textOpts = {
    font: font,
    size: 0.5,
    height: 0.1,
  }

  return (
    <mesh>
      <textGeometry attach='geometry' args={['Duane Cilliers', textOpts]} />
      <meshStandardMaterial attach='material' />
    </mesh>
  )
}

const SubHeading = () => {
  const font = fontLoader.parse(Roboto)

  const textOpts = {
    font: font,
    size: 0.15,
    height: 0.03,
  }

  return (
    <mesh>
      <textGeometry
        attach='geometry'
        args={['Front-end developer & aspiring creative developer', textOpts]}
      />
      <meshStandardMaterial attach='material' />
    </mesh>
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
    range(0, 150)
      .map(() => ({
        position: [randomPoint(), randomPoint(), randomPoint()],
      }))
      .map((obj, i) => (
        <ObjectMesh key={i} position={obj.position} color={color} />
      ))

  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} />
      {/* <textBufferGeometry>Testing</textBufferGeometry> */}
      <Center position={[0, 0.25, 0]}>
        <Heading />
      </Center>
      <Center position={[0, -0.25, 0]}>
        <SubHeading />
      </Center>
      <a.group ref={group}>
        <Objects />
      </a.group>
      <Environment preset={'studio'} />
    </Suspense>
  )
}

export default Splash
