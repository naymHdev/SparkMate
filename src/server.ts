import http from "http";
import app from "./app";

const PORT = process.env.PORT || 5001;

const server = http.createServer(app);

/**
 * Start Server
 */
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

/**
 * Handle Server Errors
 */
server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      console.error(`Port ${PORT} requires elevated privileges`);
      process.exit(1);
      break;

    case "EADDRINUSE":
      console.error(`Port ${PORT} already in use`);
      process.exit(1);
      break;

    default:
      throw error;
  }
});

/**
 * Graceful Shutdown
 */
process.on("SIGINT", () => {
  console.log("🛑 Server shutting down...");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("🛑 Server terminated...");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});
