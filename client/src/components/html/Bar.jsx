import { getPercentage } from '../../utils/getPercentage.js';

const Bar = ({ target = 0, total = 0, animate = true}) => {

const progress = `${getPercentage(target, total)}%`

return <div className="w-full space-y-1 text-sm mb-4 mt-8">
    <p>{total} / {target}</p>
    <div className={`w-full overflow-hidden shadow-md  rounded-xl bg-gradient-to-r to-pink-200/20 from-pink-300/30  ${animate && 'animate-pulse'} `}>
      <div className={`bg-gradient-to-r from-purple-600 to-cyan-400 p-2 w-[${progress}] text-xs text-center`} >
      </div>
    </div>
  </div>
}

export default Bar