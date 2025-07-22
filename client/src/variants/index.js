
const Variants = function(){
  
  const smooth = (dur = 0.15) => {
    return {
      duration: dur,
      type: "tween"
    }
  }

  this.fade = {
  hidden: {
    opacity: 0, 
    transition: smooth()
  }, 
  visible: {
    opacity: 1, 
    transition: smooth()
  }
} 

this.longFade = {
  hidden: {
    opacity: 0, 
    transition: smooth(2)
  }, 
  visible: {
    opacity: 1, 
    transition: smooth(2)
  }
}

this.fromLeft = {
  hidden: {
    x: "-100%", 
    width: "0", 
    border: "none",
    transition: smooth()
  }, 
  visible: {
    x: 0,
    width: "auto",
    border: "auto",
    transition: smooth()
  }
}

this.fromBottom = {
  hidden: {
    opacity: 0 ,
    y: "40%",
    transition: smooth(1)
  }, 
  visible: {
    opacity: 1, 
    y: 0,
    transition: smooth(1)
  }
}

this.emerge = {
  hidden: {
    width: 0, 
    height: 0, 
    opacity: 0,
    transition: smooth()
  }, 
  visible: {
    width: "auto", 
    height: "auto" ,
    opacity: 1,
    transition: smooth()
  }
  
}

this.adapt = {
  hidden: {
    transition: smooth(0.20), 
  }, 
  visible: {
    transition: smooth(0.20), 
    height: "auto"
  }
}


}

export default new Variants();