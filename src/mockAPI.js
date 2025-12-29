import { getTasksFromStorage, saveTasksToStorage } from "./store";

export const fetchTasks = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(getTasksFromStorage());
        }, 500);
    });
};

export const addTask = (task) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const tasks = getTasksFromStorage();
            const newTask = { ...task, id: Date.now().toString() };
            tasks.push(newTask);
            saveTasksToStorage(tasks);
            resolve(newTask);
        }, 300);
    }
    );
};

export const updateTask = (updatedTask) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const tasks = getTasksFromStorage().map(t =>
                t.id === updatedTask.id ? updatedTask : t
            );
            saveTasksToStorage(tasks);
            resolve(updatedTask);
        }, 300);
    });
};

export const deleteTask = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const tasks = getTasksFromStorage().filter(t => t.id !== id);
            saveTasksToStorage(tasks);
            resolve(id);
        }, 300);
    });
};
