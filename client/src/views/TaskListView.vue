<template>
    <div>
        <h1>Task List View</h1>
        <TaskList @task-added="refreshTasks" @task-updated="refreshTasks" />
    </div>
</template>

<script>
import TaskList from '@/components/TaskList.vue';

export default {
    components: {
        TaskList,
    },
    methods: {
        refreshTasks() {
            // This method will be called when a task is added or updated
            // It triggers the refreshTasks method in the TaskList component
            this.$refs.taskList.refreshTasks();
        },
    },
};
</script>

<style>
h1 {
    text-align: center;
}
</style>
