import app from "./app";
import { config } from "./config/config";
import { initDb } from "./db";

const server = () => {
  initDb();
  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port as string}`);
  });
};
server();
