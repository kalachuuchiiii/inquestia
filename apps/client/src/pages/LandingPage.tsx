import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppIcon } from "@/components/ui/AppIcon";
import bot from "/bot.png";
import dataChart from "/data-chart.png";
import gameController from "/game-controller.png";

const FeatureHeader = () => {
  return (
    <header className="py-6 lg:py-16">
      <h1 className="heading">Features</h1>
      <h2 className="sub-heading">Core components of Inquestia</h2>
    </header>
  );
};

const LandingPage = () => {
  return (
    <div >
      <nav className="fixed z-20  bg-zinc-950/50  top-0 inset-x-0 p-2">
        <div className="max-w-7xl  w-full invert dark:invert-0 p-1 mx-auto flex items-center justify-between   ">
          <h1 className="flex items-center w-fit">
            <AppIcon className="size-20" />
            <p className="font-bold text-2xl -translate-x-1">Inquestia</p>
          </h1>
          <div className="text-sm  lg:text-lg lg:px-4 px-2  space-x-4 ">
            <NavLink className={"font-light"} to={"/documentation"}>
              Documentation
            </NavLink>
            <NavLink className={"font-light"} to={"sign-in"}>
              Sign In
            </NavLink>
            <NavLink className={"font-bold tracking-tighter"} to={"/sign-up"}>
              Sign Up
            </NavLink>
          </div>
        </div>
      </nav>

      <div className="page-block flex items-center justify-start  relative">
        <div className="absolute  h-full inset-0 lg:invert-none invert opacity-30  bg-pulsar bg-zinc-950 z-20" />
        <div className="max-w-7xl mx-auto ">
          <header className=" h-full w-full gap-8 flex flex-col  justify-center  ">
            <main className="space-y-2   ">
              <h1 className="heading ">
                Infuse your surveys with greater possibilities
              </h1>
              <h3 className="sub-heading">
                An opportunity for simplified data collection
              </h3>
            </main>
            <Button className="w-46">Get Started</Button>
          </header>
        </div>
      </div>
      <div className="page-block bg-neutral-50 text-zinc-950">
        <div className="mx-auto max-w-7xl">
          <FeatureHeader />
          <main className="flex  lg:flex-row flex-col items-center gap-10 lg:gap-20">
            <div className=" size-50 lg:size-60  rounded-xl bg-white shrink-0 overflow-hidden shadow-[-15px_15px_0px_-6px_rgba(0,_0,_0,_0.15)]">
              <img src={bot} className="h-full w-full object-cover" />
            </div>
            <div className="space-y-5">
              <section>
                <h3 className="font-bold text-lg">AI Assistant</h3>
                <h1 className="heading">
                  Meet <span className="text-[#4741FF]">Inko</span> — Your
                  personal AI research assistant, with the ability to summarize
                  survey responses.
                </h1>
              </section>
              <h3 className="sub-heading">
                Provides insights - best for qualitative research
              </h3>
            </div>
          </main>
        </div>
      </div>

      <div className="page-block bg-conic-gray bg-neutral-150 text-zinc-950">
        <div className="max-w-7xl mx-auto">
          <FeatureHeader />
          <main className="flex  lg:flex-row flex-col w-full lg:justify-end lg:flex-col flex-col-reverse items-center gap-10 lg:gap-20">
            <div className="space-y-5 text-right">
              <section>
                <h3 className="font-bold text-lg">Data Visualization</h3>
                <h1 className="heading">
                  Graph, and Chart Representation of Data — Automated and free.
                </h1>
              </section>
              <div className="space-y-1 ">
                <h3 className="sub-heading">
                  saves time, and ensures accuracy
                </h3>
                <h3 className="sub-heading">
                  download-ready charts and graphs
                </h3>
              </div>
            </div>
            <div className="size-50 lg:size-60   rounded-xl bg-white shrink-0 overflow-hidden shadow-[-15px_15px_0px_-6px_rgba(0,_0,_0,_0.15)]">
              <img src={dataChart} className="h-full w-full object-cover" />
            </div>
          </main>
        </div>
      </div>
      <div className="page-block pixelify-sans bg-neutral-100  text-zinc-950">
        <div className="max-w-7xl z-20 mx-auto">
          <FeatureHeader />
          <main className="flex  lg:flex-row flex-col items-center gap-10 lg:gap-20">
            <div className=" size-50 lg:size-60 p-5   rounded-xl bg-white shrink-0 overflow-hidden shadow-[-15px_15px_0px_-6px_rgba(0,_0,_0,_0.15)]">
              <img
                src={gameController}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="space-y-5">
              <section>
                <h3 className="font-bold text-lg">Gamification</h3>
                <h1 className="heading">
                  Fuels <span className="text-[#FF3333]">curiosity</span> by
                  bringing joy in learning.
                </h1>
              </section>
              <Button className="bg-[#FF3333]" variant={"destructive"}>
                Join us now
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
