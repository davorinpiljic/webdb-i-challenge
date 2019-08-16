const express = require("express");
const router = express.Router();

const dbAccts = require("../dbConfig.js");

// this file will only be used when the route begins with "/accounts"
//i like async try catch here, much simpler than then()
router.get("/", async (req, res) => {
  const limit = req.query.limit;
  const sortby = req.query.sortby;
  const sortdir = req.query.sortdir;

  try {
    const accounts = await dbAccts("accounts")
      .limit(limit)
      .orderBy(sortby, sortdir);

    if (accounts) {
      res.status(200).json(accounts);
    } else {
      res.status(404).json({ message: "no accounts" });
    }
  } catch (err) {
    res.status(500).json({ error: error });
  }
});

router.post("/", async (req, res) => {
  const newAccount = req.body;
  try {
    const accounts = await dbAccts("accounts").insert(newAccount);
    if (accounts) {
      res.status(200).json(accounts);
    } else {
      res.status(404).json({ message: "could not add" });
    }
  } catch (err) {
    res.status(500).json({ error: error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedAccount = req.body;
  try {
    const accounts = await dbAccts("accounts")
      .where({ id })
      .update(updatedAccount);
    if (accounts) {
      res.status(200).json(accounts);
    } else {
      res.status(404).json({ message: `could not find account` });
    }
  } catch {
    res.status(500).json({ error: err });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const accounts = await dbAccts("accounts")
      .where({ id })
      .del();
    if (accounts) {
      res.status(200).json(accounts);
    } else {
      res.status(404).json({ message: `could not delete account` });
    }
  } catch {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
