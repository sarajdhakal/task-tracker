import { useState } from "react";

export function TaskList({ tasks, onDelete, onUpdate }) {

    function EditTaskModal({ task, onClose, onUpdate }) {
        const [title, setTitle] = useState(task.title);
        const [status, setStatus] = useState(task.status);
        const [description, setDescription] = useState(task.description);
        const [dueDate, setDueDate] = useState(task.dueDate || "");

        const handleUpdate = () => {
            onUpdate({ ...task, title, status });
            onClose();
        };

        return (
            <el-dialog>
                <dialog
                    open
                    id="dialog"
                    aria-labelledby="dialog-title"
                    className="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent"
                >
                    <el-dialog-backdrop className="fixed inset-0 bg-gray-900/50" />

                    <div
                        tabIndex="0"
                        className="flex min-h-full items-center justify-center p-4 text-center"
                    >
                        <el-dialog-panel className="relative overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl sm:w-full sm:max-w-md">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleUpdate();
                                }}
                                className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                            >
                                <h3 className="text-lg font-bold text-white mb-4">
                                    Edit Task
                                </h3>
                                {/* Title */}
                                <div className="mb-4">
                                    <label className="block text-white text-sm font-bold mb-2">
                                        Task Title
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Task Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="shadow border rounded w-full py-2 px-3 text-gray-700"
                                    />
                                </div>
                                {/* Description */}
                                <div className="mb-4">
                                    <label className="block text-white text-sm font-bold mb-2">
                                        Task Description
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Task Description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="shadow border rounded w-full py-2 px-3 text-gray-700"
                                    />
                                </div>


                                {/* Status */}
                                <div className="mb-4">
                                    <label className="block text-white text-sm font-bold mb-2">
                                        Status
                                    </label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="shadow border rounded w-full py-2 px-3 text-gray-700"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                                {/* Due Date */}
                                <div className="mb-4">
                                    <label className="block text-white text-sm font-bold mb-2">
                                        Due Date
                                    </label>
                                    <input
                                        type="date"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                        className="shadow border rounded w-full py-2 px-3 text-gray-700"
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                    >
                                        Save
                                    </button>

                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20 sm:mt-0 sm:w-auto"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </el-dialog-panel>
                    </div>
                </dialog>
            </el-dialog>
        );
    }

    function DeleteTaskModal({ task, onClose, onDelete }) {
        return (
            <el-dialog>
                <dialog
                    open
                    id="dialog"
                    aria-labelledby="dialog-title"
                    className="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent"
                >
                    <el-dialog-backdrop className="fixed inset-0 bg-gray-900/50" />

                    <div
                        tabIndex="0"
                        className="flex min-h-full items-center justify-center p-4 text-center"
                    >
                        <el-dialog-panel className="relative overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl sm:w-full sm:max-w-sm">
                            <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg font-bold text-white mb-4">
                                    Delete Task
                                </h3>

                                <p className="text-gray-300 mb-6">
                                    Are you sure you want to delete <b>{task.title}</b>?
                                </p>

                                <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        onClick={() => {
                                            onDelete(task.id);
                                            onClose();
                                        }}
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500 sm:ml-3 sm:w-auto"
                                    >
                                        Delete
                                    </button>

                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20 sm:mt-0 sm:w-auto"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </el-dialog-panel>
                    </div>
                </dialog>
            </el-dialog>
        );
    }


    const [selectedTask, setSelectedTask] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Task List</h2>
            {tasks.length === 0 ? (
                <p className="text-gray-500 text-center">No tasks available.</p>
            ) : (

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {tasks.map((task) => (

                        <div
                            key={task.id}
                            className="relative bg-neutral-primary-soft p-4 border rounded-lg shadow"
                        >
                            <div className="flex flex-col items-center">
                                <h5 className="text-xl font-semibold">
                                    {task.title}
                                </h5>
                                <span className="text-sm text-gray-500">
                                    Due: {task.dueDate}
                                </span>
                                <span className="mt-1 text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                                    {task.status}
                                </span>

                                <div className="flex mt-4 gap-4">
                                    {/* Edit */}
                                    <button
                                        onClick={() => {
                                            setSelectedTask(task); // set the task to edit
                                            setIsEditOpen(true);   // open the modal
                                        }}
                                        className="rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white hover:bg-blue-400"
                                    >
                                        Edit
                                    </button>

                                    {/* Delete */}
                                    <button
                                        onClick={() => {
                                            setSelectedTask(task);
                                            setIsDeleteOpen(true);
                                        }}
                                        className="px-4 py-2 text-sm text-white bg-red-700 rounded-lg"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isEditOpen && (
                <EditTaskModal
                    task={selectedTask}
                    onClose={() => setIsEditOpen(false)}
                    onUpdate={onUpdate}
                />
            )}


            {isDeleteOpen && (
                <DeleteTaskModal
                    task={selectedTask}
                    onClose={() => setIsDeleteOpen(false)}
                    onDelete={onDelete}
                />
            )}
        </div>
    );
}
