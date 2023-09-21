const fs = require("fs"); // Imports fs module
const csv = require("csv-parser"); // Imports csv-parser

// Takes value parameter and normalizes data by converting string values to appropriate types
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

// Async function that takes filePath as argument
const readCSV = async (filePath) => {
  // Initializes an empty array to store parsed data
  const results = [];

  try {
    // Creates a readable stream from the file located at filePath
    // to allow file to be read chunk by chunk
    const stream = fs.createReadStream(filePath);
    // Pipes the readable stream to csv-parser to transform file's contents to JavaScript objects
    const parser = stream.pipe(csv());
    // Asynchronously iterates over streamed parsed data
    for await (const data of parser) {
      for (const key in data) {
        data[key] = normalizeDataField(data[key]);
      }
      // If parsed object has a property named 'setup', parse property as JSON, then normalize
      if (data.setup) {
        try {
          data.setup = JSON.parse(data.setup);
          data.setup = normalizeDataField(data.setup);
        } catch (e) {
          console.error("Error parsing setup:", e);
        }
      }
      // If parsed object has a property named 'features', parse property as JSON, then normalize
      if (data.features) {
        try {
          data.features = JSON.parse(data.features);
          data.features = normalizeDataField(data.features);
        } catch (e) {
          console.error("Error parsing features:", e);
        }
      }
      // Add normalized data to the results array
      results.push(data);
    }
    return results;
    // Catches any errors that might occur during CSV reading/parsing process
  } catch (error) {
    throw error;
  }
};

// Exports readCSV function to make available to other files/modules that require this module
module.exports = readCSV;
