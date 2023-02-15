/**
 * localStorage 工具函数
 * @param storageType 本地存储类型
 * @param storageKey 本地存储 key
 * @param moduleKey 模块 key
 * @param stateKey 状态 key
 */
export const getStorageData = (
  storageType: 'session' | 'local',
  storageKey: string,
  moduleKey: string,
  stateKey: string
): any => {
  let storageJSONData = null
  if (storageType === 'session') {
    storageJSONData = sessionStorage.getItem(storageKey)
  } else if (storageType === 'local') {
    storageJSONData = localStorage.getItem(storageKey)
  }

  if(storageJSONData) {
    const storageData = JSON.parse(storageJSONData)

    return storageData[moduleKey][stateKey]
  }
}