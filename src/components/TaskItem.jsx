export default function TaskItem({ task, onToggle, onDelete }) {
return (
        <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-md shadow">
        <div className="flex items-center">
            <input
            type="checkbox"
            checked={task.completed}
            onChange={onToggle}
            className="mr-3"
            />
            <span className={task.completed ? "line-through text-gray-400" : ""}>
            {task.title}
            </span>
        </div>
        <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700"
        >
            Delete
        </button>
    </div>
);
}
