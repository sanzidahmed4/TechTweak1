const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: ".env.local" });

async function createAdmin() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI not found in .env.local");
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("techtweak");
    const users = db.collection("users");

    const email = "admin@techtweak.com";
    const password = "password123";

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      console.log("Admin user already exists!");
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    await users.insertOne({
      email,
      password_hash,
      role: "admin",
      created_at: new Date(),
    });

    console.log("Successfully created default admin!");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);

  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    await client.close();
  }
}

createAdmin();
