import { getPercentage } from '../../utils/getPercentage.js';

const Bar = ({ target = 0, total = 0, animate = true}) => {

const progress = `${getPercentage(target, total)}%`

return <div className="w-full space-y-1 text-sm">
    <p className = "text-xs">{total} / {target}</p> 
    <div className={`w-full overflow-hidden  bg-neutral-100 ${animate && 'animate-pulse'} `}>
      <div className={`bg-gradient-to-r from-blue-300 to-cyan-400 p-[2px] w-[${progress}] text-xs text-center`} >
      </div>
    </div>
  </div>
}

export default Bar