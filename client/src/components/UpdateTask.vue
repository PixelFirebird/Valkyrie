<template>
    <div v-if="show" class="modal">
        <div class="modal-content">
            <h2>Edit Task</h2>
            <form @submit.prevent="updateTask">
                <div class="form-group">
                    <label for="taskName">Task Name:</label>
                    <input id="taskName" v-model="taskName" type="text" />
                </div>
                <div class="form-group">
                    <label for="taskDescription">Task Description:</label>
                    <textarea id="taskDescription" v-model="taskDescription"></textarea>
                </div>
                <div class="form-actions">
                    <button type="submit">Save</button>
                    <button @click="closeModal">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import TaskDataService from '../services/TaskDataService';

export default {
    props: {
        show: {
            type: Boolean,
            required: true
        },
        task: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            taskName: '',
            taskDescription: ''
        };
    },
    watch: {
        task: {
            immediate: true,
            handler(value) {
                if (value) {
                    this.taskName = value.name;
                    this.taskDescription = value.description;
                }
            }
        }
    },
    methods: {
        async updateTask() {
            const updatedTask = {
                ...this.task,
                name: this.taskName,
                description: this.taskDescription
            };

            try {
                await TaskDataService.update(this.task._id, updatedTask);
                this.$emit('task-updated', updatedTask);
                this.closeModal();
            } catch (error) {
                console.error(error);
            }
        },
        closeModal() {
            this.$emit('close-modal');
            this.resetForm();
        },
        resetForm() {
            this.taskName = '';
            this.taskDescription = '';
        }
    }
};
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 20px;
}

textarea {
    width: 100%;
    height: 80px;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
}

button {
    margin-left: 10px;
}
</style>
