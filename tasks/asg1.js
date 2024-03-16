import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const questions = [
    {
        question: 'What is the capital of France?',
        options: ['London', 'Paris', 'Berlin'],
        answer: 'Paris',
    },
    {
        question: 'Which planet is closest to the sun?',
        options: ['Venus', 'Mercury', 'Mars'],
        answer: 'Mercury',
    },
    {
        question: 'Who is the final prophet in Islam?',
        options: ['Prophet Moses', 'Prophet Jesus', 'Prophet Muhammad'],
        answer: 'Prophet Muhammad',
    },
    {
        question: 'Which month of the Islamic calendar is fasting observed?',
        options: ['Rajab', 'Ramadan', 'Shawwal'],
        answer: 'Ramadan',
    },
    {
        question: 'What is the first pillar of Islam?',
        options: ['Shahada', 'Salah', 'Zakat'],
        answer: 'Shahada',
    },
    {
        question: 'What is the holy book of Islam?',
        options: ['Quran', 'Torah', 'Bible'],
        answer: 'Quran',
    },
    {
        question: 'How many times a day do Muslims perform the Salah (prayer)?',
        options: ['Three', 'Four', 'Five'],
        answer: 'Five',
    },
    {
        question: 'Where did the Prophet Muhammad receive his first revelation?',
        options: ['Kaaba', 'Mount Sinai', 'Mount Hira'],
        answer: 'Mount Hira',
    },
    {
        question: 'What is the pilgrimage to Mecca called?',
        options: ['Salah', 'Hijrah', 'Hajj'],
        answer: 'Hajj',
    },
    {
        question: 'Which wife of the Prophet is known for her scholarship and narration of Hadith?',
        options: ['Aisha', 'Khadijah', 'Fatimah'],
        answer: 'Aisha',
    },
    {
        question: 'What is the name of the angel who brought revelations to the Prophet Muhammad?',
        options: ['Jibril', 'Mikail', 'Israfil'],
        answer: 'Jibril',
    },
    // Add more Islamic-related questions as needed
];

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [skippedQuestions, setSkippedQuestions] = useState(0);

    const handleAnswer = (selectedOption) => {
        const correctAnswer = questions[currentQuestion].answer;
        if (selectedOption === correctAnswer) {
            setCorrectAnswers(correctAnswers + 1);
        } else {
            setWrongAnswers(wrongAnswers + 1);
        }
        nextQuestion();
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            showResults();
        }
    };

    const skipQuestion = () => {
        setSkippedQuestions(skippedQuestions + 1);
        nextQuestion();
    };

    const showResults = () => {
        Alert.alert(
            'Quiz Ended',
            `Total Questions: ${questions.length}\nCorrect Answers: ${correctAnswers}\nWrong Answers: ${wrongAnswers}\nSkipped Questions: ${skippedQuestions}`,
            [{ text: 'OK' }],
        );
        // You can perform further actions or navigation after displaying the results
    };

    return (
        <View style={styles.container}>
            <View style={styles.quizBox}>
                <Text style={styles.question}>
                    Question {currentQuestion + 1}: {questions[currentQuestion].question}
                </Text>
                {questions[currentQuestion].options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.optionButton}
                        onPress={() => handleAnswer(option)}
                    >
                        <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.skipButton} onPress={skipQuestion}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
    },
    quizBox: {
        width: '80%',
        alignItems: 'center',
    },
    question: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    optionButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 10,
        width: '100%',
    },
    optionText: {
        fontSize: 16,
        textAlign: 'center',
    },
    skipButton: {
        backgroundColor: '#ff6666',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 20,
        width: '100%',
    },
    skipText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
    },
});

export default Quiz;
