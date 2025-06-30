import { useEffect, useState } from "react";


export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");

const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;

useEffect(() => {
        fetch("http://localhost:5000/api/users")
        .then((res) => {
            if (!res.ok) throw new Error("Error of loading");
            return res.json();
        })
        .then((data) => {
            setUsers(data);
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
}, []);

  // 🔍 Filtrage par recherche
const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
);

  // 📄 Pagination
const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
};
const prevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
};

if (loading) return <p>Loading...</p>;
if (error) return <p className="text-red-500">Error : {error}</p>;


return (
    <div className="max-w-md mx-auto p-2 sm:p-4">
    <h1 className="text-2xl font-bold mb-4">List of users</h1>

    <input
        type="text"
        placeholder="Recherche a name..."
        value={query}
        onChange={(e) => {
        setQuery(e.target.value);
        setCurrentPage(1); // 🔄 stay on page 1 when check
        }}
        className="mb-4 p-2 border rounded w-full"
    />

    <ul className="space-y-2 mb-4">
        {paginatedUsers.map((user) => (
        <li
            key={user.id}
            className="p-4 bg-white dark:bg-gray-800 rounded shadow"
        >
            <h2 className="font-semibold">{user.name}</h2>
            <p>{user.email}</p>
            <p className="text-sm text-gray-500">{user.website}</p>
        </li>
        ))}
        {filteredUsers.length === 0 && (
        <p className="text-gray-500">Any result found.</p>
        )}
    </ul>

    {filteredUsers.length > 0 && (
        <div className="flex justify-between items-center">
        <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-yellow-400 rounded disabled:opacity-50"
        >
            Preview
        </button>
        <p>
            Page {currentPage} / {totalPages}
        </p>
        <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-yellow-400 rounded disabled:opacity-50"
        >
            Next
        </button>
        </div>
    )}
    </div>
);
}