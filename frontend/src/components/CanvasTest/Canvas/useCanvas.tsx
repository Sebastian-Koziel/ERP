import { useRef, useEffect } from 'react'

const useCanvas = (
    draw: (context: CanvasRenderingContext2D, count: number) => void,
    onClick: (event: MouseEvent) => void,
    onMouseMove: (event: MouseEvent) => void,
    onMouseUp: (event: MouseEvent) => void,
    onKeyUp: (event: KeyboardEvent) => void,
    onKeyDown: (event: KeyboardEvent) => void
  ) => {
  
  const ref = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    const canvas = ref.current as HTMLCanvasElement;
    canvas.onmousedown = onClick;
    canvas.onmousemove = onMouseMove;
    canvas.onmouseup = onMouseUp;
    const context:CanvasRenderingContext2D | null = canvas.getContext('2d')
    if(!context){return}
    let count = 0
    let animationId: number
    
    const renderer = () => {
      count++
      draw(context, count)
      animationId = window.requestAnimationFrame(renderer)
    }
    renderer()
    
    return () => {
      window.cancelAnimationFrame(animationId)
    }
  }, [draw])
  
  return ref
}

export default useCanvas