import { memo } from "react";

const FeatureCard = ({feature}) => {


return <div className = "p-3 py-6 w-full max-w-100 shrink-0 rounded-2xl active:scale-103 transition-transform duration-200 shadow-md space-y-6">
  <main className = "flex flex-col gap-2">
      <div className = "grid grid-cols-12  gap-10 overflow-hidden items-center">
    <div className = "col-span-1 text-3xl col-start-1">
            {feature.icon}
    </div>
      <h1 className = "text-lg w-fit col-span-8 col-start-2 ">{feature.feature}</h1>
  </div>
  <p className = "text-2xl sm:text-xl font-bold w-10/12">{feature.description}</p>
  </main>
  <div className = "w-full grid grid-cols-10 grid-rows-8 ml-3 rounded-lg h-60 sm:h-60">
    <div className = "bg-zinc-100 rounded-lg col-start-5 col-span-5 row-start-1 row-start-1 row-span-4 shadow-md shadow-pink-100 z-10 ">
    </div>
    <div className = "bg-zinc-100 rounded-lg col-start-1 col-span-8 shadow-md shadow-purple-100 row-start-3 row-span-5">

    </div>
    
  </div>
</div>
}

export default memo(FeatureCard)