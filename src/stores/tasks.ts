import { defineStore } from 'pinia'
export const useTasksStore = defineStore({
  id: 'tasks',
  state: () => ({
    tasks: ['Buy some milk', 'Go for a Walk', 'Go to the gym']
  }),
  actions: {
    addTask(newTask: string) {
      this.tasks.push(newTask)
      console.log(this.tasks)
    },

    deleteTask(taskIndex: number) {
      this.tasks.splice(taskIndex, 1)
    }
  }
})
