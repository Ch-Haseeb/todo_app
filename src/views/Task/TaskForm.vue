<template>
    <v-container class="fill-height d-flex align-center justify-center">
      <v-card max-width="600" outlined>
        <v-card-title class="text-h5 text-center">
          {{ isEditMode ? 'Edit Task' : 'Create New Task' }}
        </v-card-title>
  
        <v-card-text>
          <v-form @submit.prevent="handleSubmit">
            <v-row>
              <v-col cols="12" class="pb-2">
                <v-text-field
                  v-model="taskData.task"
                  label="Task Name"
                  outlined
                  clearable
                  dense
                  required
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
  
              <v-col cols="12" class="pb-2">
                <v-textarea
                  v-model="taskData.description"
                  label="Description"
                  outlined
                  clearable
                  dense
                  rows="4"
                ></v-textarea>
              </v-col>
  
              <v-col cols="6">
                <v-btn
                  color="primary"
                  :loading="loading"
                  block
                  type="submit"
                  class="white--text"
                >
                  {{ isEditMode ? 'Update Task' : 'Create Task' }}
                </v-btn>
              </v-col>
              
              <v-col cols="6">
                <v-btn
                  color="grey darken-1"
                  block
                  to="/"
                  class="white--text"
                >
                  Cancel
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useTaskStore } from '../../stores/task'
//   import { storeToRefs } from 'pinia'
  
  const route = useRoute()
  const router = useRouter()
  const taskStore = useTaskStore()
  
//   const { loading, error } = storeToRefs(taskStore)
  
  const taskData = ref({
    task: '',
    description: ''
  })

  const rules = {
  required: value => !!value || 'Task Name is required.'
}

  
  const isEditMode = computed(() => !!route.params.id)
  
  onMounted(async () => {
    if (isEditMode.value) {
      try {
        const task = await taskStore.fetchTaskById(route.params.id)
        taskData.value = {
          task: task.task,
          description: task.description || ''
        }
      } catch (error) {
        console.error('Error loading task:', error)
        router.push('/')
      }
    }
  })
  
  const handleSubmit = async () => {
    try {
      if (isEditMode.value) {
        await taskStore.updateTask(route.params.id, taskData.value)
      } else {
        await taskStore.createTask(taskData.value)
      }
      router.push('/')
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }
  </script>
  
  <style scoped>
  .v-card {
    padding: 24px;
  }
  </style>
  