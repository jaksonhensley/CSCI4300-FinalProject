const addHoursToDate = (objDate, intHours) => {
  let numMlSecs = objDate.getTime();
  let addMlSecs = (intHours * 60) * 60 * 1000;
  let newDateObj = new Date(numMlSecs + addMlSecs);
  return newDateObj;
};

const getRandomStr = (length = 8) => {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let str = '';
  for (let i = 0; i < length; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
};

module.exports = { 
  addHoursToDate,
  getRandomStr
};