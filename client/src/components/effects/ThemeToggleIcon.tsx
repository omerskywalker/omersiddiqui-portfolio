import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggleIcon({ theme }: { theme: "light" | "dark" }) {
  return (
    <span className="relative inline-flex items-center justify-center w-4 h-4">
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span
            key="sun"
            initial={{ rotate: -120, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 120, scale: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inline-flex"
          >
            <Sun className="w-4 h-4" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 120, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -120, scale: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inline-flex"
          >
            <Moon className="w-4 h-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
