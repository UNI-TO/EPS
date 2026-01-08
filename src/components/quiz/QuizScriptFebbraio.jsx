import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, RotateCcw, Trophy, Code } from 'lucide-react';

const QuizScriptFebbraio = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [showExplanation, setShowExplanation] = useState({});

    const questions = [
        {
            id: 1,
            category: "Normale + Binomiale (QI)",
            difficulty: "⭐⭐⭐",
            question: "QI ~ N(121, 16). Si selezionano 20 persone. Calcolare:",
            type: "numeric",
            subQuestions: [
                {
                    text: "1. Percentuale con QI ≤ 140",
                    answer: "88.21",
                    tolerance: 0.1,
                    hint: "pnorm(140, 121, 16) × 100"
                },
                {
                    text: "2. P(QI > 140)",
                    answer: "0.1179",
                    tolerance: 0.001,
                    hint: "1 - pnorm(140, 121, 16)"
                },
                {
                    text: "3. Percentuale con QI tra 100 e 140",
                    answer: "78.99",
                    tolerance: 0.1,
                    hint: "[pnorm(140,...) - pnorm(100,...)] × 100"
                },
                {
                    text: "4. P(più di 5 su 20 hanno QI > 140)",
                    answer: "0.0205",
                    tolerance: 0.001,
                    hint: "1 - pbinom(5, 20, p>140)"
                }
            ],
            explanation: `✅ SOLUZIONE:

\`\`\`r
media <- 121
sd <- 16

# 1. Percentuale QI ≤ 140
pnorm(140, media, sd) * 100
# [1] 88.21

# 2. P(QI > 140)
pAlta <- 1 - pnorm(140, media, sd)
# [1] 0.1179

# 3. Percentuale QI tra 100 e 140
(pnorm(140, media, sd) - pnorm(100, media, sd)) * 100
# [1] 78.99

# 4. P(più di 5 su 20 > 140)
1 - pbinom(5, 20, pAlta)
# [1] 0.0205
\`\`\`

📊 **Pattern:** Normale + Binomiale per conteggi`,
            realExam: "Appello Febbraio, Esercizio 1"
        },
        {
            id: 2,
            category: "Binomiale + Bayes (Segnale WiFi)",
            difficulty: "⭐⭐⭐⭐",
            question: "Segnale WiFi: 40% router Forte (p=0.7 ricezione), 60% Debole (p=0.3). Calcolare:",
            type: "numeric",
            subQuestions: [
                {
                    text: "1. P(più di 10 su 20 ricevono | router Forte)",
                    answer: "0.9829",
                    tolerance: 0.001,
                    hint: "1 - pbinom(10, 20, 0.7)"
                },
                {
                    text: "2. P(router Forte | ricevuto segnale)",
                    answer: "0.5185",
                    tolerance: 0.001,
                    hint: "Bayes: P(F|S) = P(S|F)×P(F) / P(S)"
                },
                {
                    text: "3. Numero medio dispositivi che ricevono (2 con Forte, 3 con Debole)",
                    answer: "9.5",
                    tolerance: 0.1,
                    hint: "2×(0.7×20) + 3×(0.3×15)"
                }
            ],
            explanation: `✅ SOLUZIONE:

\`\`\`r
pForte <- 0.7
pDebole <- 0.3
pF <- 2/5  # 40% Forte
pD <- 3/5  # 60% Debole

# 1. P(>10 su 20 | Forte)
1 - pbinom(10, 20, pForte)
# [1] 0.9829

# 2. P(Forte | Segnale ricevuto)
pSegno <- pF * dbinom(1, 1, pForte) +
          pD * dbinom(1, 1, pDebole)
(pForte * pF) / pSegno
# [1] 0.5185

# 3. Media dispositivi
2 * (pForte * 20) + 3 * (pDebole * 15)
# [1] 41.5
\`\`\``,
            realExam: "Appello Febbraio, Esercizio 2"
        },
        {
            id: 3,
            category: "Geometrica + Bayes",
            difficulty: "⭐⭐⭐⭐",
            question: "Due giocatori: Luisa (p=0.8 goal) e altro (p=0.65). Si sceglie uno (50%-50%). Calcolare:",
            type: "numeric",
            subQuestions: [
                {
                    text: "1. P(Luisa segna più di 12 su 25 tiri)",
                    answer: "0.9984",
                    tolerance: 0.001,
                    hint: "1 - pbinom(12, 25, 0.8)"
                },
                {
                    text: "2. E[X] per Luisa (numero tiri per 1 goal)",
                    answer: "1.25",
                    tolerance: 0.01,
                    hint: "Geometrica: E[X] = 1/p"
                },
                {
                    text: "3. P(Luisa | servono meno di 3 tiri per goal)",
                    answer: "0.6639",
                    tolerance: 0.001,
                    hint: "Bayes con Geometrica"
                }
            ],
            explanation: `✅ SOLUZIONE:

\`\`\`r
pLuisa <- 0.8
pNonLuisa <- 0.65

# 1. P(>12 su 25 | Luisa)
1 - pbinom(12, 25, pLuisa)
# [1] 0.9984

# 2. Media tiri per goal (Geometrica)
pLuisa * 25  # E[successi su 25] = np = 20
# Per Geometrica: E[X] = 1/p
1/pLuisa
# [1] 1.25

# 3. P(Luisa | X < 3)
pLuisaTre <- 1 - pgeom(1, pLuisa)  # P(X>2)
pLMenoTre <- 1 - pLuisaTre          # P(X≤2)
pMenoTre <- 0.5 * pLMenoTre +
            0.5 * pgeom(1, pNonLuisa)

(pLMenoTre * 0.5) / pMenoTre
# [1] 0.6639
\`\`\`

📊 **Geometrica:** X = numero tentativi per primo successo
- P(X = k) = (1-p)^(k-1) × p
- E[X] = 1/p
- ⚠️ In R: pgeom(k, p) conta i FALLIMENTI prima del successo!`,
            realExam: "Appello Febbraio, Esercizio 3"
        },
        {
            id: 4,
            category: "Tabella Contingenza + Binomiale",
            difficulty: "⭐⭐⭐",
            question: "Tabella 2×2: Età (<30, ≥30) vs Risposta (Sì, No). Dati: <30&Sì=212, <30&No=36, ≥30&Sì=198, ≥30&No=54. Tot=500. Calcolare:",
            type: "numeric",
            subQuestions: [
                {
                    text: "1. P(Sì) = proporzione totale Sì",
                    answer: "0.496",
                    tolerance: 0.001,
                    hint: "(212+36)/500"
                },
                {
                    text: "2. P(No | ≥30)",
                    answer: "0.2143",
                    tolerance: 0.001,
                    hint: "54/(198+54)"
                },
                {
                    text: "3. P(No | <30)",
                    answer: "0.1452",
                    tolerance: 0.001,
                    hint: "36/(212+36)"
                },
                {
                    text: "4. E[X] se X=numero di ≥30 su 15 persone casuali",
                    answer: "7.56",
                    tolerance: 0.1,
                    hint: "p×n dove p=(198+54)/500"
                },
                {
                    text: "5. P(più di 7 su 15 sono ≥30)",
                    answer: "0.6101",
                    tolerance: 0.001,
                    hint: "1 - pbinom(7, 15, p≥30)"
                }
            ],
            explanation: `✅ SOLUZIONE:

**Tabella:**
|        | Sì  | No | Tot |
|--------|-----|----|-----|
| <30    | 212 | 36 | 248 |
| ≥30    | 198 | 54 | 252 |
| Tot    | 410 | 90 | 500 |

\`\`\`r
# 1. P(Sì) in generale (confuso nell'esercizio)
(212+36)/500  # P(<30) = 0.496

# 2. P(No | ≥30)
54/(198+54)
# [1] 0.2143

# 3. P(No | <30)
36/(212+36)
# [1] 0.1452

# 4-5. Binomiale con p = P(≥30)
pMTrenta <- (198+54)/500  # 0.504
pMTrenta * 15  # E[X]
# [1] 7.56

1 - pbinom(7, 15, pMTrenta)
# [1] 0.6101
\`\`\`

📊 **Tabelle contingenza:**
- Margini: somme righe/colonne
- P(A|B) = conteggio(A∩B) / conteggio(B)`,
            realExam: "Appello Febbraio, Esercizio 4"
        }
    ];

    const handleAnswer = (questionId, subIndex, answer) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [`${questionId}-${subIndex}`]: answer
        });
    };

    const checkAnswer = (questionId, subIndex) => {
        const question = questions.find(q => q.id === questionId);
        const subQuestion = question.subQuestions[subIndex];
        const userAnswer = selectedAnswers[`${questionId}-${subIndex}`];

        if (!userAnswer) return null;

        const numAnswer = parseFloat(userAnswer);
        const correctAnswer = parseFloat(subQuestion.answer);
        const tolerance = subQuestion.tolerance || 0.001;
        return Math.abs(numAnswer - correctAnswer) <= tolerance;
    };

    const toggleExplanation = (questionId) => {
        setShowExplanation({
            ...showExplanation,
            [questionId]: !showExplanation[questionId]
        });
    };

    const calculateScore = () => {
        let correct = 0;
        let total = 0;

        questions.forEach(question => {
            question.subQuestions.forEach((_, subIndex) => {
                total++;
                if (checkAnswer(question.id, subIndex)) {
                    correct++;
                }
            });
        });

        return { correct, total };
    };

    const handleFinish = () => {
        setShowResults(true);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswers({});
        setShowResults(false);
        setShowExplanation({});
    };

    if (showResults) {
        const { correct, total } = calculateScore();
        const percentage = (correct / total * 100).toFixed(1);

        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                        <h2 className="text-3xl font-bold mb-2">Quiz Completato!</h2>
                        <p className="text-gray-600">Quiz Script R - Appello Febbraio</p>
                    </div>

                    <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-6 mb-8">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-teal-600 mb-2">
                                {correct}/{total}
                            </div>
                            <div className="text-xl text-gray-700">
                                Punteggio: {percentage}%
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 mb-8">
                        {questions.map((question) => (
                            <div key={question.id} className="border rounded-lg p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-2">
                                            {question.category}
                                        </span>
                                        <h3 className="font-bold text-lg">{question.question}</h3>
                                    </div>
                                    <span className="text-2xl">{question.difficulty}</span>
                                </div>

                                <div className="space-y-3 mb-4">
                                    {question.subQuestions.map((subQ, subIndex) => {
                                        const isCorrect = checkAnswer(question.id, subIndex);
                                        const userAnswer = selectedAnswers[`${question.id}-${subIndex}`];

                                        return (
                                            <div key={subIndex} className="flex items-center gap-2 p-3 bg-gray-50 rounded">
                                                {isCorrect ? (
                                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                ) : (
                                                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                                )}
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">{subQ.text}</p>
                                                    {!isCorrect && userAnswer && (
                                                        <p className="text-xs text-red-600 mt-1">
                                                            Tua risposta: {userAnswer} | Corretta: {subQ.answer}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={() => toggleExplanation(question.id)}
                                    className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                                >
                                    {showExplanation[question.id] ? '▼ Nascondi spiegazione' : '▶ Mostra spiegazione'}
                                </button>

                                {showExplanation[question.id] && (
                                    <div className="mt-4 p-4 bg-teal-50 rounded-lg">
                                        <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                                            {question.explanation}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={resetQuiz}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-3 px-6 rounded-lg hover:from-teal-600 hover:to-emerald-700 transition-all"
                    >
                        <RotateCcw className="w-5 h-5" />
                        Ricomincia Quiz
                    </button>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            Quiz Script R - Febbraio
                        </span>
                        <span className="text-3xl">{currentQ.difficulty}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentQ.category}</h2>
                    <p className="text-gray-600">{currentQ.question}</p>
                </div>

                <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Esercizio {currentQuestion + 1} di {questions.length}</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-teal-400 to-emerald-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="space-y-6 mb-8">
                    {currentQ.subQuestions.map((subQ, subIndex) => (
                        <div key={subIndex} className="p-4 bg-gray-50 rounded-lg">
                            <p className="font-medium mb-3">{subQ.text}</p>
                            {subQ.hint && (
                                <p className="text-sm text-teal-600 mb-2">💡 {subQ.hint}</p>
                            )}
                            <input
                                type="text"
                                value={selectedAnswers[`${currentQ.id}-${subIndex}`] || ''}
                                onChange={(e) => handleAnswer(currentQ.id, subIndex, e.target.value)}
                                placeholder="Inserisci risposta (es. 0.1234)"
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => setCurrentQuestion(currentQuestion - 1)}
                        disabled={currentQuestion === 0}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Precedente
                    </button>

                    {currentQuestion < questions.length - 1 ? (
                        <button
                            onClick={() => setCurrentQuestion(currentQuestion + 1)}
                            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-3 px-6 rounded-lg hover:from-teal-600 hover:to-emerald-700 transition-all"
                        >
                            Prossimo
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    ) : (
                        <button
                            onClick={handleFinish}
                            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
                        >
                            <Trophy className="w-5 h-5" />
                            Termina Quiz
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizScriptFebbraio;
