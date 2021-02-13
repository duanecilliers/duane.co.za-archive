import create from 'zustand'

const useBgStore = create((set) => {
  return {
    bg: '#000',
    setBg: (bg) => set({ bg }),
  }
})

export default useBgStore
