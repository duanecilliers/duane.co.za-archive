import { Canvas } from 'react-three-fiber'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import useStore from '@/state/store'
import { Preload } from '@react-three/drei'
import { a } from '@react-spring/three'
import { EffectComposer, Vignette } from '@react-three/postprocessing'
import useBgStore from '@/state/useBgStore'
// enable shader editor
// import { MaterialEditor, useEditorComposer } from '@three-material-editor/react'

const Bg = () => {
  const bg = useBgStore((state) => state.bg)
  const color = new THREE.Color(bg)
  return <color attach='background' r={color.r} g={color.g} b={color.b} />
}

const LCanvas = ({ children }) => {
  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
      }}
      onCreated={({ events }) => {
        useStore.setState({ events })
      }}
    >
      <Preload all />
      <Bg />
      <Perf openByDefault trackGPU={true} position={'bottom-right'} />
      {/* <MaterialEditor /> */}
      {/* <EffectComposer ref={useEditorComposer()}> */}
      <EffectComposer>
        <Vignette eskil={false} offset={0.1} darkness={0.4} />
      </EffectComposer>
      {children}
    </Canvas>
  )
}

export default LCanvas
