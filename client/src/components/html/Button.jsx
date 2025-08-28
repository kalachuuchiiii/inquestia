import { MoonLoader } from 'react-spinners';

const Button = ({loadingState = false, className = 'px-4 py-1 bg-neutral-100 rounded-lg text-zinc-900 w-20 h-10', onClick = () => {}, children = null, size = 20, disabled = false, type = 'button', color = "black"}) => {


return <button disabled = {disabled} onClick = {onClick} type = {type} className = {`${className} ${disabled ? ' opacity-50 ' : 'active:bg-zinc-900 active:text-neutral-100 transition-colors duration-200'} w-full flex text-center justify-center h-10 items-center overflow-y-hidden truncate `}>
  {
    loadingState ? <MoonLoader color = {color} size = {size} /> : <button type = {type || 'button'} id = "action"  className = "w-full h-full" >
      {children}
    </button>
  }
</button>
}

export default Button