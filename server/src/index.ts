import { serveStatic } from 'hono/bun';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();
app.use("/*", cors());

app.use('/jsons/*', serveStatic({root: "./"}));

app.get("/currencies", (c) => {
  return c.redirect('/jsons/currencies.json');
});

app.get("/names", (c) => {
  return c.redirect('/jsons/names.json');
});

const port = 8088;

const server = Bun.serve({
  port,
  fetch: app.fetch,
});

console.log(`Server is running on ${server.port} port!`);


export default app
