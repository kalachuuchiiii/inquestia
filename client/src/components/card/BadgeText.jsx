import { motion } from "framer-motion";
import clsx from "clsx";

const BadgeText = ({ badge = { style: '', badge: 'Newbie'} }) => {
  if (!badge) return null;
  return (
    <motion.p
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.05, textShadow: "0 0 12px rgba(255,255,255,0.7)" }}
      transition={{ duration: 0.4, repeat: Infinity, repeatType: "mirror" }}
      className={clsx(
        "relative font-extrabold tracking-wide uppercase text-transparent bg-clip-text",
        badge.style,
        "animate-[shine_3s_linear_infinite]"
      )}
      style={{
        backgroundSize: "300% 300%",
        backgroundPosition: "0% 50%",
        WebkitBackgroundClip: "text",
      }}
    >
      {badge.badge}
    </motion.p>
  );
};

export default BadgeText;
