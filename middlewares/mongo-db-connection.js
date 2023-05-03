const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    console.log(process.env.URI);
    await mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 30000 });
    console.log('Connected to MongoDB');
    const connection = mongoose.connection;
    connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
    });
    return mongoose.connection.db;
  } catch (error) {
    console.log('Error connecting to MongoDB:', error.message);
    throw error;
  }
}

async function disconnectFromDatabase() {
  try {
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.log('Error disconnecting from MongoDB:', error.message);
    throw error;
  }
};


module.exports = { connectToDatabase, disconnectFromDatabase };