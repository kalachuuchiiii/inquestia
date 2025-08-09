import { MoonLoader } from 'react-spinners';

const Button = ({loadingState = false, className = 'px-4 py-1 bg-neutral-100 rounded-lg text-zinc-900 w-20 h-10', onClick = () => {}, children = null, size = 20, disabled = false, color = "black"}) => {


return <div className = {`${className} ${disabled ? ' opacity-50 ' : 'active:bg-zinc-900 active:text-neutral-100 transition-colors duration-200'} flex justify-center items-center `}>
  {
    loadingState ? <MoonLoader color = {color} size = {size} /> : <button disabled = {disabled} className = "w-full h-full" onClick = {onClick}>
      {children}
    </button>
  }
</div>
}

export default Button