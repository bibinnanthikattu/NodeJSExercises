import "dotenv/config";
import express from "express";
import app from "./app";
import config from "./config";

const port = config.port;

app.listen(5000, () => {
  console.log(`server is running on port: ${port} `);
});
