<template>
  <div class="task-container">
    <h1>Tasks</h1>
    <button @click="openModal('add')">Add Task</button>
    <AddTask :show="modalType === 'add'" @task-added="refreshTasks" @close-modal="closeModal" />
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-if="tasks && tasks.length">
        <ul class="task-list">
          <li v-for="task in tasks" :key="task._id" class="task-item">
            <h2>{{ task.name }}</h2>
            <p>{{ task.description }}</p>
            <button @click="deleteTask(task._id)">Delete</button>
            <button @click="openModal('edit', task)">Edit</button>
          </li>
        </ul>
      </div>
      <div v-else>No tasks available.</div>
    </div>
    <UpdateTask :show="modalType === 'edit'" :task="currentTask" @task-updated="refreshTasks" @close-modal="closeModal" />
  </div>
</template>

<script>
import TaskDataService from '../services/TaskDataService';
import AddTask from './AddTask.vue';
import UpdateTask from './UpdateTask.vue';

export default {
  components: {
    AddTask,
    UpdateTask
  },
  data() {
    return {
      tasks: [],
      isLoading: true,
      modalType: null,
      currentTask: null
    }
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      this.isLoading = true;
      try {
        const response = await TaskDataService.getAll();
        this.tasks = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteTask(id) {
      try {
        await TaskDataService.delete(id);
        this.fetchTasks(); // Refresh the list after deletion
      } catch (error) {
        console.error(error);
      }
    },
    openModal(type, task = null) {
      this.modalType = type;
      this.currentTask = task ? { ...task } : null;
    },
    closeModal() {
      this.modalType = null;
      this.currentTask = null;
    },
    refreshTasks() {
      this.closeModal();
      this.fetchTasks();
    }
  }
};
</script>

<style scoped>
.task-container {
  width: 80%;
  margin: 0 auto;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-item {
  margin: 20px 0;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

button {
  margin-right: 10px;
}
</style>
