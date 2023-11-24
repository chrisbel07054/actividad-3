const mongo = require("mongodb");
const migrate = require("mongo-migrate");

const client = new mongo.MongoClient("mongodb://localhost:27017/my_database");

migrate.init(client);
