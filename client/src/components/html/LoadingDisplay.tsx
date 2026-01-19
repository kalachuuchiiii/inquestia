import type { JSX } from 'react';
import { MoonLoader } from 'react-spinners';

const LoadingDisplay = ({children }:{children: JSX.Element | string;}) => {


return <div className = "min-h-96 flex-col z-10  flex justify-center animate-pulse duration-200 items-center w-full gap-1">
  
  <div className = "flex gap-2 items-center">
        <MoonLoader color = "white" size = "20" />
        {children}
  </div>
</div>
}

export default LoadingDisplay
