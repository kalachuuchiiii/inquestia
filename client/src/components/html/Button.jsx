import { useSelector } from 'react-redux';
import { MoonLoader } from 'react-spinners';

const Button = ({
  loadingState = false,
  className = "inquestia-button",
  onClick = () => {},
  loadingStateColor = null,
  children = null,
  size = 20,
  disabled = false,
  type = "button",
}) => {

  const { mode } = useSelector(state => state.theme)
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`${className} ${
        disabled || loadingState 
          ? " opacity-20 "
          : "active:bg-zinc-900 active:text-neutral-100 transition-colors duration-200"
      } w-full flex text-center  justify-center h-10 items-center overflow-y-hidden truncate `}
    >
      {loadingState ? (
        <MoonLoader color={loadingStateColor || (mode === 'Dark' ? 'black' : 'white')} size={size} />
      ) : (
        <button className="w-full  text-center flex justify-center items-center h-full">{children}</button>
      )}
    </button>
  );
};

export default Button