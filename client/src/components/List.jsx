import { memo } from 'react';
import { AnimatePresence } from 'framer-motion';
const List = ({ list, animation = false, className = "flex flex-col w-full gap-1", renderItem, style }) => {

  return <div style={style} className={className}>
    {
      animation ? <AnimatePresence>
        {
          list.map((item, i) => {
            return renderItem(item, i)

          })
        }
      </AnimatePresence> : list.map((item, i) => {
        return renderItem(item, i)

      })
    }
  </div>

}

export default memo(List);