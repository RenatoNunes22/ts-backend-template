import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const { MONGO_URL } = process.env;

if (!MONGO_URL) {
  throw new Error("Mongo url is not defined");
}

export const dbClient = new MongoClient(MONGO_URL, {});

dbClient
  .connect()
  .then(() => {
    console.log("connected to the database");
  })
  .catch((error) => {
    throw new Error(error);
  });
