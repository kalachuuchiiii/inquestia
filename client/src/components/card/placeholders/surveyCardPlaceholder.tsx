import ArrowButton from '../../html/ArrowButton';
const SurveyCardPlaceholder = ({ number = 1 }) => {


return (
  <>
    {Array(number)
      .fill("")
      .map((_, i) => (
        <div
          key={i}
          className="p-1 my-6 animate-pulse duration-150 w-full space-y-2"
        >
          <div className="h-25 bg-neutral-300 dark:bg-zinc-700 rounded-lg" />
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="size-10 aspect-square  rounded-full bg-neutral-300 dark:bg-zinc-700" />
              <div className="flex w-full flex-col gap-1 ">
                <div className="h-3 bg-neutral-300 dark:bg-zinc-700 rounded-lg w-10/12" />
                <div className="h-3 rounded-lg w-8/12 opacity-70  bg-neutral-300 dark:bg-zinc-700" />
              </div>
            </div>
            <div className="flex gap-1 justify-start w-full items-center opacity-70">
              <div className="bg-bg-neutral-300 dark:bg-zinc-700 rounded-lg w-2/12 h-2" />
              <div className="bg-bg-neutral-300 dark:bg-zinc-700 h-1 w-1 rounded-full" />
              <div className="bg-bg-neutral-300 dark:bg-zinc-700 h-2 rounded-lg w-3/12" />
            </div>
          </div>
          <div className="flex my-8 gap-3 items-center w-full justify-between">
            <div className="grid gap-y-1 gap-x-2 w-7/12 grid-cols-3">
              {Array(6)
                .fill("")
                .map((_, i) => (
                  <div
                    key={i + 100}
                    className="bg-neutral-300 dark:bg-zinc-700 opacity-40 h-2 rounded w-full"
                  />
                ))}
            </div>
            <div className="flex p-3 w-5/12 items-center">
              <div className="bg-neutral-300 dark:bg-zinc-700 rounded-lg h-2 w-10/12" />
              <ArrowButton />
            </div>
          </div>
          <div className="w-full h-1 bg-neutral-300 dark:bg-zinc-700 rounded"></div>
        </div>
      ))}
  </>
);
}

export default SurveyCardPlaceholder
