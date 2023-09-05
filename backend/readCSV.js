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

const readCSV = async (filePath) => {
  const results = [];

  try {
    const stream = fs.createReadStream(filePath);
    const parser = stream.pipe(csv());
    for await (const data of parser) {
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
    }
    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = readCSV;
