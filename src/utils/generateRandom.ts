/**
 * 利用随机数结合16进制生成唯一值
 * @returns 
 */
export const generateRandom = () => {
  return Math.random().toString(16).slice(2)
}