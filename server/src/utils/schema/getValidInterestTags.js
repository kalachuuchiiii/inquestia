const { interests } = require("../../data/interests.js");

exports.getValidInterestTags = (selectedInterests = []) => {
  const validInterests = selectedInterests.reduce((acc, prev) => {
    if (typeof prev !== 'string') {
      return acc;
    }
    const intrst = prev.trim().toLowerCase();
    const isValidInterest = !acc.includes(intrst) && interests.includes(intrst);

    if (!isValidInterest) {
      return acc;
    }
    acc.push(intrst);
    return acc;
  }, [])
  
  return validInterests

}