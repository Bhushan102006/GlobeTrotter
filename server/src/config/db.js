const mongoose = require("mongoose");
const dns = require("dns");

async function connectDb() {
  try {
    // Set reliable public DNS servers to prevent querySrv ECONNREFUSED DNS failures
    try {
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
    } catch (dnsErr) {
      // Ignore if setServers fails
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected sucessfully..");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
}

module.exports = connectDb;
