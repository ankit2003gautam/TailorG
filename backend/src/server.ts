import app from "./App";
import { connectDb } from "./config/db";
import { env } from "./config/config";

async function main() {
  await connectDb();
  app.listen(env.PORT, () => console.log(`API listening on http://localhost:${env.PORT}`));
}

main().catch((err) => {
  const message = err instanceof Error ? err.message : "Unknown error";
  const details =
    err instanceof Error
      ? {
          name: err.name,
          message: message.replace(/mongodb(?:\+srv)?:\/\/[^\s"'<>]+/gi, "[MongoDB URI redacted]"),
          ...("code" in err ? { code: err.code } : {}),
          ...("codeName" in err ? { codeName: err.codeName } : {}),
        }
      : { name: "UnknownError", message };

  console.error("Failed to start server", details);
  process.exit(1);
});