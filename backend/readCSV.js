const fs = require("fs");
const csv = require("csv-parser");

const normalizeDataField = (value) => {
  if (typeof value === "object") {
    for (const key in value) {
      value[key] = normalizeDataField(value[key]);
    }
    return value;
  }

  if (value === "TRUE") return true;
  if (value === "FALSE") return false;
  if (value === "NULL") return null;

  if (
    !isNaN(value) &&
    !isNaN(parseFloat(value)) &&
    Number.isInteger(Number(value))
  ) {
    return parseInt(value, 10);
  }

  return value;
};
const readCSV = (filePath) => {
  const results = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        for (const key in data) {
          data[key] = normalizeDataField(data[key]);
        }

        if (data.setup) {
          try {
            data.setup = JSON.parse(data.setup);
            data.setup = normalizeDataField(data.setup);
          } catch (e) {
            console.error("Error parsing setup:", e);
          }
        }

        if (data.features) {
          try {
            data.features = JSON.parse(data.features);
            data.features = normalizeDataField(data.features);
          } catch (e) {
            console.error("Error parsing features:", e);
          }
        }

        results.push(data);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

module.exports = readCSV;
