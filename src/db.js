const MongoClient = require("mongodb").MongoClient;
const MONGO_DB_URL = require("../config.json").MONGO_DB_URL;
const client = new MongoClient(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let collection;

client.connect((error) => {
  if (error) throw error;
  collection = client.db("URLs").collection("Data");
  console.log("DB Connected.");
});

let deleteURL = (secret) => {
  return collection.findOneAndDelete({ secret: secret });
};

let insertNewURL = (offset, secret, url) => {
  return collection.insertOne({ offset: offset, secret: secret, url: url });
};

let findURL = (offset) => {
  return collection.findOne({ offset: offset });
};

module.exports = { insertNewURL, deleteURL, findURL };
