import { Button, Card, Radio } from 'antd';

const QuizQuestions = ({ category, questions, userAnswers, onOptionChange, onSubmit, submitted }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-blue-900 text-center">
        {category} Quiz
      </h1>
      {questions.length === 0 ? (
        <p className="text-lg text-blue-800">No questions available for this category.</p>
      ) : (
        <div className="w-full max-w-2xl space-y-6">
          {questions.map((q) => (
            <Card
              key={q._id}
              title={<span className="text-lg font-semibold text-blue-800">{q.question}</span>}
              className="shadow-lg hover:shadow-xl transition-shadow duration-300"
              bodyStyle={{ padding: '20px' }}
            >
              <Radio.Group
                onChange={(e) => onOptionChange(q._id, e.target.value)}
                value={userAnswers[q._id]}
                disabled={submitted}
                className="flex flex-col space-y-2"
              >
                {q.options.map((opt) => (
                  <Radio key={opt} value={opt} className="text-gray-700">
                    {opt}
                  </Radio>
                ))}
              </Radio.Group>
            </Card>
          ))}
          <Button
            type="primary"
            size="large"
            onClick={onSubmit}
            disabled={submitted || questions.length === 0}
            className="w-full mt-4"
          >
            Submit Quiz
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizQuestions;