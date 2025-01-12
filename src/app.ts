import express, { Request, Response, NextFunction } from "express";
import todoRoutes from "./routes/todos";
import { json } from "body-parser";

const app = express();

app.use(json());

app.use("/todos", todoRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({ message: error.message });
});

app.listen(3011, () => {
  console.log("Server is running on port http://localhost:3011");
});
