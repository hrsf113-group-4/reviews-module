const express = require("express");
const bodyParser = require("body-parser");
const Restaurant = require("./database/Restaurant.js");

const app = express();
const port = 3004;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static(__dirname + "/public/dist"));
app.use("/restaurants/:id", express.static(__dirname + "/public/dist"));

app.get("/api/restaurants/:id/reviews", (req, res) => {
  Restaurant.aggregate(
    [
      { $match: { id: JSON.parse(req.params.id) } },
      { $unwind: "$reviews" },
      { $sort: { "reviews.createdAt": -1 } }
    ],
    (err, result) => {
      if (err) res.status(400).send("error getting reviews");
      const reviews = [];
      result.map(review => reviews.push(review.reviews));
      res.json(reviews);
    }
  );
});

app.get("/api/restaurants/:id/filters", (req, res) => {
  Restaurant.find({ id: JSON.parse(req.params.id) }, (err, result) => {
    if (err) res.status(400).send("error getting filtered keywords");
    res.json(result[0]);
  });
});

app.listen(port, () => console.log(`The port is listening on ${port}`));
