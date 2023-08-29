import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

//config viewEngine
configViewEngine(app);

// init web route
initWebRoutes(app);

app.listen(PORT, () => {
    console.log(">>>JWT backend is running on the port ", PORT);
});