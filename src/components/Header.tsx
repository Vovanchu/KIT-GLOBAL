import logo from "@/assets/logo.png";
import { Button } from "./ui/button";
import { Moon, Plus, Sun } from "lucide-react";
import { ThemeContext } from "@/Context/Theme/ThemeContext";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "@/app/features/ui/uiSlice";

export const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  return (
    <header className="max-w-7xl flex flex-row items-center justify-between mx-auto bg-background px-8">
      <img
        src={logo}
        alt="Logo of company"
        className="w-10 h-10 cursor-pointer"
      />

      <div className="flex items-center gap-3">
        <Button
          size="icon"
          variant="outline"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="cursor-pointer"
        >
          {theme === "light" ? (
            <Moon className="size-4" />
          ) : (
            <Sun className="size-4" />
          )}
        </Button>

        <Button
          size="sm"
          onClick={() => dispatch(openModal({ type: "createPost" }))}
          className="gap-1.5 cursor-pointer"
        >
          <Plus className="size-4" />
          New Post
        </Button>
      </div>
    </header>
  );
};
