import useSearchQuery from '../hooks/useSearchQuery.js';
import { CgFeed } from "react-icons/cg";

const CurrentTopic = () => {

  const { formalCurrentParams } = useSearchQuery({
    key: "topic",
    initial: "technology"
  })


  return (
    <div className="px-6 py-3 w-full grid gric-cols-12 grid-rows-3 overflow-hidden sticky rounded-xl bg-zinc-50">
      <div className = "row-span-2 row-start-1 bg-white col-start-1 col-span-2 px-4 py-2 rounded-full flex items-center gap-1">
        <CgFeed />
        <h1 className="text-sm  grid place-content-center">Topic</h1>

      </div>


      <input readOnly value={formalCurrentParams} className="ml-1 row-span-2 lexend-deca row-start-2 col-start-2 col-span-9  px-2 pb-2 outline-none tracking-wide text-2xl" />
    </div>
  )
}

export default CurrentTopic