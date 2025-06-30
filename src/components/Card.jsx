export default function Card({ title, children }) {
return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4">
        {title && <h2 className="text-lg font-bold mb-2">{title}</h2>}
        <div>{children}</div>
    </div>
);
}
