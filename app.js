const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// express app
const app = express();

// Connect to mongodb
const dbURI =
  "mongodb+srv://dmitryGreat:Dmister2000@cluster0.7tzhkzq.mongodb.net/dmitryGreat?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(dbURI)
  .then((result) => {
    // listen for requests
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes

app.get("/", (req, res) => {
  res.redirect("/");
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// Blog routes
app.use("/", blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
