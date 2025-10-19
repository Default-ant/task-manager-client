import express from "express";
import path from "path";
import history from "connect-history-api-fallback";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Rewrite deep links before static middleware
app.use(history());

// ✅ Serve static files
app.use(express.static(path.resolve(__dirname, "dist")));

// ✅ Catch-all route for deep links


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});