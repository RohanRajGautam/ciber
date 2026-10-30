// store/index.js
import create from 'zustand'

const useStore = create((set) => ({
	template: [],
	setTemplate: (template) =>
		set((state) => ({ template: [...state.template, template] })),
	clearTemplate: () => set((state) => ({ template: [] })),
}))

export default useStore
