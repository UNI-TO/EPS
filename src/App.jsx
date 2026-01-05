import React, { useState } from 'react';
import { BookOpen, GraduationCap } from 'lucide-react';
import HomePage from './components/layout/HomePage';
import Header from './components/layout/Header';
import EPSQuizApp from './components/quiz/EPSQuizApp';
import QuizEsameReale from './components/quiz/QuizEsameReale';
import SimulatoreR from './components/R-quiz/quiz-1';
import EPSExamSimulator from './components/exams/EPSExamSimulator';
import Quiz18Feb from './components/exams/Quiz18Feb';
import { categories as categoriesData } from './data/categories';

const App = () => {
    const [currentView, setCurrentView] = useState('home');

    // Aggiungi icone alle categorie
    const categories = categoriesData.map(cat => ({
        ...cat,
        icon: cat.id === 'quiz'
            ? <BookOpen className="w-8 h-8" />
            : <GraduationCap className="w-8 h-8" />
    }));

    const renderComponent = () => {
        switch (currentView) {
            case 'EPSQuizApp':
                return <EPSQuizApp />;
            case 'QuizEsameReale':
                return <QuizEsameReale />;
            case 'SimulatoreR':
                return <SimulatoreR />;
            case 'EPSExamSimulator':
                return <EPSExamSimulator />;
            case 'Quiz18Feb':
                return <Quiz18Feb />;
            default:
                return null;
        }
    };

    const handleBackToHome = () => {
        setCurrentView('home');
    };

    if (currentView !== 'home') {
        return (
            <div className="min-h-screen">
                <Header onBackToHome={handleBackToHome} />
                <div className="p-6">
                    {renderComponent()}
                </div>
            </div>
        );
    }

    return (
        <HomePage
            categories={categories}
            onSelectItem={setCurrentView}
        />
    );
};

export default App;
