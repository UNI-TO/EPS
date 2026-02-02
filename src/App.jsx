import React, { useState } from 'react';
import { BookOpen, GraduationCap } from 'lucide-react';
import HomePage from './components/layout/HomePage';
import Header from './components/layout/Header';
import EPSQuizApp from './components/quiz/EPSQuizApp';
import QuizEsameReale from './components/quiz/QuizEsameReale';
import QuizTeoricoAvanzato from './components/quiz/QuizTeoricoAvanzato';
import QuizDalleImmagini from './components/quiz/QuizDalleImmagini';
import QuizChiQuadro from './components/quiz/QuizChiQuadro';
import QuizDistribuzioniContinue from './components/quiz/QuizDistribuzioniContinue';
import QuizDistribuzioniDiscrete from './components/quiz/QuizDistribuzioniDiscrete';
import QuizTestIpotesi from './components/quiz/QuizTestIpotesi';
import QuizErroriComuni from './components/quiz/QuizErroriComuni';
import SimulatoreR from './components/R-quiz/quiz-1';
import EPSExamSimulator from './components/exams/EPSExamSimulator';
import Quiz18Feb from './components/exams/Quiz18Feb';
import QuizGennaio2025 from './components/exams/QuizGennaio2025';
import QuizGennaio2025Turno2 from './components/exams/QuizGennaio2025Turno2';
import QuizFebbraio2025 from './components/exams/QuizFebbraio2025';
import QuizLuglio2025 from './components/exams/QuizLuglio2025';
import QuizLuglio2025Turno10 from './components/exams/QuizLuglio2025Turno10';
import QuizGennaio2025Turno4 from './components/exams/QuizGennaio2025Turno4';
import QuizLuglio2024 from './components/exams/QuizLuglio2024';
import QuizGiugno2024 from './components/exams/QuizGiugno2024';
import QuizGennaio2026Turno1 from './components/exams/QuizGennaio2026Turno1';
import QuizGennaio2026Turno2 from './components/exams/QuizGennaio2026Turno2';
import QuizScriptGennaio2021 from './components/quiz/QuizScriptGennaio2021';
import QuizScriptFebbraio from './components/quiz/QuizScriptFebbraio';
import StudyMaterials from './components/study/StudyMaterials';
import { categories as categoriesData } from './data/categories';

const App = () => {
    const [currentView, setCurrentView] = useState('home');

    // Aggiungi icone alle categorie
    const categories = categoriesData.map(cat => ({
        ...cat,
        icon: cat.id === 'quiz'
            ? <BookOpen className="w-8 h-8" />
            : cat.id === 'materiali'
            ? <BookOpen className="w-8 h-8" />
            : <GraduationCap className="w-8 h-8" />
    }));

    const renderComponent = () => {
        switch (currentView) {
            case 'EPSQuizApp':
                return <EPSQuizApp />;
            case 'QuizEsameReale':
                return <QuizEsameReale />;
            case 'QuizTeoricoAvanzato':
                return <QuizTeoricoAvanzato />;
            case 'QuizDalleImmagini':
                return <QuizDalleImmagini />;
            case 'QuizChiQuadro':
                return <QuizChiQuadro />;
            case 'QuizDistribuzioniContinue':
                return <QuizDistribuzioniContinue />;
            case 'QuizDistribuzioniDiscrete':
                return <QuizDistribuzioniDiscrete />;
            case 'QuizTestIpotesi':
                return <QuizTestIpotesi />;
            case 'QuizErroriComuni':
                return <QuizErroriComuni />;
            case 'SimulatoreR':
                return <SimulatoreR />;
            case 'EPSExamSimulator':
                return <EPSExamSimulator />;
            case 'Quiz18Feb':
                return <Quiz18Feb />;
            case 'QuizGennaio2025':
                return <QuizGennaio2025 />;
            case 'QuizGennaio2025Turno2':
                return <QuizGennaio2025Turno2 />;
            case 'QuizFebbraio2025':
                return <QuizFebbraio2025 />;
            case 'QuizLuglio2025':
                return <QuizLuglio2025 />;
            case 'QuizLuglio2025Turno10':
                return <QuizLuglio2025Turno10 />;
            case 'QuizGennaio2025Turno4':
                return <QuizGennaio2025Turno4 />;
            case 'QuizLuglio2024':
                return <QuizLuglio2024 />;
            case 'QuizGiugno2024':
                return <QuizGiugno2024 />;
            case 'QuizGennaio2026Turno1':
                return <QuizGennaio2026Turno1 />;
            case 'QuizGennaio2026Turno2':
                return <QuizGennaio2026Turno2 />;
            case 'QuizScriptGennaio2021':
                return <QuizScriptGennaio2021 />;
            case 'QuizScriptFebbraio':
                return <QuizScriptFebbraio />;
            case 'StudyMaterials':
                return <StudyMaterials />;
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
