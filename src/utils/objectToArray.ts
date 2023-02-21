/**
 * 将对象转换为数组
 * @param obj 源对象
 * @param prop 对象中可选的数据属性
 */
export const objectToArray = (obj: { [prop: string]: any }, prop?: string): any[] => {
  const resArr = []

  if (prop) {
    for (const key in obj) {
      resArr.push(obj[key][prop])
    }
  } else {
    for (const key in obj) {
      resArr.push(obj[key])
    }
  }

  return resArr
}
