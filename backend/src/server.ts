import { createApp } from "@/app";
import { env } from "@/config/env";

const app = createApp();

app.listen(env.port, () => {
  console.log(`6/14 Co-Living API escuchando en http://localhost:${env.port}`);
});
