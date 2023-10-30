import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
import "./db";
import { routerCoffees } from "./routes/coffee-route";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(routerCoffees);

app.listen(process.env.PORT, () => {
  return console.log(`Server started at port: [${process.env.PORT}]`);
});
