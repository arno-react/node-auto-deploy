
const regConfig = {
  // 1~5位汉字  正则匹配汉字的时候，可能会出现误差，最好的解决办法是 写一个函数， 然后 return ([\u4e00-\u9fa5]{2,4})
  peopleUser: /^[\u4e00-\u9fa5]{1,5}$/,
  // peopleUser: /^([\u4e00-\u9fa5]{1,5})$/g,
  // 验证邮箱
  peopleAccount: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
  // 必须由数字、字母和_，两种以上组成,6~16位
  // peoplePassworld: /^[0-9a-zA-Z_]{6,12}$/,
  peoplePassworld: /^(?![0-9]+$)(?![a-zA-Z]+$)[A-Za-z_][A-Za-z_0-9]{5,15}$/,
  mobile: /^1[3|4|5|6|7|8|9]\d{9}$/,
  code: /\d{6}/,
  // 2~10个汉字
  addRole: /^[\u4e00-\u9fa5]{2,10}$/g,
  // 匹配网址URL  貌似是有问题的
  webUrl: /[a-zA-z]+:[^\s]*/,
  // 匹配邮政编码
  postcode: /[1-9]\d{5}(?!\d)/,
  // 匹配18位身份证号
  idCard: /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/,
  // 验证手机号码
  checkPhone: /^1[3|4|5|6|7|8|9]\d{9}$/,
  // 验证手机号码
  chinese_50: /^[\u4e00-\u9fa5]{1,50}$/
}
export { regConfig }

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 手机号码 */
export function validatPhone(str) {
  const reg = /^0?(13|15|18|14|17|16)[0-9]{9}$/
  return reg.test(str)
}

/* 邮箱 */
export function validatEmail(str) {
  const reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
  return reg.test(str)
}

/* 邮箱 */
export function validatPassword(str) {
  const reg = regConfig.peoplePassworld
  return reg.test(str)
}
