const express = require("express");
const userRoute = require("./users");
const applicationRoute = require("./applications");
const articlesRouter = require("./articles");
const categoryRouter = require("./categories");

const routes = express();

routes.use("/users", userRoute);
routes.use("/applications", applicationRoute);
routes.use("/articles", articlesRouter);
routes.use("/categories", categoryRouter);

module.exports = routes;