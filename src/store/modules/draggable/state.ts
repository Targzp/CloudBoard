export interface State {
  draggableItems: {
    [prop: string]: {
      data: any,
      x: number,
      y: number
    }
  }
}

// draggableItems 状态
const state: State = {
  draggableItems: JSON.parse(localStorage.getItem('cloudBoard') as string).draggable.draggableItems || {}
}

export default state
