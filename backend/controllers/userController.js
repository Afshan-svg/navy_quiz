import User from '../models/userModel.js';

export const createUser = async (req, res) => {
  try {
    const { name, password, role } = req.body;

    if (!name || !password || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newUser = new User({ name, password, role, score: 0 });
    await newUser.save();

    res.status(201).json({ message: 'User created', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-__v');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name, password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateScore = async (req, res) => {
    try {
      const { name, score } = req.body;
  
      if (!name || score === undefined) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const user = await User.findOneAndUpdate(
        { name },
        { score },
        { new: true, select: '-password' } // Return updated user, exclude password
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'Score updated', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
