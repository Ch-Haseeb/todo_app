import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '@/views/Task/TaskList.vue'
import TaskForm from '@/views/Task/TaskForm.vue'

const routes = [
  {
    path: '/',
    name: 'tasks',
    component: TaskList
  },
  {
    path: '/task/create',
    name: 'task-create',
    component: TaskForm
  },
  {
    path: '/task/:id/edit',
    name: 'task-edit',
    component: TaskForm,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
