const { badges } = require("../data/badgeList")


exports.getBadgeByPoint = (core) => {
  for(let i = 0; i < badges.length; i++){
    const curr = badges[i];
    const next = badges?.[i + 1];

    if(next && (core >= curr.pointsRequired && core < next.pointsRequired)){
      return curr;
    }
    
    if(!next && core >= curr.pointsRequired){
        return curr;
    }
  }
  return null
}
