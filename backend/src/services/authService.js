const User = require("../models/User");
const { generateToken } = require("../utils/tokenUtils");

class AuthService {
  async register({ name, email, password }) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  async login({ email, password }) {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  async getProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async updateProfile(userId, updates) {
    const { name, email } = updates;

    if (email) {
      const existingUser = await User.findOne({
        email,
        _id: { $ne: userId },
      });
      if (existingUser) {
        throw new Error("Email already in use");
      }
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}

module.exports = new AuthService();
