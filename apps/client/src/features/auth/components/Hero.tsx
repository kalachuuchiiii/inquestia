import { AppIcon } from "@/components/ui/AppIcon";


interface HeroProps {
    header: string;
    subheader: string;
    text: string;
}

const Hero = ({ header, subheader, text }: HeroProps) => {
  return (
    <div className="space-y-4  flex items-center w-full justify-center h-full ">
      <div className="mb-10">
        <AppIcon className=" size-40" /> 
      </div>
       <header className="space-y-2 w-8/12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
         {header}
      </h1>
      <p className="text-base sm:text-lg">
        {subheader}
        
      </p>
      <p className="text-sm sm:text-base hidden lg:block leading-relaxed">
        {text}
        
      </p>
       </header>
    </div>
  );
};

export default Hero;