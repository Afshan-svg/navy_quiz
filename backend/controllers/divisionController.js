import divisionSchema from "../models/divisionSchema.js";

export const getDivisions = async (req, res) => {
  try {
    const divisions = await divisionSchema.find();
    res.json(divisions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createDivision = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Division name is required' });
    }
    const division = new divisionSchema({ name });
    await division.save();
    res.json({ message: 'Division created', division });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Division name must be unique' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};