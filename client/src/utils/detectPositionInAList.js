const detectPositionInAList = (index, length) => {
  return index === 0 ? "first" : index === length ? "last" : "";
}

export default detectPositionInAList;