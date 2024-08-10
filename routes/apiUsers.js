const express = require("express");
const router = express.Router();

router.get("/api/users", (req, res) => {
  res.send("get all users");
});

router.get("/api/users/:id", (req, res) => {
  res.send("get a user by id");
});

router.post("/api/users", (req, res) => {
  res.send("post user");
});

router.put("/api/users/:id", (req, res) => {
  res.send("put users by id");
});

router.delete("/api/users/:id", (req, res) => {
  res.send("delete users by id");
});

router.post("/api/users/:userId/friends/:friendID", (req, res) => {
  res.send("post to add new friends");
});

router.delete("/api/users/:userId/friends/:friendID", (req, res) => {
  res.send("delete friend");
});

module.exports = router;
