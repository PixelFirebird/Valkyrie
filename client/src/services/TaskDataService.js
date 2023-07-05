import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8090',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

class TaskDataService {
    // Get all tasks
    getAll() {
        return apiClient.get('/tasks');
    }

    // Get task by ID
    getByID(id) {
        return apiClient.get(`/tasks/${id}`);
    }

    // Create new task
    create(data) {
        return apiClient.post('/tasks', data);
    }

    // Update task
    update(id, data) {
        return apiClient.put(`/tasks/${id}`, data);
    }

    // Delete task
    delete(id) {
        return apiClient.delete(`/tasks/${id}`);
    }
}

export default new TaskDataService();
