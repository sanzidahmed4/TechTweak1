require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: "admin" },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function seedAdmin() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log("No MONGODB_URI found");
    return;
  }
  
  await mongoose.connect(uri);
  console.log("Connected to MongoDB Atlas");
  
  const email = "admin@techtweak.com";
  const password = "password123";
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log("Admin user already exists. Email: " + email);
  } else {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    
    await User.create({
      email,
      password_hash,
      name: "Sanzid Admin",
      role: "admin"
    });
    console.log("Created admin user successfully!");
    console.log("Email: " + email);
    console.log("Password: " + password);
  }
  
  mongoose.connection.close();
}

seedAdmin().catch(console.error);
