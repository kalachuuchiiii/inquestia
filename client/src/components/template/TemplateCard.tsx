import { NavLink } from "react-router-dom";

const ImagePlaceholder = () => {
   return <div className = "grid col-start-1 col-span-3 h-full grid-rows-10 grid-cols-10">
    <div className = "col-start-1 row-start-3 row-span-8 h-full w-full row-start-1 rounded-lg row-span-1 bg-zinc-100 col-span-9"></div>
    <div className = "col-start-2 rounded-lg h-full w-full row-start-1 row-span-9 row-start-1 row-span-1  col-span-9 bg-zinc-200"></div>
  </div>
}

const TemplateCard = ({template}) => {

const { heading, description, path } = template; 
return <div className = "p-3 w-full gap-x-3 space-y-2 grid grid-cols-10">
 <ImagePlaceholder />
  <div className = "col-span-7 col-start-4">
        <p className = "text-lg font-semibold">{heading}</p>
  <p className = "text-sm w-8/12">{description}</p>
  <div className = "text-right w-full">
      <NavLink className = "px-4 py-1 bg-zinc-900 active:bg-white active:text-zinc-900 transition-colors duration-200 rounded-xl text-neutral-100" to = {path}>Use</NavLink>
  </div>
  </div>
</div>
}

export default TemplateCard