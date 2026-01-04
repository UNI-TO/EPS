import React, { useState } from 'react';
import { CheckCircle, XCircle, Calculator, TrendingUp } from 'lucide-react';

const Quiz18Feb = () => {
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const questions = [
        {
            id: 1,
            category: "Distribuzione Esponenziale",
            type: "multiple",
            question: "Le precipitazioni giornaliere X seguono una distribuzione Exp(λ) con media 3 mm. Qual è il valore di λ?",
            options: [
                "λ = 1/3",
                "λ = 3",
                "λ = 1/9",
                "λ = 9"
            ],
            correct: 0,
            explanation: "Per la distribuzione Esponenziale, E[X] = 1/λ. Se E[X] = 3, allora λ = 1/3."
        },
        {
            id: 2,
            category: "Probabilità Esponenziale",
            type: "fill",
            question: "Se X ~ Exp(1/3), calcola P(X > 7.5). Usa e^(-7.5/3) ≈ 0.0821",
            hint: "P(X > t) = e^(-λt) = e^(-t/μ)",
            correctAnswer: "0.0821",
            tolerance: 0.001
        },
        {
            id: 3,
            category: "Complementare",
            type: "fill",
            question: "Se P(X > 7.5) = 0.0821, quanto vale P(X ≤ 7.5)? (4 decimali)",
            hint: "P(X ≤ t) = 1 - P(X > t)",
            correctAnswer: "0.9179",
            tolerance: 0.001
        },
        {
            id: 4,
            category: "Distribuzione Geometrica",
            type: "multiple",
            question: "Bagni la pianta quando piove meno di 7.5mm. Sia Y il numero di giorni che aspetti prima di bagnarla. Quale distribuzione segue Y?",
            options: [
                "Geometrica con p = P(X < 7.5)",
                "Esponenziale con λ = 1/3",
                "Binomiale con n = 7",
                "Normale con μ = 3"
            ],
            correct: 0,
            explanation: "Y conta il numero di 'fallimenti' (giorni senza bagnare) prima del primo 'successo' (bagnare). È una Geometrica con p = P(bagnare) = P(X < 7.5)."
        },
        {
            id: 5,
            category: "Distribuzione Geometrica",
            type: "fill",
            question: "Con p = 0.9179, calcola E[Y] = numero medio di giorni tra una bagnata e l'altra. (2 decimali)",
            hint: "E[Y] = 1/p per la geometrica (numero di prove fino al successo)",
            correctAnswer: "1.09",
            tolerance: 0.02
        },
        {
            id: 6,
            category: "Probabilità Geometrica",
            type: "multiple",
            question: "P(Y ≥ 4) significa 'la prossima volta che bagno è tra almeno 4 giorni'. Come si calcola?",
            options: [
                "P(Y ≥ 4) = (1-p)³ = 0.0006",
                "P(Y ≥ 4) = 1 - (1-p)³",
                "P(Y ≥ 4) = p⁴",
                "P(Y ≥ 4) = 1 - p³"
            ],
            correct: 0,
            explanation: "P(Y ≥ 4) = P(almeno 3 fallimenti) = (1-p)³. In R: pgeom(2, p, lower.tail=FALSE) oppure (1-p)^3."
        },
        {
            id: 7,
            category: "Somma di v.a.",
            type: "fill",
            question: "Se X ~ Exp con E[X] = 3mm, calcola E[X₁ + X₂ + ... + X₇] dove Xᵢ sono precipitazioni di 7 giorni indipendenti.",
            hint: "E[Σ Xᵢ] = Σ E[Xᵢ] = n·E[X]",
            correctAnswer: "21",
            tolerance: 0.1
        },
        {
            id: 8,
            category: "Somma di v.a.",
            type: "fill",
            question: "Calcola Var(X₁ + ... + X₇) se Var(X) = 9 mm² e le Xᵢ sono indipendenti.",
            hint: "Var(Σ Xᵢ) = Σ Var(Xᵢ) = n·Var(X) per indipendenti",
            correctAnswer: "63",
            tolerance: 1
        },
        {
            id: 9,
            category: "R - Filtraggio",
            type: "code",
            question: "Scrivi il comando R per calcolare la media di 'tempiPRE' solo per i maschi (genere == 'M'), ignorando NA.",
            hint: "Ricorda na.rm = TRUE",
            correctAnswer: "mean(dati$tempiPRE[dati$genere == 'M'], na.rm = TRUE)",
            acceptableAnswers: [
                "mean(dati$tempiPRE[dati$genere == 'M'], na.rm = TRUE)",
                "mean(dati$tempiPRE[dati$genere == \"M\"], na.rm = TRUE)",
                "mean(dati[dati$genere == 'M', 'tempiPRE'], na.rm = TRUE)"
            ]
        },
        {
            id: 10,
            category: "R - Percentili",
            type: "code",
            question: "Scrivi il comando R per calcolare il 16° percentile di 'tempiPRE' per i maschi, ignorando NA.",
            hint: "quantile(vettore, probs, na.rm)",
            correctAnswer: "quantile(dati$tempiPRE[dati$genere == 'M'], 0.16, na.rm = TRUE)",
            acceptableAnswers: [
                "quantile(dati$tempiPRE[dati$genere == 'M'], 0.16, na.rm = TRUE)",
                "quantile(dati$tempiPRE[dati$genere == \"M\"], 0.16, na.rm = TRUE)",
                "quantile(dati[dati$genere == 'M', 'tempiPRE'], 0.16, na.rm = TRUE)"
            ]
        },
        {
            id: 11,
            category: "Test t Appaiato",
            type: "multiple",
            question: "Per verificare se tempiPRE > tempiPOST (miglioramento), quale ipotesi alternativa usi?",
            options: [
                "alternative = 'greater' (H₁: μ_PRE > μ_POST, ossia μ_diff > 0)",
                "alternative = 'less' (H₁: μ_PRE < μ_POST)",
                "alternative = 'two.sided' (H₁: μ_PRE ≠ μ_POST)",
                "paired = FALSE"
            ],
            correct: 0,
            explanation: "Vogliamo testare se i tempi sono migliorati (diminuiti dopo il regime), cioè se PRE > POST. Usiamo 'greater' perché testiamo μ_diff = μ_PRE - μ_POST > 0."
        },
        {
            id: 12,
            category: "Test t Appaiato",
            type: "code",
            question: "Scrivi il comando R per il test t paired con H₁: μ_PRE > μ_POST",
            hint: "t.test(prima, dopo, paired = TRUE, alternative = ...)",
            correctAnswer: "t.test(dati$tempiPRE, dati$tempiPOST, paired = TRUE, alternative = 'greater')",
            acceptableAnswers: [
                "t.test(dati$tempiPRE, dati$tempiPOST, paired = TRUE, alternative = 'greater')",
                "t.test(dati$tempiPRE, dati$tempiPOST, paired = TRUE, alternative = \"greater\")",
                "t.test(dati$tempiPRE, dati$tempiPOST, paired=TRUE, alternative='greater')"
            ]
        },
        {
            id: 13,
            category: "Interpretazione Test",
            type: "multiple",
            question: "Hai ottenuto p-value = 0.02 con α = 0.05. Con quale affermazione sei d'accordo?",
            options: [
                "Il campione porta sufficiente evidenza per abbandonare H₀: le prestazioni sono mediamente migliorate",
                "Il campione non porta sufficiente evidenza per abbandonare H₀",
                "Non ho elementi per rispondere"
            ],
            correct: 0,
            explanation: "p-value (0.02) < α (0.05) → Rifiuto H₀. C'è evidenza che le prestazioni sono migliorate con il regime alimentare."
        },
        {
            id: 14,
            category: "R - Estrarre risultati",
            type: "code",
            question: "Hai salvato il test in 'test'. Come estrai il p-value?",
            hint: "Usa $ per accedere agli elementi dell'oggetto",
            correctAnswer: "test$p.value",
            acceptableAnswers: [
                "test$p.value",
                "test$p.value[1]"
            ]
        },
        {
            id: 15,
            category: "Gradi di libertà",
            type: "multiple",
            question: "In un test t appaiato con n = 50 coppie di osservazioni, quanti sono i gradi di libertà?",
            options: [
                "49 (df = n - 1)",
                "50",
                "98 (df = 2n - 2)",
                "100"
            ],
            correct: 0,
            explanation: "Nel test t appaiato, lavoriamo con le differenze (n valori), quindi df = n - 1 = 49."
        }
    ];

    const handleAnswer = (questionId, answer) => {
        setAnswers({...answers, [questionId]: answer});
    };

    const calculateScore = () => {
        let score = 0;
        questions.forEach(q => {
            const userAnswer = answers[q.id];
            if (q.type === 'fill' || q.type === 'code') {
                if (q.acceptableAnswers) {
                    if (q.acceptableAnswers.some(ans =>
                        userAnswer?.toLowerCase().replace(/\s+/g, '') === ans.toLowerCase().replace(/\s+/g, '')
                    )) {
                        score++;
                    }
                } else {
                    const correct = parseFloat(q.correctAnswer);
                    const user = parseFloat(userAnswer);
                    if (!isNaN(user) && Math.abs(user - correct) <= q.tolerance) {
                        score++;
                    }
                }
            } else if (userAnswer === q.correct) {
                score++;
            }
        });
        return score;
    };

    if (showResults) {
        const score = calculateScore();
        const maxScore = questions.length;
        const percentage = (score / maxScore) * 100;

        return (
            <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Risultati Quiz - Esame 18 Feb 2021</h2>
                    <div className="text-6xl font-bold mb-4">
            <span className={score >= 12 ? 'text-green-600' : 'text-red-600'}>
              {score}/{maxScore}
            </span>
                    </div>
                    <p className="text-xl text-gray-600">Percentuale: {percentage.toFixed(0)}%</p>
                </div>

                <div className="space-y-4 mb-8">
                    {questions.map((q, idx) => {
                        const userAnswer = answers[q.id];
                        let isCorrect = false;

                        if (q.type === 'fill' || q.type === 'code') {
                            if (q.acceptableAnswers) {
                                isCorrect = q.acceptableAnswers.some(ans =>
                                    userAnswer?.toLowerCase().replace(/\s+/g, '') === ans.toLowerCase().replace(/\s+/g, '')
                                );
                            } else {
                                const correct = parseFloat(q.correctAnswer);
                                const user = parseFloat(userAnswer);
                                isCorrect = !isNaN(user) && Math.abs(user - correct) <= q.tolerance;
                            }
                        } else {
                            isCorrect = userAnswer === q.correct;
                        }

                        return (
                            <div key={q.id} className={`p-4 rounded-lg border-2 ${
                                isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
                            }`}>
                                <div className="flex items-start gap-3">
                                    {isCorrect ?
                                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" /> :
                                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                    }
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-800 mb-2">
                                            <span className="text-blue-600">[{q.category}]</span> {q.question}
                                        </p>
                                        {q.type === 'multiple' ? (
                                            <div className="text-sm">
                                                <p>La tua risposta: <span className={isCorrect ? 'text-green-700 font-bold' : 'text-red-700'}>
                          {userAnswer !== undefined ? q.options[userAnswer] : 'Non risposto'}
                        </span></p>
                                                {!isCorrect && (
                                                    <p>Risposta corretta: <span className="text-green-700 font-bold">
                            {q.options[q.correct]}
                          </span></p>
                                                )}
                                                {q.explanation && (
                                                    <p className="text-gray-600 mt-2 italic">💡 {q.explanation}</p>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="text-sm">
                                                <p>La tua risposta: <span className={isCorrect ? 'text-green-700 font-bold' : 'text-red-700'}>
                          {userAnswer || 'Non risposto'}
                        </span></p>
                                                {!isCorrect && (
                                                    <p>Risposta corretta: <span className="text-green-700 font-bold">
                            {q.correctAnswer}
                          </span></p>
                                                )}
                                                {q.hint && (
                                                    <p className="text-gray-600 mt-2 italic">💡 {q.hint}</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button
                    onClick={() => {
                        setAnswers({});
                        setShowResults(false);
                    }}
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
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Quiz Esame 18 Febbraio 2021
                </h1>
                <p className="text-gray-600">
                    Geometrica + Esponenziale + Test t Appaiato
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
                    />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                    Completate: {Object.keys(answers).length}/{questions.length}
                </p>
            </div>

            <div className="space-y-6 mb-8">
                {questions.map((q, idx) => (
                    <div key={q.id} className="bg-gray-50 p-5 rounded-lg border-2 border-gray-200">
                        <div className="flex items-start gap-3 mb-3">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                {idx + 1}
              </span>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    {q.category.includes('Geometrica') || q.category.includes('Esponenziale') || q.category.includes('Probabilità') ?
                                        <Calculator className="w-4 h-4 text-purple-600" /> :
                                        <TrendingUp className="w-4 h-4 text-blue-600" />
                                    }
                                    <span className="text-xs font-semibold text-gray-500 uppercase">
                    {q.category}
                  </span>
                                </div>
                                <p className="font-semibold text-gray-800 mb-2">{q.question}</p>
                                {q.hint && (
                                    <p className="text-sm text-blue-600 italic mb-2">💡 {q.hint}</p>
                                )}
                            </div>
                        </div>

                        {q.type === 'multiple' ? (
                            <div className="space-y-2 ml-11">
                                {q.options.map((opt, optIdx) => (
                                    <button
                                        key={optIdx}
                                        onClick={() => handleAnswer(q.id, optIdx)}
                                        className={`w-full p-3 text-left rounded-lg border-2 transition ${
                                            answers[q.id] === optIdx
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-300 hover:border-blue-300'
                                        }`}
                                    >
                                        <div className="flex items-center">
                      <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                          answers[q.id] === optIdx
                              ? 'border-blue-500 bg-blue-500 text-white'
                              : 'border-gray-400'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                                            <span className="text-sm">{opt}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="ml-11">
                                <input
                                    type="text"
                                    placeholder={q.type === 'code' ? "Scrivi il comando R..." : "Inserisci il valore..."}
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                    value={answers[q.id] || ''}
                                    onChange={(e) => handleAnswer(q.id, e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button
                onClick={() => setShowResults(true)}
                className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition"
            >
                Visualizza Risultati
            </button>
        </div>
    );
};

export default Quiz18Feb;