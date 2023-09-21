const express = require("express"); // Imports express module
const readCSV = require("./readCSV.js"); // Imports readCSV function

const app = express(); // Creates express app instance
const port = 3001; // Defines port # which server will listen to for incoming requests

/**
 * Loads account and organization data from CSV files.
 *
 * @return {Object} An object containing the loaded account and organization data.
 */

const loadData = async () => {
  try {
    const [accountData, organizationData] = await Promise.all([
      readCSV("./data/account_plan_orm.csv"),
      readCSV("./data/organization_orm.csv")
    ]);
    return { accountData, organizationData };
  } catch (error) {
    console.error("Error reading CSV:", error);
    return { accountData: [], organizationData: [] };
  }
};

// Handles GET request to endpoints
// Once retrieved, calls the loadData function to get data and sends back as a JSON response
app.get("/api/accountData", async (req, res) => {
  const { accountData } = await loadData();
  res.json(accountData);
});

app.get("/api/organizationData", async (req, res) => {
  const { organizationData } = await loadData();
  res.json(organizationData);
});

// Starts server on port 3001
app.listen(port, () => {
  console.log("App listening on port 3001");
});
