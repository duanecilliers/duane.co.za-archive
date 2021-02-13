import { Suspense, useEffect, useMemo, useState } from 'react'
import { Environment, Sphere } from '@react-three/drei'
import useStore from '@/helpers/store'
import { Physics, useBox, usePlane } from '@react-three/cannon'
import create from 'zustand'
import { useFrame } from 'react-three-fiber'

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

const PhysicsSphere = ({ router, ...props }) => {
  const colors = useMemo(
    () => ['#F25E7A', '#7C3F8C', '#AD6BBF', '#F2CB05', '#F2695C'],
    []
  )
  const [color, setColor] = useState(colors[0])
  const collissions = useCollissionStore((state) => state.collissions)
  const increment = useCollissionStore((state) => state.increment)

  useEffect(() => {
    const randomColor = Math.floor(Math.random() * colors.length)
    setColor(colors[randomColor])
  }, [collissions, colors])

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
    if (ref.current.position.z > 4) {
      router.push('box')
    }
  })

  return (
    <Sphere
      ref={ref}
      args={[1, 32, 32]}
      onClick={() => {
        router.push(`/box`)
      }}
    >
      <meshToonMaterial color={color} />
    </Sphere>
  )
}

const SphereComponent = () => {
  const router = useStore((s) => s.router)
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
        <PhysicsSphere router={router} />
        <Plane />
      </Physics>
      <Environment preset={'studio'} />
    </Suspense>
  )
}

export default SphereComponent
