/*********************************************************************************
 * WEB422 – Assignment 1
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Drashti Mandaliya Student ID: 143217198 Date: _______________
 * Heroku Link: _______________________________________________________________
 *
 ********************************************************************************/

const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const RestaurantDB = require("./modules/restaurantDB.js");
const db = new RestaurantDB();

app.use(cors());
app.use(express.json());
const port = process.env.port || 8080;

db.initialize(
  "mongodb+srv://Drashti:Drashti%402910@seneca.aj7m4.mongodb.net/sample_restaurants?retryWrites=true&w=majority"
)
  .then(() => {
    app.listen(port, () => {
      console.log(`server listening on: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.json({ message: "API Listening" });
});

app.post("/api/restaurants", (req, res) => {
  let restaurant = req.body.restaurant;
  db.addNewRestaurant(restaurant)
    .then((data) => {
      res.status(200);
      res.json({
        status: true,
        data: data,
        message: "Restaurants added successfully",
      });
    })
    .catch((err) => {
      res.status(400);
      res, json(err);
    });
});

// /:page/:perPage/:borough
app.get("/api/restaurants", (req, res) => {
  let page = req.query.page;
  let perPage = req.query.perPage;
  let borough = req.query.borough;
  db.getAllRestaurants(page, perPage, borough)
    .then((data) => {
      res.status(200);
      res.json({
        status: true,
        data: data,
        message: "get all record successfully",
      });
    })
    .catch((err) => {
      res.status(400);
      res.json(err);
    });
});

app.get("/api/restaurants/:id", (req, res) => {
  let id = req.params.id;
  db.getRestaurantById(id).then((data) => {
    res
      .status(200)
      .json({
        status: true,
        data: data,
        message: "get record successfully",
      })
      .catch((err) => {
        res.status(400);
        res.json(err);
      });
  });
});

app.put("/api/restaurants/:id", (req, res) => {
  let data = req.body.restaurant;
  let id = req.params.id;
  db.updateRestaurantById(data, id)
    .then(() => {
      res.status(200);
      res.json({
        status: true,
        message: "Restaurants updated successfully",
        data: id + " is updated!",
      });
    })
    .catch((err) => {
      res.status(400);
      res.json(err);
    });
});

app.delete("/api/restaurants/:id", (req, res) => {
  let id = req.params.id;
  db.deleteRestaurantById(id)
    .then(() => {
      res.status(200);
      res.json({
        status: true,
        message: "Restaurants delete successfully",
        data: id + " is deleted!",
      });
    })
    .catch((err) => {
      res.status(400);
      res.json(err);
    });
});

app.get("*", (req, res) => {
  res.status(404);
  res.json("Sorry I don't know that route");
});
