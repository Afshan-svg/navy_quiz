import quizSchema from "../models/quizSchema.js";

export const getQuestions = async (req, res) => {
  try {
    const { division } = req.query;
    const query = division ? { division } : {};
    const questions = await quizSchema.find(query).populate('division', 'name');
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const { division, question, options, answer } = req.body;
    if (!division || !question || !options || !answer) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const questionDoc = new quizSchema({ division, question, options, answer });
    await questionDoc.save();
    res.json({ message: 'Question created', question: questionDoc });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};