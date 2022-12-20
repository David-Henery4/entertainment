const jsonServer = require("json-server");
const auth = require("json-server-auth");
//
exports.handler = (event, context, callback) => {
  const server = jsonServer.create();
  const router = jsonServer.router("db.json");
  const middlewares = jsonServer.defaults();

  // Use the "json-server-auth" package to add authentication to the API
  server.use(auth);

  server.use(middlewares);
  server.use(router);

  const { httpMethod, path } = event;
  const req = {
    method: httpMethod,
    url: path,
  };
  const res = {};

  server(req, res, (err) => {
    if (err) {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({ message: "Internal Server Error" }),
      });
      return;
    }
    callback(null, {
      statusCode: res.statusCode,
      body: res.body,
      headers: res.headers,
    });
  });
};