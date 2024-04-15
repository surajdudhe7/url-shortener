const express = require("express");
const mongoose = require("mongoose");
// taking in the model we created
const ShortUrl = require("./models/shortUrl.js");
// now we have our short url being imported and in our post we can actually create a new one
const app = express();
const port = process.env.PORT || 3000
//using ejs view engine
app.set("view engine", "ejs");
//connect to the database using fuction
// we need to pass the url for this database in the function so for local database we use mongodb:localhost/url
mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// we take a module short ID that creates a unique short identifier
app.use(express.urlencoded({ extended: false }));
// simple rout defining
app.get("/", async (req, res) => {
  //we want to find the short url to render it in our table
  const shortUrls = await ShortUrl.find();

  // want to render some index file
  res.render("index", { shortUrls: shortUrls });
});
// in form in action we created a post endpoint /shortUrls and now we create it
app.post("/shortUrls", async (req, res) => {
  // now we connect to our database and save the short url
  await ShortUrl.create({ full: req.body.fullUrl });
  // inorder to get this property work with express we need actually need to tell our app
  // that we are using URL parameters so we can use line 15 urlencoded takes single object extended:true/false

  // async means that we want this process to be asynchronous process and await mean we will wait for this process to get
  // complete and then move forward as the short url creation is a synchrounous process
  res.redirect("/");
});

//we need to make sure that this is the final route that redirects to the short url
//basically it is saying give me route that has info directly after the first / we have this text and it'll be saved
// in the parameter  shortUrl
app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  // here we are using the findone({prop:val}) function to find one property prop and it's value and we can store it in an variable

  // sometimes people are gonna pass a url that doesn't exits so we are gonna check for that
  if (shortUrl == null) {
    return res.sendStatus(404);
    // meaning we cannot find the what you're looking for
  }
  // otherwise we increment the clicks on the shortUrl
  shortUrl.clicks++;
  // call the save function to update the short url
  shortUrl.save();
  res.redirect(shortUrl.full);
});

//server creation and listening to enviornment variables or port 5000
app.listen(port,()=>{
  console.log('listening to Port '+port);
});
