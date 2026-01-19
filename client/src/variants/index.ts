const Variants = function () {
  const smooth = (dur = 0.15) => {
    return {
      duration: dur,
      type: "tween",
    };
  };

  const fade = {
    hidden: {
      opacity: 0,
      transition: smooth(),
    },
    visible: {
      opacity: 1,
      transition: smooth(),
    },
  };

  const longFade = {
    hidden: {
      opacity: 0,
      transition: smooth(2),
    },
    visible: {
      opacity: 1,
      transition: smooth(2),
    },
  };

  const fromLeft = {
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

  const fromBottom = {
    hidden: {
      opacity: 0,
      y: "40%",
      transition: smooth(0.25),
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: smooth(0.25),
    },
  };

  const emerge = {
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

  const adapt = {
    hidden: {
      transition: smooth(0.2),
    },
    visible: {
      transition: smooth(0.2),
      height: "auto",
    },
  };

  return {
    fade,
    adapt,
    smooth,
    emerge,
    fromBottom,
    fromLeft,
    longFade
  }
};

export default Variants();
