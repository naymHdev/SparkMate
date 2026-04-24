import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app: Application = express();

/**
 * Global Middlewares
 */
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));

/**
 * Health Check Route
 */
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "SparkMate Server Running 🚀",
  });
});

/**
 * API Routes
 */
app.use("/api/v1", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API Ready",
  });
});

/**
 * Not Found Route
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

/**
 * Global Error Handler
 */
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : undefined,
  });
});

export default app;
