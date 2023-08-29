import express from "express";
import homeController from "../controllers/homeController";

const router = express.Router();

/**
 * 
 * @param {*} app - express app 
 */
const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloWorld);
    router.get("/user", homeController.handleUserPage);

    router.get("/about",(req, res) => {
        return res.send("I'm Ares7760");
    })

    return app.use("/", router);
}

export default initWebRoutes;