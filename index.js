import express from "express";
import path from "path";
import { requestTime, logger } from "./middlewares.js";
import serverRoutes from "./routes/servers.js";

const __dirname = path.resolve();
const PORT = process.env.PORT ?? 5000;
const app = express();

// Express = ejs ========================================================================================================================================================
app.get("view engine");
app.set("views", path.resolve(__dirname, "ejs"));
app.set("view engine", "ejs");

app.use(express.static(path.resolve(__dirname, "static")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestTime);
app.use(logger);
app.use(serverRoutes);

app.get("/", (req, res) => {
    res.render("index", { title: "Main Page", active: "main" });
});

app.get("/features", (req, res) => {
    res.render("features", { title: "Features Page", active: "features" });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});

// Just express ========================================================================================================================================================
// app.get("/", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "static", "index.html"));
// });

// app.get("/download", (req, res) => {
//     console.log(req.requestTime);
//     res.download(path.resolve(__dirname, "static", "index.html"));
// });
