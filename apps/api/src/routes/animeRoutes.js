const {
  animeHandler,
  deleteAnimeHandler,
} = require("../Controllers/animeHandler");

module.exports = [
  {
    method: "GET",
    path: "/anime",
    handler: animeHandler,
  },
  {
    method: "DELETE",
    path: "/anime/{id}",
    handler: deleteAnimeHandler,
  },
];
