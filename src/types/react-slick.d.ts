declare module 'react-slick' {
  import type { ComponentType, ReactNode } from 'react'
  const Slider: ComponentType<{
    children?: ReactNode
    dots?: boolean
    infinite?: boolean
    key?: string | number
    initialSlide?: number
    afterChange?: (index: number) => void
    [key: string]: unknown
  }>
  export default Slider
}
