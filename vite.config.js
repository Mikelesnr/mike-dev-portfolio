import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Load .env manually from custom location
dotenv.config({ path: resolve(__dirname, "resources/js/.env") });

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/js/app.jsx", "resources/css/app.css"],
            refresh: true,
        }),
        react(),
    ],
});
