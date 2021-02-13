import create from 'zustand'

const useBgStore = create((set) => {
  return {
    bg: '#1d1d1d',
    setBg: (bg) => set({ bg }),
  }
})

export default useBgStore
