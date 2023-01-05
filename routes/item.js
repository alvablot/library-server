const express = require("express");

const router = express.Router();
const Item = require("../models/item");

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Item.findById(id);
    res.json(item);
    console.log(`GET/item ${id}`);
  } catch (error) {
    return next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const items = await Item.find({});
    res.json(items);
    console.log("GET/all items");
  } catch (error) {
    return next(error);
  }
});

router.post("/new", express.json(), async (req, res, next) => {
  try {
    const { title, author, number, image, description, categories, rating, home, lender } =
      req.body;
    const newItem = await Item.create({
      title: title,
      author: author,
      number: number,
      image: image,
      description: description,
      categories: categories,
      rating: rating,
      home: home,
      lender: lender,
    });

    const item = await Item.find({});
    res.json(item);

    console.log("POST/new item");
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", express.json(), async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, author, number, image, description, categories, rating, home, lender } =
      req.body;
    const freshItem = await Item.findByIdAndUpdate(id, {
      title: title,
      author: author,
      number: number,
      image: image,
      description: description,
      categories: categories,
      rating: rating,
      home: home,
      lender: lender,
    });

    const item = await Item.find({});
    res.json(item);

    console.log("PUT/update item");
  } catch (error) {
    return next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Item.findById(id);
    await Item.findByIdAndRemove(id);
    const items = await Item.find({});
    res.json(items);
    console.log(`DELETE/item ${id}`);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
