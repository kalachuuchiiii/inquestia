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
  SiMongodb
} from "react-icons/si";

export default function TechnologiesPage() {
  const technologies = [
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
    { name: "HTML5", icon: <SiHtml5 className="text-orange-500" /> },
    { name: "CSS3", icon: <SiCss3 className="text-blue-500" /> },
    { name: "React", icon: <SiReact className="text-sky-400" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400" /> },
    { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
    { name: "Express.js", icon: <SiExpress className="text-gray-300 dark:text-gray-100" /> },
      { name: "Mongo DB", icon: <SiMongodb className="text-green-500" /> },
    { name: "Mongoose", icon: <SiMongoose className="text-red-500" /> },
    { name: "Framer Motion", icon: <SiFramer className="text-purple-400" /> },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16 flex flex-col items-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 space-y-3"
      >
        <h1 className="text-4xl font-bold">Technologies Used</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          A combination of modern frontend and backend tools that power the platform —
          built with performance, scalability, and simplicity in mind.
        </p>
      </motion.div>

      {/* Tech Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-4xl">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-200"
          >
            <div className="text-5xl mb-3">{tech.icon}</div>
            <p className="font-medium text-center">{tech.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
