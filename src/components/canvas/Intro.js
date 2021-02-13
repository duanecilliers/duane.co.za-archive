import { Suspense, useEffect, useState } from 'react'
import { Environment, Sphere } from '@react-three/drei'
import { Physics, useBox, usePlane } from '@react-three/cannon'
import create from 'zustand'
import { useFrame } from 'react-three-fiber'
import useBgStore from '@/state/useBgStore'
import { colors } from '@/constants'

const useCollissionStore = create((set) => ({
  collissions: 0,
  increment: () => set((state) => ({ collissions: state.collissions + 1 })),
}))

const Plane = (props) => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2.03, 0, 0],
    ...props,
  }))
  return (
    <mesh ref={ref} position={[0, 20, 0]} visible={false}>
      <planeBufferGeometry attach='geometry' args={[100, 100]} />
    </mesh>
  )
}

const PhysicsSphere = ({ onAnimationComplete, ...props }) => {
  const [colorIndex, setColorIndex] = useState(0)
  const collissions = useCollissionStore((state) => state.collissions)
  const increment = useCollissionStore((state) => state.increment)
  const setBg = useBgStore((s) => s.setBg)

  useEffect(() => {
    // const randomColor = Math.floor(Math.random() * colors.length)
    const nextColorIndex = colorIndex > colors.length ? 0 : colorIndex + 1
    setColorIndex(nextColorIndex)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collissions])

  const [ref] = useBox(() => ({
    mass: 10,
    position: [0, 5, 0],
    velocity: [0, 3, 0],
    onCollide: () => {
      increment()
    },
    ...props,
  }))

  useFrame(() => {
    if (ref.current.position.z > 3.8) {
      onAnimationComplete(colors[colorIndex])
    }
  })

  return (
    <Sphere ref={ref} args={[1, 32, 32]}>
      <meshToonMaterial color={colors[colorIndex]} />
    </Sphere>
  )
}

const Intro = ({ onAnimationComplete }) => {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} />
      <Physics
        iterations={20}
        tolerance={0.0001}
        defaultContactMaterial={{
          friction: 0,
          restitution: 0.5,
          contactEquationStiffness: 1e7,
          contactEquationRelaxation: 1,
          frictionEquationStiffness: 1e7,
          frictionEquationRelaxation: 2,
        }}
      >
        <PhysicsSphere onAnimationComplete={onAnimationComplete} />
        <Plane />
      </Physics>
      <Environment preset={'studio'} />
    </Suspense>
  )
}

export default Intro
