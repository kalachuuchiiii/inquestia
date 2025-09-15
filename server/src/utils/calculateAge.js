const { differenceInYears } = require('date-fns')

exports.calculateAge = birthdate => {
  return differenceInYears(new Date(), new Date(birthdate));

}

