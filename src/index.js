const { insertNewURL, deleteURL, findURL } = require("./db");
const rateLimit = require("express-rate-limit");
const express = require("express");
const crypto = require("crypto");
const morgan = require("morgan");
const helmet = require("helmet");
const isURL = require("is-url");
const cors = require("cors");
const PORT = process.env.PORT || 1000;

let app = express();

app.use(express.json());
app.use(morgan("combined"));
app.use(helmet());
app.use(cors());

let getURLRequest = (req, res) => {
  let offset = req.path.replace("/", "");
  findURL(offset).then((results) => {
    if (results === null) return res.json({ error: "No URL Found" });
    res.redirect(results.url);
  });
};
app.get("/*", getURLRequest);

app.use(
  rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 5,
    message: "You can only do 5 requests every 15 minutes.",
  })
);

let createURLRequest = (req, res) => {
  let url = req.body.url;
  if (!isURL(url)) return res.json({ error: "Please provide a valid URL." });
  let offset = crypto.randomBytes(4).toString("hex");
  let secret = crypto.randomBytes(8).toString("hex");
  insertNewURL(offset, secret, url).then((results) => {
    res.json({
      message:
        "URL created successfully, keep the secret to delete in the future.",
      URL: `http://localhost:1000/${offset}`,
      secret: secret,
    });
  });
};
app.post("/url/create", createURLRequest);

let deleteURLRequest = (req, res) => {
  let secret = req.body.secret;
  deleteURL(secret).then((results) => {
    if (results.value === null)
      return res.json({ error: "No URL connected to that secret." });
    res.json({
      message: "URL deleted successfully.",
      shortened: results.url,
    });
  });
};
app.post("/url/delete", deleteURLRequest);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
