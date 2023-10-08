// Import the necessary Node.js modules
import * as fs from "fs";

// Define the path to the data.txt file
const filePath = "data.txt";

// Create a readable stream to read the file
const readStream = fs.createReadStream(filePath, { encoding: "utf8" });

// Initialize an empty array to store the lines
const lines: string[] = [];

// Listen for the 'data' event, which is emitted when data is read from the file
readStream.on("data", (chunk: string) => {
  // Split the data into lines and add them to the 'lines' array
  const chunkLines = chunk.split("\n");
  lines.push(...chunkLines);
});

// Listen for the 'end' event, which is emitted when the entire file has been read
readStream.on("end", () => {
  // Process the lines as needed
  const arr = [0, 0];
  for (const line of lines) {
    line == "T" ? arr[0]++ : arr[1]++;
  }
  console.log(arr);
});

// Listen for errors (e.g., file not found or permission issues)
readStream.on("error", (error: Error) => {
  console.error("An error occurred while reading the file:", error);
});
