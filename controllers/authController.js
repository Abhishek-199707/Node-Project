  const userModel = require('../models/User');
  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');
  const registerController = async (req, res) => {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'please provide all fields'
      });
    }

    try {
      const existingUser = await userModel.findOne({ email });
      console.log('Existing user:', existingUser);

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'user already exists'
        });
      }

      const salt = await bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = new userModel({
        userName,
        email,
        password: hashedPassword
      });

      console.log(user);
      await user.save();
      user.password = undefined;

      return res.status(201).json({
        success: true,
        message: 'user created successfully',
        user
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'server error',
        error
      });
    }
  };

  const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password',
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'yourSecretKey',
      { expiresIn: '7d' }
    );

    // Set cookie here
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    console.log(req.cookies);
    console.log('User logged in:', user);
    
    user.password = undefined;

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error,
    });
  }
};

const logoutController = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });

  return res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};


  module.exports = {
    registerController, loginController,logoutController
  };
