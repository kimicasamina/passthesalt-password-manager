import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { logger } from "./middleware/logEvents";
import connection from "./db/config/connection";
import userRouter from "./api/routes/user";
import authRouter from "./api/routes/auth";
import loginRouter from "./api/routes/login";
import noteRouter from "./api/routes/note";
import verifyToken from "./middleware/verifyToken";

dotenv.config();
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type"], // Allow specific headers
  })
);

// custom middleware logger
app.use(logger);

// endpoints
app.get("/api", (req, res) => {
  console.log("API...");
  return res.json({ msg: "HELLO WORLD" });
});

app.use("/api/users", verifyToken, userRouter);
app.use("/api/logins", verifyToken, loginRouter);
app.use("/api/notes", verifyToken, noteRouter);
app.use("/api/auth", authRouter);

// global error handler
app.use("*", (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(process.env.PORT, async () => {
  console.log(
    `Server running on port ${process.env.PORT} \nin ${process.env.NODE_ENV} mode`
  );

  connection();
});
