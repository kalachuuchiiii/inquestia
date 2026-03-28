
import React, { type ReactNode } from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16 flex justify-center">
      <div className="max-w-3xl w-full space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <h1 className="text-4xl font-bold">About This Project</h1>
          <p className="text-muted-foreground text-lg">
            Bridging the gap between researchers and participants — with fairness and simplicity.
          </p>
        </motion.div>

        {/* Section Helper Component */}
        <Section title="🎯 Purpose & Story">
          <p>
            This project was born from a real problem I witnessed firsthand.
            A friend of mine was conducting research about{" "}
            <span className="font-medium text-primary">online gamblers</span>,
            a niche group that’s often hard to reach. They struggled to find participants,
            and most existing tools didn’t make it any easier.
          </p>
          <p>
            That’s when I thought — what if there was a platform that helps researchers reach
            their audiences more effectively <em>and</em> motivates people to participate?
          </p>
          <p>
            The solution: a system where users earn{" "}
            <span className="font-medium">Core Points</span> every time they answer surveys,
            which they can exchange for <span className="font-medium">prepaid load</span>.
          </p>
        </Section>

        <Section title="💡 How It Works">
          <ul className="list-disc list-inside space-y-2">
            <li>Researchers can create, manage, and analyze surveys seamlessly.</li>
            <li>Automatic data visualization with tables, charts, and AI summaries.</li>
            <li>Advanced filters for precise and meaningful data insights.</li>
            <li>Respondents earn rewards for genuine participation.</li>
          </ul>
        </Section>

        <Section title="⚙️ Under the Hood">
          <p>
            The platform runs on a custom <strong>React</strong> + <strong>Vite</strong> +
            <strong>Node.js</strong> + <strong>Express</strong> + <strong>MongoDB</strong> stack — 
            built with simplicity and scalability in mind. (Though i could have done better haha)
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Self-registering routes for zero-boilerplate backend expansion.</li>
            <li>Reusable React hooks managing API states (loading, error, success).</li>
            <li>Follows  <strong>DRY</strong>, and <strong>SRP</strong> principles.</li>
          </ul>
        </Section>

        <Section title="🌱 Vision">
          <p>
            This platform aims to empower students, small research teams, and independent
            analysts to gather valuable data without financial or technical barriers.
          </p>
          <p>
            If it helps even one researcher reach their audience — or one respondent feel
            rewarded for their time — then this project has succeeded.
          </p>
        </Section>

        {/* Creator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center pt-10 border-t border-border"
        >
          <h2 className="text-2xl font-semibold mb-3">👤 Creator’s Note</h2>
          <p className="text-muted-foreground">
  I’m a 17-year-old self-taught developer who started coding on my phone.  
  With just one year of coding experience (since August 3, 2024), I’ve been driven purely by passion —  
  constantly learning, experimenting, and improving with every project.  
  Over time, I learned that the best solutions are the simplest ones —  
  and that building something real teaches more than any tutorial ever could.  
  This system reflects that journey.
</p>

        </motion.div>
      </div>
    </div>
  );
}

/* Simple reusable section card */
function Section({ title, children }:{title: string; children: ReactNode}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6 space-y-4 shadow-sm"
    >
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="space-y-3 text-muted-foreground leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
}
