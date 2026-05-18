import { Link } from "react-router-dom";
import { AppIcon } from "./AppIcon";
import { FaFacebook, FaGithub } from "react-icons/fa";

const InquestiaIcon = () => {
  return (
    <div className="flex items-center">
      <AppIcon className="lg:size-30 invert dark:invert-0 size-16" />
      <div className="font-light">
        <h1 className=" text-base lg:text-4xl font-bold">Inquestia</h1>
        <p className="lg:text-lg text-sm font-light">
          Built with <span className="font-semibold">{"<3"}</span> by{" "}
          <span className="font-bold">Kalachuuchiiii</span>
        </p>
      </div>
    </div>
  );
};

const AppFooter = () => {
  return (
    <footer className="w-full h-[360px]  dark:text-neutral-100 text-zinc-900">
      <div className="max-w-7xl pl-[10px] lg:pl-[75px] pt-[56px] mx-auto">
        <main className="flex lg:flex-row flex-col gap-10 lg:gap-0  items-start justify-between">
          <div className="">
            <InquestiaIcon />
          </div>

          <div className="flex items-start lg:py-4 w-full justify-evenly">
            <div className="space-y-2">
              <h1 className="font-bold text-sm lg:text-xl">Inquestia</h1>
              <div className="font-light text-xs lg:text-base">
                <h2>
                  <Link to={"/"}>Get Started</Link>
                </h2>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="font-bold text-sm lg:text-xl">Resources</h1>
              <div className="font-light text-xs lg:text-base">
                <h2>
                  <Link to={"/documentation"}>Documentation</Link>
                </h2>
                <h2>
                  <a
                    target="_blank"
                    href={"https://github.com/kalachuuchiiii/inquestia"}
                  >
                    Open Source (GitHub)
                  </a>
                </h2>
              </div>
            </div>
          </div>
        </main>
        <footer className="w-full flex items-center p-15  justify-center">
          <p className="opacity-75 lg:text-base text-sm">
            © {new Date().getFullYear()} kalachuuchiiii
          </p>
          <section className="flex items-center gap-2 px-3">
            <FaGithub className="size-8" />
            <FaFacebook className="size-8" />
          </section>
        </footer>
      </div>
    </footer>
  );
};

export default AppFooter;
