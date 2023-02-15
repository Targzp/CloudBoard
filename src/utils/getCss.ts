/**
 * 获取元素对应css属性值
 * @param el 
 * @param cssKey 
 * @returns 
 */
export const getCss = (el: Element, cssKey: string): any => {
  return document.defaultView?.getComputedStyle(el, null)[cssKey as any] || ''
}