import { getPercentage } from '../../utils/getPercentage.js';

const Bar = ({ target = 0, total = 0, animate = true }) => {
  const progress = `${getPercentage(target, total)}%`;

  return (
    <div className="w-full space-y-1 text-sm">
      <p className="text-xs">{total} / {target}</p> 
      <div className={`w-full overflow-hidden bg-neutral-100 ${animate ? 'animate-pulse' : ''}`}>
        <div
          className="bg-blue-400 p-[2px] text-xs text-center"
          style={{ width: progress }}
        />
      </div>
    </div>
  );
};

export default Bar;
