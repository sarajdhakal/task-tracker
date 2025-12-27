import { TaskAdd } from "./task-add";
import { TaskList } from "./task-list";
import { TaskSearch } from "./task-search";
import { useState, useEffect } from "react";
import { fetchTasks, addTask, updateTask, deleteTask } from "../mockAPI";

export default function TaskTracker() {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [showAdd, setShowAdd] = useState(false);

    useEffect(() => {
        fetchTasks().then(data => {
            setTasks(data);
            setFilteredTasks(data);
        });
    }, []);

    useEffect(() => {
        const stored = localStorage.getItem("tasks");
        if (stored) {
            setTasks(JSON.parse(stored));
        }
    }, []);

    /* save tasks to local storage */
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);


    const handleAddTask = async (task) => {
        const added = await addTask(task);
        const updated = [...tasks, added];
        setTasks(updated);
        setFilteredTasks(updated);
        setShowAdd(false);
    };

    const handleUpdate = async (task) => {
        await updateTask(task);
        const updated = tasks.map(t => t.id === task.id ? task : t);
        setTasks(updated);
        setFilteredTasks(updated);
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        const updated = tasks.filter(t => t.id !== id);
        setTasks(updated);
        setFilteredTasks(updated);
    };

    const handleSearch = (term) => {
        if (!term) {
            setFilteredTasks(tasks);
        } else {
            setFilteredTasks(
                tasks.filter(t =>
                    t.title.toLowerCase().includes(term.toLowerCase())
                )
            );
        }
    };

    const handleStatusChange = (status) => {
        if (status === "All") {
            setFilteredTasks(tasks);
        } else {
            setFilteredTasks(
                tasks.filter(t => t.status === status)
            );
        }
    };


    return (
        <>
            <main className="min-h-screen p-12 bg-background">
                <div className="max mx-auto col-span-12 bg-white p-8 rounded-lg inset-20 shadow-lg mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-4xl font-bold">Task Tracker</h1>
                        <p className="text-gray-500 mt-2">
                            Keep track of your tasks. Add, update, delete, and search tasks easily.
                        </p>
                    </div>


                    <button onClick={() => setShowAdd(true)} command="show-modal" commandfor="dialog"
                        className="ml-auto rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 flex items-center gap-2">
                        <span className="text-xl font-bold">+</span> Add task
                    </button>


                    {showAdd && (
                        <TaskAdd onAdd={handleAddTask} onClose={() => setShowAdd(false)} />
                    )}
                </div>

                <TaskSearch onSearch={handleSearch} onFilter={handleStatusChange} />
                <TaskList tasks={filteredTasks} onDelete={handleDelete} onUpdate={handleUpdate} />

            </main>
        </>
    );
}
