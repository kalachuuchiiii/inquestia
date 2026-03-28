import type { Variants } from "framer-motion";

export const verticalOpening = {
  hidden: {
    height: 0,
    pointerEvents: 'none'
  },
  visible: {
    height: "auto",
    pointerEvents: 'auto',
    transition: {
      duration: 0.3
    },
    overflow: 'hidden'
  },
};


export const smooth = (dur = 0.15) => {
  return {
    duration: dur,
    type: "tween",
  };
};

export const fade = {
  hidden: {
    opacity: 0,
    transition: smooth(),
  },
  visible: {
    opacity: 1,
    transition: smooth(),
  },
};

export const longFade = {
  hidden: {
    opacity: 0,
    transition: smooth(2),
  },
  visible: {
    opacity: 1,
    transition: smooth(2),
  },
};

export const fromLeft = {
  hidden: {
    x: "-100%",
    width: "0",
    border: "none",
    transition: smooth(),
  },
  visible: {
    x: 0,
    width: "auto",
    border: "auto",
    transition: smooth(),
  },
};

export const fromBottom: Variants = {
  hidden: {
    opacity: 0,
    y: "40%",
    transition: {
      duration: 0.25,
      type: "tween",
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      type: "tween",
    },
  },
};

export const emerge = {
  hidden: {
    width: 0,
    height: 0,
    opacity: 0,
    transition: smooth(),
  },
  visible: {
    width: "auto",
    height: "auto",
    opacity: 1,
    transition: smooth(),
  },
};

export const adapt = {
  hidden: {
    transition: smooth(0.2),
  },
  visible: {
    transition: smooth(0.2),
    height: "auto",
  },
};
