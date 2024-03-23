require("dotenv").config();
const Hapi = require("@hapi/hapi");
const connectMongo = require("./src/Databases/db");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  // Set CORS headers
  server.ext("onPreResponse", (request, h) => {
    const response = request.response;
    if (response.isBoom) {
      return h.continue;
    }
    response.header("Access-Control-Allow-Origin", "http://localhost:5173");
    response.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    return h.continue;
  });

  // Register routes
  server.route(require("./src/routes/animeRoutes"));

  // Connect to MongoDB
  connectMongo();

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

init();
