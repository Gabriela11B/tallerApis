const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 4000;

let db;

app.use(express.json());
app.use(cors());

app.get("/api/a", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({ email_address: { $regex: "@twitter.com" } })
      .limit(20)
      .toArray();
    res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/api/b", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({
        founded_year: {
          $gte: 2005,
          $lte: 2008,
        },
      })
      .limit(20)
      .toArray();
    res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/api/c", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({ name: { $regex: "Technorati" } })
      .limit(20)
      .toArray();
    res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/api/d", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({
        $and: [
          { founded_year: 2002 },
          { category_code: { $regex: "advertising" } },
        ],
      })
      .limit(20)
      .toArray();
    res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/api/e", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({
        $or: [
          { category_code: { $regex: "messaging" } },
          { category_code: { $regex: "games_video" } },
        ],
      })
      .sort({ founded_year: 1 })
      .limit(150)
      .toArray();

    res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/api/:f", async (req, res) => {
  try {
    const year =`${req.params.f}`
    const result = await db
      .collection("companies")
      .find({founded_year: {$eq :parseInt(year)}})
      .limit(20)
      .toArray();
    res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});


app.post("/api/g", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find(req.body)
      .limit(20)
      .toArray();
    res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});




mongoose
  .connect(
    "mongodb+srv://MGTB:root@cluster0.uwee8wl.mongodb.net/sample_training?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to Mongo Atlas!");
    db = mongoose.connection.db;
  });

app.listen(port, () => {
  console.log(`This is my fist attempt ${port}`);
});
