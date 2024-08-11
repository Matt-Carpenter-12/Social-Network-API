const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("get all users");
});

router.get("/:id", (req, res) => {
  res.send("get a user by id");
});

router.post("/", (req, res) => {
  res.send("post user");
});

router.put("/:id", (req, res) => {
  res.send("put users by id");
});

router.delete("/:id", (req, res) => {
  res.send("delete users by id");
});

router.post("/:userId/friends/:friendID", (req, res) => {
  res.send("post to add new friends");
});

router.delete("/:userId/friends/:friendID", (req, res) => {
  res.send("delete friend");
});

module.exports = router;
