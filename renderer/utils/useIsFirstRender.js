import { useRef } from 'react'

export default function useIsFirstRender() {
  // Assume first render by default
  const isFirstRender = useRef(true)

  if (isFirstRender.current) {
    // On first render, set isFirstRender flag to false
    // so that future renders know we've already rendered
    isFirstRender.current = false

    return true
  }

  return isFirstRender.current
}