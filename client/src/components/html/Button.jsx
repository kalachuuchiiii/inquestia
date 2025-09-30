import { useSelector } from 'react-redux';
import { MoonLoader } from 'react-spinners';

const Button = ({
  loadingState = false,
  className = "px-4 bg-zinc-950 text-neutral-100 mx-auto py-1 flex items-center justify-center dark:bg-neutral-100 rounded-lg dark:text-zinc-900 w-20 h-10",
  onClick = () => {},
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
        disabled
          ? " opacity-50 "
          : "active:bg-zinc-900 active:text-neutral-100 transition-colors duration-200"
      } w-full flex text-center max-w-8/12  justify-center h-10 items-center overflow-y-hidden truncate `}
    >
      {loadingState ? (
        <MoonLoader color={mode === 'Dark' ? 'black' : 'white'} size={size} />
      ) : (
        <p className="w-full text-center flex justify-center items-center h-full">{children}</p>
      )}
    </button>
  );
};

export default Button