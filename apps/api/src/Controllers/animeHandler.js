"use strict";

const Axios = require("axios");
const Anime = require("../Models/animeModel");

// Handler for GET /anime
const animeHandler = async (request, h) => {
  try {
    // Add Validation to Check wherever data is exist or not in Database
    const anime = await Anime.findOne({ title: request.query.q });

    if (anime && anime.title === request.query.q) {
      return {
        message: "Success: Anime found in the database",
        data: anime,
      };
    } else {
      const response = await Axios.get("https://api.jikan.moe/v4/anime", {
        params: { q: request.query.q },
      });

      const animeData = response.data.data;

      // console.log(animeData); check if the data are inputted or not
      const savedAnime = await Anime.create(animeData); // assuming animeData is an array

      // console.log(savedAnime);
      return {
        message: "Success: Anime retrieved from Jikan API and saved",
        data: savedAnime,
      };
    }
  } catch (error) {
    console.error("Error:", error.message);
    return h
      .response({ message: "Internal Server Error", error: error.message })
      .code(500);
  }
};

// Handler for DELETE /anime/{id}
const deleteAnimeHandler = async (request, h) => {
  try {
    const anime = await Anime.findById(request.params.id);

    if (!anime) {
      return h.response({ message: "Anime not found" }).code(404);
    }

    await anime.remove();
    return { message: "Success: Anime deleted successfully" };
  } catch (error) {
    console.error("Error:", error.message);
    return h
      .response({ message: "Internal Server Error", error: error.message })
      .code(500);
  }
};

module.exports = { animeHandler, deleteAnimeHandler };
