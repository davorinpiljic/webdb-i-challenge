const express = require("express");

const db = require("./data/dbConfig.js");
const AccountsRouter = require("./data/Accounts/accountsRouter.js");
const server = express();

server.use(express.json());

server.use("/accounts", AccountsRouter);

module.exports = server;
