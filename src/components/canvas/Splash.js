import {
  Center,
  Environment,
  OrbitControls,
  Sphere,
  Stars,
} from '@react-three/drei'
import * as THREE from 'three'
import { range } from 'ramda'
import React, { useRef, useState } from 'react'
import { Suspense } from 'react-is'
import { useFrame } from 'react-three-fiber'
import { a, useSpring } from 'react-spring/three'
import Domine from '../../../public/fonts/Domine_Bold.json'
import Roboto from '../../../public/fonts/Roboto_Regular.json'
import { colors } from '@/constants'

const fontLoader = new THREE.FontLoader()

const randomColor = () => colors[Math.floor(Math.random() * colors.length)]

const ObjectMesh = ({ args, position = [-0.5, 0, 0.5], ...props }) => {
  const [color, setColor] = useState(props.color)

  return (
    <Sphere
      args={args}
      position={position}
      onPointerOver={() => {
        setColor(randomColor())
      }}
    >
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
        args={['Front-end engineer & creative developer hobbyist', textOpts]}
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
        <ObjectMesh
          key={i}
          args={[Math.random() * 0.1, 32, 32]}
          position={obj.position}
          color={randomColor()}
        />
      ))

  const groupSpring = useSpring({
    from: {
      scale: [0, 0, 0],
    },
    to: {
      scale: [1, 1, 1],
    },
  })

  return (
    <Suspense fallback={null}>
      <a.group {...groupSpring}>
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
      </a.group>
      <Stars factor={0.1} />
      <directionalLight position={[-1, 0, 1]} intensity={0.7} />
      <OrbitControls />
    </Suspense>
  )
}

export default Splash
