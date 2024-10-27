// src/stores/task.js
import { defineStore } from 'pinia'
import TaskService from '@/services/TaskService'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    currentTask: null,
    loading: false,
    error: null
  }),
  
  actions: {
    async fetchTasks() {
      this.loading = true
      this.error = null
      try {
        const response = await TaskService.getTasks()
        this.tasks = response.data
      } catch (error) {
        this.error = error.message
        console.error('Error fetching tasks:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchTaskById(id) {
      this.loading = true
      this.error = null
      try {
        const response = await TaskService.getTask(id)
        this.currentTask = response.data
        return response.data
      } catch (error) {
        this.error = error.message
        console.error('Error fetching task:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async createTask(taskData) {
      this.loading = true
      this.error = null
      try {
        const response = await TaskService.createTask(taskData)
        this.tasks.unshift(response.data)
        return response.data
      } catch (error) {
        this.error = error.message
        console.error('Error creating task:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateTask(taskId, taskData) {
      this.loading = true
      this.error = null
      try {
        const response = await TaskService.updateTask(taskId, taskData)
        const index = this.tasks.findIndex(task => task.id === parseInt(taskId))
        if (index !== -1) {
          this.tasks[index] = response.data
        }
        return response.data
      } catch (error) {
        this.error = error.message
        console.error('Error updating task:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteTask(taskId) {
      this.loading = true
      this.error = null
      try {
        await TaskService.deleteTask(taskId)
        this.tasks = this.tasks.filter(task => task.id !== taskId)
      } catch (error) {
        this.error = error.message
        console.error('Error deleting task:', error)
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})