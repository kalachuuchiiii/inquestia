import { useState } from 'react';

const Image = ({ src = null, alt = "Avatar", className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative grid place-content-center w-full h-full rounded-full overflow-hidden`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-zinc-900 animate-pulse duration-200 rounded-full" />
      )}
      <img
        src={src}
        alt={alt}
        className={`${isLoaded ? 'block' : 'hidden'} w-full h-full object-cover aspect-square rounded-full ${className}`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default Image;