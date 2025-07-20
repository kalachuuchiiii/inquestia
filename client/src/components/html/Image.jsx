import { useEffect, useState } from 'react';

const Image = ({src = "", alt = "Avatar", className = ''}) => {
  const [isLoaded, setIsLoaded] = useState(false);


return <div className = "grid place-content-center w-full h-full">
  <img src = {src} alt = {alt} className = {`${!isLoaded && 'hidden'} ${className}`} onLoad = {() => setIsLoaded(true)} />
  {
    !isLoaded && <img src = {"/jonas.jpeg"} />
  }
</div>
}

export default Image