const express = require("express");
const router = express.Router();
const Query = require("../../models/Query");


// GET all queries with pagination
router.get("/list", async (req, res) => {
  try {
    const queries = await Query.find()
      .populate({
        path: "customer",
        select: "name",
        options: { strictPopulate: false },
      })
      .exec();

    res.status(200).json(queries);
  } catch (error) {
    console.error("❌ Error in GET /api/queries/list:", error.stack);
    res.status(500).json({ error: "Failed to load queries" });
  }
});


// POST create query
router.post("/", async (req, res) => {
  try {
    const query = new Query(req.body);
    await query.save();
    res.status(201).json(query);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET single query
router.get("/:id", async (req, res) => {
  const query = await Query.findById(req.params.id).populate("customer", "name");
  if (!query) return res.status(404).json({ error: "Not found" });
  res.json(query);
});

// PUT update status or resolution
router.put("/:id", async (req, res) => {
  const updated = await Query.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

// POST note
router.post("/:id/notes", async (req, res) => {
  const query = await Query.findById(req.params.id);
  if (!query) return res.status(404).json({ error: "Not found" });

  query.notes.push({ content: req.body.content });
  await query.save();
  res.json(query);
});

// DELETE note
router.delete("/:id/notes/:noteId", async (req, res) => {
  const query = await Query.findById(req.params.id);
  if (!query) return res.status(404).json({ error: "Not found" });

  query.notes = query.notes.filter(n => n._id.toString() !== req.params.noteId);
  await query.save();
  res.json(query);
});


module.exports = router;
