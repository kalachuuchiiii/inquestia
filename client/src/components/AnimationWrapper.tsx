import allVariants from "../variants/index";
import { motion } from "framer-motion";
import { memo, type JSX } from "react";

interface AnimationWrapperType {
  variants: keyof typeof allVariants;
  className?: string;
  children: JSX.Element;
  layout?: boolean;
  onClick?: (s: any) => void;
}
const AnimationWrapper = ({
  variants = "fade",
  className = "",
  children,
  layout = false,
  onClick,
}: AnimationWrapperType) => {
  return (
    <motion.div
      variants={allVariants[variants] as any}
      initial="hidden"
      animate="visible"
      exit="hidden"
      layout={layout}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default memo(AnimationWrapper);
