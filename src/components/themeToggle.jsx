import { useTheme } from "../context/themeContext";
import Button from "./Button";

export default function ThemeToggle() {
    const { dark, toggle } = useTheme();

    return (
        <Button onClick={toggle} variant="secondary">
        Mode {dark ? "Clair" : "Sombre"}
        </Button>
    );
}
