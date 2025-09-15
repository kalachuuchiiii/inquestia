const { badges } = require("../data/badgeList")


exports.getBadgeByPoint = (point) => {
  for(let i = 0; i < badges.length; i++){
    const curr = badges[i];
    const next = badges?.[i + 1];

    if(next && (point >= curr.pointsRequired && point < next.pointsRequired)){
      return curr;
    }
    
    if(!next && point >= curr.pointsRequired){
        return curr;
    }
  }
  return null
}
