import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'

const Box = dynamic(() => import('@/components/canvas/Box'), {
  ssr: false,
})

const Page = () => {
  useStore.setState({ title: 'Box' })
  return (
    <>
      <Box r3f />
    </>
  )
}

export default Page
