const mongoose = require("mongoose");
const shortId = require("shortid");
// single function to generate a shortid

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

// now we export this
// model(NameOfOurModel, schema)
module.exports = mongoose.model("shortUrl", shortUrlSchema);
// this hooks our database and our model
