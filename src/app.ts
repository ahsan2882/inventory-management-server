import path from "path";
import cors from "cors";
import logger from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import Honeybadger from "@honeybadger-io/js";
import swaggerDocument from "./swaggerDoc.json";
import createError, { HttpError } from "http-errors";

import express, { Request, Response, NextFunction } from "express";

import usersRouter from "./routes/users";
import categoriesRouter from "./routes/categories";
import validationRouter from "./routes/validationRoutes";

import { scheduleRemoval } from "./scheduler";

dotenv.config();

const app = express();

Honeybadger.configure({
  apiKey: "hbp_RYcv43BHD7Kb2ZpfMvuu3cFC8Bgcz32UnXK4",
  environment: "production",
});
app.use(Honeybadger.requestHandler);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/user", usersRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/validate", validationRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use((err: HttpError, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
app.use(Honeybadger.requestHandler);

scheduleRemoval();

export default app;
