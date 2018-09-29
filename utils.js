/**
 * 创建时间生成
 */
const numberToDate = (num) => {
  const date = new Date(num);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let str = '';
  if (month <= 9) {
    str = str + year + '.0' + month
  } else {
    str = str + year + '.' + month 
  }
  if (day <= 9) {
    str = str + '.0' + day
  } else {
    str = str + '.' + day
  }
  return str
};

module.exports = {
  numberToDate,
};
