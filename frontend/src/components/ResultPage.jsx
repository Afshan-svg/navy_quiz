import { useState } from 'react';
import { Button, Card, Input, message } from 'antd';
import axios from 'axios';

const ResultPage = ({ score, total, userAnswers, onRestart, category, questions }) => {
    const [userName, setUserName] = useState('');
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadCertificate = async () => {
        if (!userName.trim()) {
            message.error('Please enter your name for the certificate.');
            return;
        }

        setIsDownloading(true);
        try {
            const response = await axios.post(
                'http://localhost:5000/api/generate-certificate',
                {
                    userName,
                    category,
                    score,
                    total,
                },
                { responseType: 'blob' }
            );

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${category}_Quiz_Certificate.pdf`;
            a.click();
            window.URL.revokeObjectURL(url);
            message.success('Certificate downloaded successfully!');
        } catch (error) {
            console.error('Download error:', error);
            message.error('Failed to download certificate. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

    console.log('Questions:', questions);
    console.log('User Answers:', userAnswers);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-blue-900 text-center">
                {category} Quiz Results
            </h1>
            <p className="text-xl font-semibold text-blue-700 mb-4">
                You scored {score} out of {total}
            </p>

            <Card className="w-full max-w-2xl shadow-xl">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                        Detailed Answers
                    </h2>
                    <div className="space-y-6">
                        {questions.map((q) => {
                            const userAnswer = userAnswers[q._id];
                            const correctAnswer = q.answer;
                            const isCorrect =
                                userAnswer !== undefined &&
                                userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
                            console.log(`Question ${q._id}:`, {
                                userAnswer,
                                correctAnswer,
                                isCorrect,
                                userAnswerTrimmed: userAnswer?.trim(),
                                correctAnswerTrimmed: correctAnswer?.trim(),
                            });

                            return (
                                <div key={q._id} className="text-left">
                                    <p className="font-medium text-gray-800">{q.question}</p>
                                    <p className="text-sm">
                                        Your answer:{' '}
                                        <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                                            {userAnswer !== undefined ? userAnswer : 'Not answered'}
                                        </span>
                                    </p>
                                    {userAnswer !== undefined && !isCorrect && correctAnswer !== undefined && (
                                        <p className="text-sm text-green-600">Correct answer: {correctAnswer}</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-6">
                        <Input
                            placeholder="Enter your name for the certificate"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="mb-4"
                            size="large"
                        />
                        <Button
                            type="primary"
                            size="large"
                            onClick={handleDownloadCertificate}
                            className="w-full mb-4"
                            loading={isDownloading}
                            disabled={isDownloading}
                        >
                            Download Certificate (PDF)
                        </Button>
                        <Button type="primary" size="large" onClick={onRestart}>
                            Restart Quiz
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ResultPage;