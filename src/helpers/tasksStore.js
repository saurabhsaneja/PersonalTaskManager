import { create } from 'zustand'

const tasksStore = create((set) => ({
  taskList: [],
  addAllToTaskList: (tasks) => set((state) => ({ taskList: [...state.taskList, ...tasks] })),
  addToTaskList: (task) => set((state) => ({ taskList: [...state.taskList, task] })),
  updateTaskList: (task, taskIndex) => set((state) => ({ taskList: [...state.taskList?.map((tk, index) => index === taskIndex ? {...task} : tk)] })),
  deleteFromTaskList: (taskIndex) => set((state) => ({ taskList: [...state.taskList?.filter((tk, index) => index !== taskIndex)] })),
}))

export default tasksStore;