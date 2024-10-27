<template>
    <v-container class="d-flex justify-center">
      <v-card max-width="900" outlined>
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="text-h5">Tasks</span>
          <router-link :to="{ name: 'task-create' }">
            <v-btn color="primary" class="text-white">Add New Task</v-btn>
          </router-link>
        </v-card-title>
  
        <v-divider></v-divider>
  
        <v-card-subtitle v-if="loading" class="text-center text-grey">
          Loading...
        </v-card-subtitle>
        <v-card-subtitle v-else-if="error" class="text-center text-red">
          {{ error }}
        </v-card-subtitle>
        <v-card-subtitle v-else-if="tasks.length === 0" class="text-center text-grey">
          No tasks found. Create your first task!
        </v-card-subtitle>
  
        <v-responsive v-else>
          <v-table>
            <thead>
              <tr>
                <th class="text-left">Task</th>
                <th class="text-left">Description</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task in tasks" :key="task.id">
                <td>{{ task.task }}</td>
                <td>{{ task.description }}</td>
                <td class="text-center">
                  <router-link :to="{ name: 'task-edit', params: { id: task.id }}">
                    <v-btn color="blue" text class="mx-2">Edit</v-btn>
                  </router-link>
                  <v-btn color="red" text class="mx-2" @click="deleteTask(task.id)">
                    Delete
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-responsive>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useTaskStore } from '../../stores/task'; 
  
  const taskStore = useTaskStore();
  const { tasks, loading, error } = storeToRefs(taskStore);
  
  onMounted(() => {
    taskStore.fetchTasks();
  });
  
  const deleteTask = async (taskId) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await taskStore.deleteTask(taskId); 
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };
  </script>
  
  <style scoped>
  .text-grey {
    color: #9e9e9e;
  }
  .text-red {
    color: #e53935;
  }
  .text-blue {
    color: #1976d2;
  }
  .v-table {
    min-width: 800px;
    margin: 0 auto;
  }
  .mx-2 {
    margin-left: 8px;
    margin-right: 8px;
  }
  </style>
  