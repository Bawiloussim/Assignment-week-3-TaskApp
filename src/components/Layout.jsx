import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <main className="flex-grow p-4">{children}</main>
        <Footer />
    </div>
);
}
