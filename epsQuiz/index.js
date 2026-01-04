import React, { useState } from 'react';
import { CheckCircle, XCircle, Brain, Calculator, Code } from 'lucide-react';

const EPSQuizApp = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    const questions = [
        {
            id: 1,
            category: "Probabilità",
            type: "multiple",
            question: "Un sistema ha 5 sensori indipendenti con tempo di rottura Esponenziale di media 320 giorni. Il sistema è attivo se almeno 2 sensori funzionano. Qual è la distribuzione del tempo di rottura di un singolo sensore?",
            options: [
                "Esponenziale con λ = 1/320",
                "Esponenziale con λ = 320",
                "Normale con μ = 320",
                "Poisson con λ = 320"
            ],
            correct: 0,
            explanation: "Per una distribuzione Esponenziale, il parametro λ è l'inverso della media. Se E[X] = 320, allora λ = 1/320. La funzione di densità è f(x) = λe^(-λx)."
        },
        {
            id: 2,
            category: "Statistica",
            type: "multiple",
            question: "Hai calcolato un p-value = 0.03 per un test di ipotesi. Con significatività α = 0.05, quale affermazione è corretta?",
            options: [
                "Il campione casuale porta sufficiente evidenza per abbandonare l'ipotesi nulla",
                "Il campione casuale non porta sufficiente evidenza per abbandonare l'ipotesi nulla",
                "Non ci sono elementi sufficienti per rispondere",
                "L'ipotesi alternativa è sicuramente falsa"
            ],
            correct: 0,
            explanation: "Se p-value (0.03) < α (0.05), rifiutiamo H₀. Ci sono sufficienti evidenze statistiche per abbandonare l'ipotesi nulla a favore dell'alternativa."
        },
        {
            id: 3,
            category: "R Programming",
            type: "multiple",
            question: "Per escludere da un dataframe 'dati' tutte le osservazioni del gruppo A nella variabile 'gruppo', quale comando usi?",
            options: [
                "dati[dati$gruppo != 'A', ]",
                "dati[gruppo == 'A']",
                "subset(dati, gruppo = 'A')",
                "filter(dati, gruppo != 'A')"
            ],
            correct: 0,
            explanation: "In R base, dati[dati$gruppo != 'A', ] seleziona tutte le righe dove gruppo non è uguale a 'A'. La virgola finale indica 'tutte le colonne'. Anche filter() di dplyr funziona, ma con sintassi diversa."
        },
        {
            id: 4,
            category: "Teoria",
            type: "multiple",
            question: "La Legge dei Grandi Numeri afferma che:",
            options: [
                "La media campionaria converge alla media teorica all'aumentare della dimensione campionaria",
                "La somma di variabili normali è sempre normale",
                "La probabilità di eventi rari aumenta con n grande",
                "La varianza campionaria è sempre uguale a quella teorica"
            ],
            correct: 0,
            explanation: "La Legge Debole dei Grandi Numeri dice che X̄ₙ → μ in probabilità quando n → ∞. In pratica, con molte osservazioni, la media campionaria si avvicina alla media della popolazione."
        },
        {
            id: 5,
            category: "Statistica Descrittiva",
            type: "multiple",
            question: "Se il 55% delle rilevazioni ha 'var' inferiore a 148.05, cosa rappresenta questo valore?",
            options: [
                "Il 55° percentile (o quantile 0.55)",
                "La mediana",
                "Il terzo quartile",
                "La media"
            ],
            correct: 0,
            explanation: "Per definizione, il p-esimo percentile è il valore sotto il quale cade il p% dei dati. Il 55° percentile significa che il 55% dei dati è ≤ 148.05."
        },
        {
            id: 6,
            category: "Outlier",
            type: "multiple",
            question: "Per determinare se un valore è outlier con il metodo IQR, quale condizione usi?",
            options: [
                "Valore < Q1 - 1.5×IQR oppure Valore > Q3 + 1.5×IQR",
                "Valore > Media + 2×Dev.St.",
                "Valore è il massimo o il minimo del dataset",
                "Valore > Mediana + IQR"
            ],
            correct: 0,
            explanation: "La regola di Tukey definisce outlier i valori che cadono fuori dai 'baffi' del boxplot: sotto Q1 - 1.5×IQR o sopra Q3 + 1.5×IQR, dove IQR = Q3 - Q1."
        },
        {
            id: 7,
            category: "Probabilità",
            type: "numeric",
            question: "Se X ~ Exp(λ = 1/320), calcola P(X > 530). Usa e^(-530/320) ≈ 0.1909",
            options: [],
            correct: "0.1909",
            explanation: "Per la distribuzione Esponenziale, P(X > t) = e^(-λt) = e^(-t/μ) dove μ = 320. Quindi P(X > 530) = e^(-530/320) = 0.1909. Ricorda che l'Esponenziale è 'memoryless'."
        },
        {
            id: 8,
            category: "Test di Normalità",
            type: "multiple",
            question: "Quale test NON viene usato per verificare la normalità di una distribuzione?",
            options: [
                "Test Chi-quadrato per l'indipendenza",
                "Test di Shapiro-Wilk",
                "Test di Kolmogorov-Smirnov",
                "Q-Q plot (grafico quantile-quantile)"
            ],
            correct: 0,
            explanation: "Il test Chi-quadrato per l'indipendenza verifica la relazione tra variabili categoriali, non la normalità. Per la normalità usiamo: Shapiro-Wilk, Kolmogorov-Smirnov, Anderson-Darling, o grafici Q-Q."
        },
        {
            id: 9,
            category: "R Programming",
            type: "multiple",
            question: "Per calcolare media e mediana di una variabile 'var' in R:",
            options: [
                "mean(dati$var) e median(dati$var)",
                "avg(var) e med(var)",
                "dati$var.mean() e dati$var.median()",
                "summary(var)$mean"
            ],
            correct: 0,
            explanation: "In R, mean() e median() sono le funzioni base. summary() fornisce un riassunto completo (min, Q1, mediana, media, Q3, max), ma non puoi estrarre solo la media con summary()$mean."
        },
        {
            id: 10,
            category: "Teorema del Limite Centrale",
            type: "multiple",
            question: "Il Teorema del Limite Centrale afferma che:",
            options: [
                "La somma (o media) di n v.a. indipendenti tende a una distribuzione Normale per n grande, indipendentemente dalla distribuzione originale",
                "Tutte le distribuzioni convergono alla Normale",
                "La varianza diminuisce sempre con n grande",
                "Solo le v.a. continue seguono il teorema"
            ],
            correct: 0,
            explanation: "Il TLC è fondamentale: date X₁, X₂, ..., Xₙ i.i.d. con media μ e varianza σ², allora (X̄ₙ - μ)/(σ/√n) → N(0,1) per n → ∞. Vale per qualsiasi distribuzione con varianza finita!"
        }
    ];

    const handleAnswer = (questionId, answerIndex) => {
        setAnswers({...answers, [questionId]: answerIndex});
    };

    const handleNumericAnswer = (questionId, value) => {
        setAnswers({...answers, [questionId]: value});
    };

    const calculateScore = () => {
        let correct = 0;
        questions.forEach(q => {
            if (q.type === 'numeric') {
                const userAnswer = parseFloat(answers[q.id]);
                const correctAnswer = parseFloat(q.correct);
                if (Math.abs(userAnswer - correctAnswer) < 0.01) {
                    correct++;
                }
            } else {
                if (answers[q.id] === q.correct) {
                    correct++;
                }
            }
        });
        setScore(correct);
        setShowResults(true);
    };

    const resetQuiz = () => {
        setAnswers({});
        setShowResults(false);
        setCurrentQuestion(0);
        setScore(0);
    };

    const currentQ = questions[currentQuestion];
    const isAnswered = answers[currentQ.id] !== undefined;
    const isCorrect = currentQ.type === 'numeric'
        ? Math.abs(parseFloat(answers[currentQ.id]) - parseFloat(currentQ.correct)) < 0.01
        : answers[currentQ.id] === currentQ.correct;

    const getCategoryIcon = (category) => {
        if (category.includes('Probabilità')) return <Calculator className="w-5 h-5" />;
        if (category.includes('R Programming')) return <Code className="w-5 h-5" />;
        return <Brain className="w-5 h-5" />;
    };

    const getCategoryColor = (category) => {
        if (category.includes('Probabilità')) return 'bg-purple-100 text-purple-800';
        if (category.includes('Statistica')) return 'bg-blue-100 text-blue-800';
        if (category.includes('R Programming')) return 'bg-green-100 text-green-800';
        if (category.includes('Teoria')) return 'bg-yellow-100 text-yellow-800';
        return 'bg-gray-100 text-gray-800';
    };

    if (showResults) {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Risultati Quiz EPS</h2>
                    <div className="text-6xl font-bold mb-4">
            <span className={score >= 6 ? 'text-green-600' : 'text-red-600'}>
              {score}/{questions.length}
            </span>
                    </div>
                    <p className="text-xl text-gray-600">
                        {score >= 8 ? '🎉 Eccellente! Sei pronto per l\'esame!' :
                            score >= 6 ? '👍 Bene! Ripassa ancora un po\'' :
                                '📚 Continua a studiare, ce la farai!'}
                    </p>
                    <div className="mt-4 text-lg">
                        Percentuale: <span className="font-bold">{((score/questions.length)*100).toFixed(0)}%</span>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <h3 className="text-xl font-bold text-gray-800">Riepilogo Risposte:</h3>
                    {questions.map((q, idx) => {
                        const userAnswer = answers[q.id];
                        const correct = q.type === 'numeric'
                            ? Math.abs(parseFloat(userAnswer) - parseFloat(q.correct)) < 0.01
                            : userAnswer === q.correct;

                        return (
                            <div key={q.id} className={`p-4 rounded-lg border-2 ${correct ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                                <div className="flex items-start gap-3">
                                    {correct ?
                                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" /> :
                                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                    }
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-800 mb-2">Domanda {idx + 1}: {q.question}</p>
                                        {q.type === 'numeric' ? (
                                            <div>
                                                <p className="text-sm">La tua risposta: <span className={correct ? 'text-green-700 font-bold' : 'text-red-700'}>{userAnswer || 'Non risposto'}</span></p>
                                                <p className="text-sm">Risposta corretta: <span className="text-green-700 font-bold">{q.correct}</span></p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="text-sm">La tua risposta: <span className={correct ? 'text-green-700' : 'text-red-700'}>{q.options[userAnswer]}</span></p>
                                                {!correct && <p className="text-sm">Risposta corretta: <span className="text-green-700 font-bold">{q.options[q.correct]}</span></p>}
                                            </div>
                                        )}
                                        <p className="text-sm text-gray-600 mt-2 italic">{q.explanation}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button
                    onClick={resetQuiz}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Ricomincia Quiz
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold text-gray-800">Quiz EPS - Preparazione Esame</h1>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getCategoryColor(currentQ.category)}`}>
            {currentQ.category}
          </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                    Domanda {currentQuestion + 1} di {questions.length}
                </p>
            </div>

            <div className="mb-8">
                <div className="flex items-start gap-3 mb-6">
                    <div className={`p-3 rounded-lg ${getCategoryColor(currentQ.category)}`}>
                        {getCategoryIcon(currentQ.category)}
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            {currentQ.question}
                        </h2>
                    </div>
                </div>

                {currentQ.type === 'numeric' ? (
                    <div className="space-y-4">
                        <input
                            type="number"
                            step="0.0001"
                            placeholder="Inserisci la risposta (es: 0.1909)"
                            className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
                            value={answers[currentQ.id] || ''}
                            onChange={(e) => handleNumericAnswer(currentQ.id, e.target.value)}
                        />
                        <p className="text-sm text-gray-500 italic">💡 Approssima alla 4a cifra decimale come richiesto dall'esame</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {currentQ.options.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(currentQ.id, idx)}
                                className={`w-full p-4 text-left rounded-lg border-2 transition ${
                                    answers[currentQ.id] === idx
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50'
                                }`}
                            >
                                <div className="flex items-center">
                  <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-3 ${
                      answers[currentQ.id] === idx
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-gray-300'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                                    <span className="text-gray-800">{option}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {isAnswered && (
                <div className={`p-4 rounded-lg mb-6 ${isCorrect ? 'bg-green-50 border-2 border-green-300' : 'bg-yellow-50 border-2 border-yellow-300'}`}>
                    <div className="flex items-start gap-3">
                        {isCorrect ?
                            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" /> :
                            <Brain className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                        }
                        <div>
                            <p className={`font-semibold mb-2 ${isCorrect ? 'text-green-800' : 'text-yellow-800'}`}>
                                {isCorrect ? '✓ Risposta Corretta!' : '✗ Risposta errata'}
                            </p>
                            <p className="text-sm text-gray-700">{currentQ.explanation}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex gap-4">
                {currentQuestion > 0 && (
                    <button
                        onClick={() => setCurrentQuestion(currentQuestion - 1)}
                        className="flex-1 bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-400 transition"
                    >
                        ← Precedente
                    </button>
                )}
                {currentQuestion < questions.length - 1 ? (
                    <button
                        onClick={() => setCurrentQuestion(currentQuestion + 1)}
                        className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Successiva →
                    </button>
                ) : (
                    <button
                        onClick={calculateScore}
                        className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                        Visualizza Risultati
                    </button>
                )}
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                    💡 <strong>Suggerimento:</strong> Rispondi a tutte le domande e poi controlla i risultati.
                    Le spiegazioni ti aiuteranno a capire meglio i concetti!
                </p>
            </div>
        </div>
    );
};

export default EPSQuizApp;
