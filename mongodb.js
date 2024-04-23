// database.js

const { MongoClient } = require('mongodb');

// MongoDB connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'my_database';

// Preloaded data
const preloadedData = [
  { name: 'Item 1', price: 10 },
  { name: 'Item 2', price: 20 },
  { name: 'Item 3', price: 30 },
];

// Function to connect to MongoDB and insert preloaded data
async function connectAndInsertData() {
  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    // Connect to MongoDB
    await client.connect();

    // Select the database
    const db = client.db(dbName);

    // Insert preloaded data into a collection named 'items'
    const result = await db.collection('items').insertMany(preloadedData);
    console.log(`${result.insertedCount} documents inserted.`);
  } catch (error) {
    console.error('Error inserting documents:', error);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Export the connectAndInsertData function
module.exports = {
  connectAndInsertData,
};
