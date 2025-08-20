import { MoonLoader } from 'react-spinners';

const LoadingDisplay = ({message = "Loading..."}) => {


return <div className = "fixed bg-zinc-950 z-10 inset-0 flex justify-center items-center w-full h-screen gap-1">
  
  <div className = "flex gap-2 items-center">
        <MoonLoader color = "white" size = "20" />
    <p>{message}</p>
  </div>
</div>
}

export default LoadingDisplay