import { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";
import Button from "./Button";

const API_URL = "http://localhost:5000/api/tasks"; // Change if deployed

export default function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);

useEffect(() => {
        axios.get(API_URL)
        .then(res => {
            setTasks(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error("API error:", err);
            setLoading(false);
        });
    }, []);

const addTask = async () => {
    if (!title.trim()) return;

    try {
        const res = await axios.post(API_URL, { title });
            setTasks([res.data, ...tasks]);
            setTitle("");
    } catch (error) {
            console.error("Error adding task:", error);
        }
};

const toggleTask = async (id, completed) => {
    try {
        const res = await axios.put(`${API_URL}/${id}`, { completed: !completed });
        setTasks(tasks.map(t => t._id === id ? res.data : t));
    } catch (error) {
        console.error("Error updating task:", error);
    }
};

const deleteTask = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        setTasks(tasks.filter(t => t._id !== id));
    } catch (error) {
        console.error("Error deleting task:", error);
    }
};

const filtered = tasks.filter(task =>
    filter === "all"
        ? true
        : filter === "active"
        ? !task.completed
        : task.completed
    );

    if (loading) return <p>Loading tasks...</p>;

return (
    <div className="space-y-4">
        <div className="flex gap-2">
            <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="New task..."
            className="border p-2 rounded w-full"
            />
            <Button onClick={addTask}>Add</Button>
        </div>

    <div className="flex gap-2">
        <Button variant={filter === "all" ? "primary" : "secondary"} onClick={() => setFilter("all")}>All</Button>
        <Button variant={filter === "active" ? "primary" : "secondary"} onClick={() => setFilter("active")}>Active</Button>
        <Button variant={filter === "completed" ? "primary" : "secondary"} onClick={() => setFilter("completed")}>Completed</Button>
    </div>

    <div className="space-y-2">
        {filtered.map(task => (
            <TaskItem
            key={task._id}
            task={task}
            onToggle={() => toggleTask(task._id, task.completed)}
            onDelete={() => deleteTask(task._id)}
            />
        ))}
        {filtered.length === 0 && <p className="text-center text-gray-500">No tasks found.</p>}
        </div>
    </div>
);
}
