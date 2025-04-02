import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// @desc Get User Profile
// @route GET /api/users/profile
// @access Private
export const getUserProfile = async (req, res) => { 
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('name email');

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ ...user.toObject(), password: '********' }); // Hide password
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// @desc Update User Profile
// @route PUT /api/users/profile
// @access Private
export const updateUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { name, email }, // Do not update password
      { new: true, select: 'name email' } // Return updated user
    );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};
