import divisionSchema from "../models/divisionSchema.js";
import mongoose from 'mongoose';
import multer from 'multer';

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
    }
  },
});

export const uploadMiddleware = upload.single('image'); // Middleware for single image upload

export const createDivision = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Division name is required' });
    }

    const divisionData = { name };

    // Handle image if uploaded
    if (req.file) {
      divisionData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const division = new divisionSchema(divisionData);
    await division.save();

    res.status(201).json({ message: 'Division created', division });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Division name must be unique' });
    } else if (error.message.includes('Invalid file type')) {
      res.status(400).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

export const getDivisions = async (req, res) => {
  try {
    const divisions = await divisionSchema.find().select('name image createdAt');
    const divisionsWithImages = divisions.map((division) => ({
      ...division._doc,
      _id: division._id.toString(),
      image: division.image
        ? `data:${division.image.contentType};base64,${division.image.data.toString('base64')}`
        : null,
    }));
    res.status(200).json(divisionsWithImages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};