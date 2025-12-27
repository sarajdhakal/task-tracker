import { useForm } from "react-hook-form";

export function TaskAdd({ onAdd }) {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();

    const onSubmit = (data) => {
        console.log("Task Data:", data);
        const newTask = {
            id: Date.now(),
            ...data,
        };

        onAdd(newTask);
        reset();
    };

    return (
        <>
            <el-dialog>
                <dialog
                    id="dialog"
                    aria-labelledby="dialog-title"
                    className="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent"
                >
                    <el-dialog-backdrop className="fixed inset-0 bg-gray-900/50" />

                    <div tabIndex="0" className="flex min-h-full items-center justify-center p-4 text-center"                    >
                        <el-dialog-panel className="relative overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl sm:w-full sm:max-w-lg">

                            <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" >
                                <h3 className="text-lg font-bold text-white mb-4">
                                    Add Task
                                </h3>
                                {/* Title */}
                                <div className="mb-4">
                                    <label className="block text-white text-sm font-bold mb-2">
                                        Task Title
                                    </label>
                                    <input type="text" placeholder="Task Title"{...register("title", { required: "Title is required" })}
                                        className="shadow border rounded w-full py-2 px-3 text-gray-700"
                                    />
                                    {errors.title && (
                                        <p className="text-red-400 text-sm mt-1">
                                            {errors.title.message}
                                        </p>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="mb-6">
                                    <label className="block text-white text-sm font-bold mb-2">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Task Description"
                                        {...register("description")}
                                        className="shadow border rounded w-full py-2 px-3 text-gray-700"
                                    />
                                </div>

                                {/* Due Date + Status */}
                                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Due Date */}
                                    <div>
                                        <label className="block text-white text-sm font-bold mb-2">
                                            Due Date
                                        </label>
                                        <input
                                            type="date"
                                            {...register("dueDate", { required: true })}
                                            className="shadow border rounded w-full py-2 px-3 text-gray-700"
                                        />
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block text-white text-sm font-bold mb-2">
                                            Status
                                        </label>
                                        <select
                                            {...register("status")}
                                            className="shadow border rounded w-full py-2 px-3 text-gray-700"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Done">Done</option>
                                        </select>
                                    </div>
                                </div>

                                {/* button  */}
                                <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 sm:ml-3 sm:w-auto"
                                    >
                                        Add Task
                                    </button>

                                    <button
                                        type="button"
                                        command="close"
                                        commandfor="dialog"
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
        </>
    );
}
