

const UserCardPlaceholder = ({ number = 3 }) => {


  return <div className = "space-y-2">
    {
      Array(number).fill('').map((_, i) => <div className="animate-pulse duration-200 p-2 flex flex-col items-center justify-start gap-2" key={i}>
        <div className="flex gap-2 w-full">
          <div className="size-10 aspect-square rounded-full bg-neutral-300 dark:bg-zinc-700" />
          <div className=" w-full flex flex-col gap-1">
            <div className="w-10/12 h-3 rounded-lg  bg-neutral-300 dark:bg-zinc-700" />
            <div className="w-8/12 opacity-70 h-3 rounded-lg bg-neutral-300 dark:bg-zinc-700" />
          </div>
        </div>
        <div className="w-full h-8 rounded-lg bg-neutral-300 dark:bg-zinc-700">

        </div>
      </div>)
    }
  </div>
}

export default UserCardPlaceholder