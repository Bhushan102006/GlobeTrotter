const userService = require('../services/user.service');

async function getProfileController(req, res) {
  const user = await userService.getUserProfile(req.user.id);

  return res.status(200).json({
    status: 'success',
    message: 'User profile fetched successfully',
    response: user,
  });
}

async function updateProfileController(req, res) {
  const user = await userService.updateUserProfile(req.user.id, req.body);

  return res.status(200).json({
    status: 'success',
    message: 'Profile updated successfully',
    response: user,
  });
}

module.exports = {
  getProfileController,
  updateProfileController,
};

