import { createApp } from "vue";
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue';
import TaskListView from './views/TaskListView.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: TaskListView,
    },
    // Add other routes here
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router

const app = createApp(App);
app.use(router);
app.mount('#app');
