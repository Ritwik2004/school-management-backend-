import "dotenv/config";
import express from "express";
import cors from "cors";
import schoolsRouter from "./src/routes/school.routes.js";
const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (req,res)=>res.send("server is live !"));
app.use("/routes", schoolsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("app is run on port no : ",port)
});
