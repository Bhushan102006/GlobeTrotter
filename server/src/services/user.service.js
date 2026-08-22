const User = require('../models/user.model');

async function getUserProfile(userId) {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    name: user.name,
    email: user.email,
    phone: user.phone,
    city: user.city,
    country: user.country,
    additionalInfo: user.additionalInfo,
    role: user.role,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

async function updateUserProfile(userId, updateData) {
  const allowedFields = {
    firstName: updateData.firstName,
    lastName: updateData.lastName,
    phone: updateData.phone,
    city: updateData.city,
    country: updateData.country,
    additionalInfo: updateData.additionalInfo,
  };

  const user = await User.findById(userId);

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  Object.keys(allowedFields).forEach((key) => {
    if (allowedFields[key] !== undefined) {
      user[key] = allowedFields[key];
    }
  });

  if (user.firstName || user.lastName) {
    user.name = [user.firstName, user.lastName].filter(Boolean).join(' ').trim();
  }

  await user.save();

  return getUserProfile(userId);
}

module.exports = {
  getUserProfile,
  updateUserProfile,
};
