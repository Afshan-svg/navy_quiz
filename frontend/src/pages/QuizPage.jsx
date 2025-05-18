import { useState, useEffect } from 'react';
import { message, Spin } from 'antd';
import axios from 'axios';
import 'antd/dist/reset.css';
import CategorySelection from '../components/CategorySelection';
import QuizQuestions from '../components/QuizQuestions';
import ResultPage from '../components/ResultPage';

const QuizPage = () => {
  const [selectedDivisionId, setSelectedDivisionId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [divisionName, setDivisionName] = useState('');
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch questions when a division is selected
  const fetchQuestions = async (divisionId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/questions?division=${divisionId}`);
      const divisionResponse = await axios.get(`http://localhost:5000/api/divisions`);
      const division = divisionResponse.data.find((d) => d._id === divisionId);
      setQuestions(response.data);
      setDivisionName(division?.name || 'Unknown');
    } catch (error) {
      message.error('Failed to fetch questions');
      setQuestions([]);
      setDivisionName('');
    } finally {
      setLoading(false);
    }
  };

  const handleDivisionSelect = (divisionId) => {
    setSelectedDivisionId(divisionId);
    setUserAnswers({});
    setSubmitted(false);
    setShowResults(false);
    setScore(0);
    fetchQuestions(divisionId);
  };

  const handleOptionChange = (qId, option) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = async () => {
    let score = 0;
    questions.forEach((q) => {
      if (userAnswers[q._id] === q.answer) score++;
    });
    setScore(score);
    setSubmitted(true);
    setShowResults(true);
    message.success(`You scored ${score} out of ${questions.length}`);

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.name) {
        message.error('User not logged in');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/update-score', {
        name: user.name,
        score,
      });
      message.success(response.data.message);
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to update score');
    }
  };

  const handleRestart = () => {
    setSelectedDivisionId(null);
    setQuestions([]);
    setDivisionName('');
    setUserAnswers({});
    setSubmitted(false);
    setShowResults(false);
    setScore(0);
  };

  if (!selectedDivisionId) {
    return <CategorySelection onCategorySelect={handleDivisionSelect} />;
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4">
        <Spin tip="Loading questions..." />
      </div>
    );
  }

  if (showResults) {
    return (
      <ResultPage
        score={score}
        total={questions.length}
        userAnswers={userAnswers}
        onRestart={handleRestart}
        category={divisionName}
        questions={questions}
      />
    );
  }

  return (
    <QuizQuestions
      category={divisionName}
      questions={questions}
      userAnswers={userAnswers}
      onOptionChange={handleOptionChange}
      onSubmit={handleSubmit}
      submitted={submitted}
    />
  );
};

export default QuizPage;