const STORAGE_KEY = "tasks";



export const getTasksFromStorage = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const saveTasksToStorage = (tasks) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};
