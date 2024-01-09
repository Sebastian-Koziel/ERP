import useCanvas from './useCanvas'

const Canvas = (props:any) => {  
  
  const { draw, onClick, onMouseMove, onMouseUp, onKeyUp, onKeyDown, ...rest } = props
  const ref = useCanvas(draw, onClick, onMouseMove, onMouseUp, onKeyUp, onKeyDown, )
  
  return <canvas ref={ref} {...rest}/>
}

export default Canvas