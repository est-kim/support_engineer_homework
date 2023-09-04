const express = require("express");
const readCSV = require("./readCSV.js");

const app = express();
const port = 3001;

let organizationData = [];
let accountData = [];

readCSV("./data/account_plan_orm.csv")
  .then((data) => {
    accountData = data;
  })
  .catch((error) => {
    console.error("Error reading account plan CSV:", error);
  });

readCSV("./data/organization_orm.csv")
  .then((data) => {
    organizationData = data;
  })
  .catch((error) => {
    console.error("Error reading organization CSV:", error);
  });

app.get("/api/accountData", (req, res) => {
  res.json(accountData);
});

app.get("/api/organizationData", (req, res) => {
  res.json(organizationData);
});

app.listen(port, () => {
  console.log("App listening on port 3001");
});
