import useStore from '@/state/store'
import useBgStore from '@/state/useBgStore'
import dynamic from 'next/dynamic'
import { useEffectOnce } from 'react-use'

const Splash = dynamic(() => import('@/components/canvas/Splash'), {
  ssr: false,
})

const Page = () => {
  useStore.setState({ title: 'Splash Test' })
  const color = '#AD6BBF'
  const setBg = useBgStore((s) => s.setBg)

  useEffectOnce(() => {
    setBg(color)
  })

  return (
    <>
      <Splash r3f color={color} />
    </>
  )
}

export default Page
