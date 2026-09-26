import mongoose from 'mongoose';

let cached = (global as any /* eslint-disable-line @typescript-eslint/no-explicit-any */ as { mongoose: any }).mongoose;

if (!cached) {
  cached = (global as any /* eslint-disable-line @typescript-eslint/no-explicit-any */ as { mongoose: any }).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.warn("MONGODB_URI is not defined.");
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: "techtweak",
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.warn("MongoDB connection failed. This is expected during build if DB is unreachable.", e);
    return null;
  }

  return cached.conn;
}

export default connectToDatabase;
