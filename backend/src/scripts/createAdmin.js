const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/inventorydb';
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin';

async function run() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const existing = await User.findOne({ username: ADMIN_USER });
  if (existing) {
    console.log('Admin user already exists:', ADMIN_USER);
    return process.exit(0);
  }
  const hash = await bcrypt.hash(ADMIN_PASS, 10);
  const user = new User({ username: ADMIN_USER, passwordHash: hash, role: 'admin' });
  await user.save();
  console.log('Admin user created:', ADMIN_USER);
  process.exit(0);
}

run().catch(err => {
  console.error('Failed to create admin user', err);
  process.exit(1);
});
