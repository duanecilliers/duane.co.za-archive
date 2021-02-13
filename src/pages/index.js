import useStore from '@/state/store'
import dynamic from 'next/dynamic'

const Main = dynamic(() => import('@/components/canvas/Main'), {
  ssr: false,
})

const Page = () => {
  useStore.setState({ title: 'Main' })
  return (
    <>
      <Main r3f />
    </>
  )
}

export default Page
