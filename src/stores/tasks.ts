import { defineStore } from 'pinia'
export const useTasksStore = defineStore({
  id: 'tasks',
  state: () => ({
    tasks: ['Buy some milk', 'Go for a Walk', 'Go to the gym']
  }),
  actions: {
    addTask(newTask: string) {
      if (newTask.length > 0) {
        this.tasks.push(newTask)
        console.log(this.tasks)
      } else {
        console.log('Please provide a task!')
      }
    },

    deleteTask(taskIndex: number) {
      this.tasks.splice(taskIndex, 1)
    },
    updateTask(taskIndex: number, newTask: string) {
      if (newTask.length > 0) {
        this.tasks.splice(taskIndex, 1, newTask)
      } else {
        console.log('Please provide an update or delete this task!')
      }
    }
  }
})
