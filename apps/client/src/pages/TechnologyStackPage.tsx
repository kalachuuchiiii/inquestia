

import React from "react";
import { motion } from "framer-motion";
import {
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongoose,
  SiFramer,
  SiMongodb,
  SiRedux,
  SiVite,
  SiVercel,
  SiTypescript,
  SiRailway,
  SiShadcnui,
} from "react-icons/si";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

export default function TechnologyStackPage() {
  const technologies = [
    { name: "TypeScript", icon: <SiTypescript className="text-blue-400" /> },
    { name: "HTML5", icon: <SiHtml5 className="text-orange-500" /> },
    { name: "CSS3", icon: <SiCss3 className="text-blue-500" /> },
    { name: "React", icon: <SiReact className="text-sky-400 [animation-duration:5s] animate-spin transition-all " /> },
    { name: "Redux", icon: <SiRedux className="text-purple-500" /> },
    { name: "Vite", icon: <SiVite className="text-violet-400" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400" /> },
      {
      name: "Shadcn UI",
      icon: <SiShadcnui />,
    },
    { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
    {
      name: "Express.js",
      icon: <SiExpress className="text-gray-300 dark:text-gray-100" />,
    },
    { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
    { name: "Mongoose", icon: <SiMongoose className="text-red-500" /> },
    { name: "Framer Motion", icon: <SiFramer className="text-purple-400" /> },
    {
      name: "Vercel",
      icon: <SiVercel className="text-gray-900 dark:text-white" />,
    },
    {
      name: "Railway",
      icon: <SiRailway />,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground px-6  flex flex-col items-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 space-y-3 h-screen flex items-center justify-center flex-col"
      >
        <h1 className="text-6xl font-bold">Technologies Used</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          A combination of modern frontend and backend tools that power the
          platform — built with performance, scalability, and simplicity in
          mind.
        </p>
      </motion.div>

      {/* Tech Grid */}
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-wrap gap-6  w-full justify-center">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
           
          >
            <Card  className="px-10">
              <CardContent className="text-8xl ">
                {tech.icon}
              </CardContent>
              <CardDescription className="mx-auto">
                {tech.name}
              </CardDescription>
            </Card>
          
          </motion.div>
        ))}
      </div>
      </div>
    </div>
  );
}
