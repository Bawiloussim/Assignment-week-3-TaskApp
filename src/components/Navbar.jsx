import { Link } from "react-router-dom";
import ThemeToggle from "./themeToggle";

<ThemeToggle />

export default function Navbar() {
return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Task App</h1>
        <div className="space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/tasks" className="hover:underline">Tasks</Link>
            <Link to="/users" className="hover:underline">Users</Link>
            

        </div>
    </nav>
);
}
