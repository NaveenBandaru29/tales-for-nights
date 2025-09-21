import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// 1. Correctly declare the global variable type
declare global {
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase(): Promise<Mongoose> {
  // If a connection is already cached, return it immediately.
  if (cached.conn) {
    console.log("Using cached database connection.");
    return cached.conn;
  }

  // If a connection promise is not yet cached, create and cache it.
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // 2. Add non-null assertion to MONGODB_URI
    cached.promise = mongoose.connect(MONGODB_URI!, opts)
      .then((mongooseInstance) => {
        console.log("Successfully connected to database.");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("Database connection failed:", err);
        // Clear the promise so that a new connection is attempted on the next call.
        cached.promise = null;
        throw err;
      });
  }

  // Await the connection promise and cache the result.
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
