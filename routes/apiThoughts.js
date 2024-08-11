const express = require("express");
const router = express.Router();
const Thought = require("../models/thought");
const User = require("../models/User");

// GET /api/thoughts - Get all thoughts
router.get("/api/thoughts", async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/thoughts/:thoughtId - Get a single thought by its _id
router.get("/api/thoughts/:thoughtId", async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: "Thought not found" });
    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/thoughts - Create a new thought
router.post("/api/thoughts", async (req, res) => {
  try {
    const { thoughtText, username, userId } = req.body;
    const newThought = await Thought.create({ thoughtText, username });
    await User.findByIdAndUpdate(userId, {
      $push: { thoughts: newThought._id },
    });
    res.status(201).json(newThought);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/thoughts/:thoughtId - Update a thought by its _id
router.put("/api/thoughts/:thoughtId", async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedThought)
      return res.status(404).json({ message: "Thought not found" });
    res.json(updatedThought);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/thoughts/:thoughtId - Remove a thought by its _id
router.delete("/api/thoughts/:thoughtId", async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(
      req.params.thoughtId
    );
    if (!deletedThought)
      return res.status(404).json({ message: "Thought not found" });
    await User.updateMany(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } }
    );
    res.json({ message: "Thought deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/thoughts/:thoughtId/reactions - Create a reaction
router.post("/api/thoughts/:thoughtId/reactions", async (req, res) => {
  try {
    const { reactionBody, username } = req.body;
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: "Thought not found" });
    thought.reactions.push({ reactionBody, username });
    await thought.save();
    res.status(201).json(thought);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/thoughts/:thoughtId/reactions/:reactionId - Remove a reaction
router.delete(
  "/api/thoughts/:thoughtId/reactions/:reactionId",
  async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought)
        return res.status(404).json({ message: "Thought not found" });
      thought.reactions.id(req.params.reactionId).remove();
      await thought.save();
      res.json(thought);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

module.exports = router;
