const addHoursToDate = (objDate, intHours) => {
  let numMlSecs = objDate.getTime();
  let addMlSecs = (intHours * 60) * 60 * 1000;
  let newDateObj = new Date(numMlSecs + addMlSecs);
  return newDateObj;
};

module.exports = { addHoursToDate };