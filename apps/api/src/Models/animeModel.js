const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const broadcastInfoSchema = new Schema({
  day: { type: String, required: false },
  time: { type: String, required: false },
  timezone: { type: String, required: false },
  string: { type: String, required: false },
});

const producerInfoSchema = new Schema({
  mal_id: { type: String, required: false },
  type: { type: String, required: false },
  name: { type: String, required: false },
  url: { type: String, required: false },
});

const imageSchema = new Schema({
  image_url: { type: String, required: false },
  small_image_url: { type: String, required: false },
  large_image_url: { type: String, required: false },
});

const imageInfoSchema = new Schema({
  jpg: { type: imageSchema, required: false },
  webp: { type: imageSchema, required: false },
});

const trailerImageInfoSchema = new Schema({
  image_url: { type: String, required: false },
  small_image_url: { type: String, required: false },
  medium_image_url: { type: String, required: false },
  large_image_url: { type: String, required: false },
  maximum_image_url: { type: String, required: false },
});

const trailerInfoSchema = new Schema({
  youtube_id: { type: String, required: false },
  url: { type: String, required: false },
  embed_url: { type: String, required: false },
  images: trailerImageInfoSchema,
});

const animeSchema = new Schema({
  mal_id: { type: String, required: true },
  url: { type: String, required: true },
  title: { type: String, required: true },
  source: { type: String, required: true },
  status: { type: String, required: true },
  rating: { type: String, required: false },
  rank: { type: Number, required: false },
  popularity: { type: Number, required: false },
  broadcast: broadcastInfoSchema,
  producers: [producerInfoSchema],
  images: imageInfoSchema,
  trailer: trailerInfoSchema,
});

module.exports = model("anime", animeSchema);
