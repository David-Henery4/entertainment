const jsonServer = require("json-server");
const auth = require("json-server-auth");
//
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
// Use the "json-server-auth" package to add authentication to the API
server.use(auth);
// Add PUT and PATCH support to the API
server.use(auth.routes.put);
server.use(auth.routes.patch);
//
server.use(middlewares);
server.use(router);
//
server.listen(3000, () => {
  console.log("JSON Server is running");
});