import compression from "compression";
import cors from "cors";
import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import next from "next";

import { configs } from "../configs";
import { swaggerSpec, swaggerTheme } from "../configs/swagger";

export default ({ app }: { app: express.Application }) => {
  app.use(cors());

  app.set("port", configs.port);
  app.use(compression());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));


  app.use("/public", express.static(path.join(__dirname, "../../public")));
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { customCss: swaggerTheme }));

  app.get("/swagger.json", function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  app.get("/quan", function(req, res){
    res.json({msg: 'aaa'})
  })

  const nextApp = next({ 
    dev: true, 
    dir: "./next" 
  });
  const handle = nextApp.getRequestHandler();
  nextApp.prepare().then(() => {
    console.log("Next App Initialized!");
    app.get("*", (req, res) => handle(req, res));
  });
};
