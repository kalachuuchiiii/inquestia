import { memo } from 'react';

const List = ({list, className = "flex flex-col w-full gap-1", renderItem, style}) => {


return <div style = {style} className = {className}>
  {
    list.map((item, i) => {
      return renderItem(item, i)
        
    })
  }
</div>
}

export default memo(List);