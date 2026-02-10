import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { preloadContent } from "./config/content";

// ✅ App load se pehle content start karo
preloadContent();

createRoot(document.getElementById("root")!).render(<App />);