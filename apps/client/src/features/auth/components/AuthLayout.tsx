import type { JSX } from "react";

interface AuthLayoutInterface {
  hero: JSX.Element;
  children: JSX.Element;
}

const Wave = () => {

  return (
   
       <svg
            width="100%"
            height="100%"
            id="svg"
            viewBox="0 0 1440 590"
            xmlns="http://www.w3.org/2000/svg"
            className="transition duration-300 ease-in-out delay-150"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="5%" stop-color="#F78DA7"></stop>
                <stop offset="95%" stop-color="#8ED1FC"></stop>
              </linearGradient>
            </defs>
            <path
              d="M 0,600 L 0,150 C 105.23444976076553,154.31578947368422 210.46889952153106,158.6315789473684 302,149 C 393.53110047846894,139.3684210526316 471.3588516746412,115.78947368421052 568,123 C 664.6411483253588,130.21052631578948 780.0956937799043,168.21052631578948 874,184 C 967.9043062200957,199.78947368421052 1040.2583732057417,193.36842105263156 1131,184 C 1221.7416267942583,174.63157894736844 1330.870813397129,162.31578947368422 1440,150 L 1440,600 L 0,600 Z"
              stroke="none"
              stroke-width="0"
              fill="url(#gradient)"
              fill-opacity="0.53"
              className="transition-all duration-300 ease-in-out delay-150 path-0"
            ></path>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="5%" stop-color="#F78DA7"></stop>
                <stop offset="95%" stop-color="#8ED1FC"></stop>
              </linearGradient>
            </defs>
            <path
              d="M 0,600 L 0,350 C 86.62200956937801,381.1387559808612 173.24401913875602,412.2775119617225 268,413 C 362.755980861244,413.7224880382775 465.645933014354,384.02870813397135 566,384 C 666.354066985646,383.97129186602865 764.1722488038276,413.60765550239233 862,402 C 959.8277511961724,390.39234449760767 1057.665071770335,337.5406698564593 1154,322 C 1250.334928229665,306.4593301435407 1345.1674641148325,328.22966507177034 1440,350 L 1440,600 L 0,600 Z"
              stroke="none"
              stroke-width="0"
              fill="url(#gradient)"
              fill-opacity="1"
              className="transition-all duration-300 ease-in-out delay-150 path-1"
            ></path>
          </svg>
  
  )
}

export const AuthLayout = ({ hero, children }: AuthLayoutInterface) => {
  return (
    <div>
      <div className="h-screen flex flex-col my-15 lg:my-0 lg:flex-row  items-center">
        <div className="lg:bg-zinc-900  h-full w-full lg:w-8/12 text-white">{hero}</div>
        <div className=" h-full relative  flex items-center justify-center w-full lg:w-8/12  shadow-md">
          <div className="w-full h-full flex items-end absolute -bottom-[28vh]">
            <Wave />
          </div>
          <main className=" p-6  lg:w-6/12 bg-white/[0.12] backdrop-blur-[10px] backdrop-saturate-[111%] border border-white/[0.05] rounded-[2rem] shadow-xl shadow-indigo-500/10 ">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
