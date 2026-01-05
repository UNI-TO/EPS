import React, { useState, useEffect } from 'react';
import { Timer, AlertCircle, CheckCircle, XCircle, Clock, BookOpen } from 'lucide-react';

const EPSExamSimulator = () => {
    const [examStarted, setExamStarted] = useState(false);
    const [examFinished, setExamFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minuti in secondi
    const [answers, setAnswers] = useState({});
    const [currentSection, setCurrentSection] = useState(0);

    // Struttura esame come quello reale
    const examSections = [
        {
            title: "PARTE 1: Analisi Descrittiva e R (6 punti)",
            timeLimit: "Tempo suggerito: 8 minuti",
            questions: [
                {
                    id: 1,
                    type: "fill",
                    points: 0.5,
                    text: "Il dataframe 'dati' contiene le variabili 'gruppo' (A, B, C) e 'var' (misurazioni quantitative). Dopo aver escluso il gruppo A, calcola la MEDIA di 'var'.",
                    hint: "Usa: dati_filtrati <- dati[dati$gruppo != 'A', ] poi mean()",
                    correctAnswer: "176.3",
                    tolerance: 0.1
                },
                {
                    id: 2,
                    type: "fill",
                    points: 0.5,
                    text: "Calcola la MEDIANA di 'var' (gruppo A escluso).",
                    hint: "median(dati_filtrati$var)",
                    correctAnswer: "140.5",
                    tolerance: 0.1
                },
                {
                    id: 3,
                    type: "fill",
                    points: 1,
                    text: "Il 55% delle rilevazioni ha 'var' inferiore a quale valore? (Approssima a 2 decimali)",
                    hint: "quantile(dati_filtrati$var, 0.55)",
                    correctAnswer: "148.05",
                    tolerance: 0.1
                },
                {
                    id: 4,
                    type: "fill",
                    points: 1,
                    text: "Calcola la percentuale di osservazioni nel gruppo C (approssima a 1 decimale).",
                    hint: "(sum(dati$gruppo == 'C') / nrow(dati)) * 100",
                    correctAnswer: "33.3",
                    tolerance: 1
                },
                {
                    id: 5,
                    type: "multiple",
                    points: 1,
                    text: "Il valore 476.8 nel gruppo C è un outlier secondo il metodo IQR?",
                    options: ["vero", "falso", "non ho gli elementi per rispondere"],
                    correctAnswer: 0,
                    explanation: "Devi calcolare Q1, Q3, IQR. Se 476.8 > Q3 + 1.5×IQR, è un outlier."
                },
                {
                    id: 6,
                    type: "code",
                    points: 2,
                    text: "Scrivi il comando R completo per escludere tutte le osservazioni del gruppo indicato con l'etichetta 'A' dal dataframe 'dati'.",
                    hint: "Ricorda di includere la virgola finale per selezionare tutte le colonne",
                    correctAnswer: "dati[dati$gruppo != 'A', ]",
                    acceptableAnswers: [
                        "dati[dati$gruppo != 'A', ]",
                        "dati[dati$gruppo != \"A\", ]",
                        "subset(dati, gruppo != 'A')",
                        "dplyr::filter(dati, gruppo != 'A')"
                    ]
                }
            ]
        },
        {
            title: "PARTE 2: Test di Ipotesi (4 punti)",
            timeLimit: "Tempo suggerito: 7 minuti",
            questions: [
                {
                    id: 7,
                    type: "fill",
                    points: 1,
                    text: "Si vuole verificare se la variabile 'var' ha media diversa nel gruppo C rispetto al gruppo B. Calcola il p-value del test appropriato (approssima a 4 decimali).",
                    hint: "t.test(gruppo_C, gruppo_B)$p.value",
                    correctAnswer: "0.0234",
                    tolerance: 0.001
                },
                {
                    id: 8,
                    type: "multiple",
                    points: 1.5,
                    text: "Con significatività α = 0.05 e p-value = 0.03, quale affermazione è corretta?",
                    options: [
                        "Il campione casuale porta sufficiente evidenza per abbandonare l'ipotesi nulla",
                        "Il campione casuale non porta sufficiente evidenza per abbandonare l'ipotesi nulla",
                        "Non ho gli elementi per rispondere"
                    ],
                    correctAnswer: 0,
                    explanation: "p-value (0.03) < α (0.05) → Rifiuto H₀"
                },
                {
                    id: 9,
                    type: "multiple",
                    points: 1.5,
                    text: "Con significatività α = 0.05, posso affermare che:",
                    options: [
                        "Le osservazioni hanno la stessa media nei due gruppi",
                        "Le osservazioni hanno medie diverse nei due gruppi",
                        "Le osservazioni del primo gruppo hanno media maggiore che nel secondo gruppo",
                        "Nessuna delle affermazioni precedenti è vera"
                    ],
                    correctAnswer: 1,
                    explanation: "Con p < α nel test bilaterale, concludiamo che le medie sono diverse."
                }
            ]
        },
        {
            title: "PARTE 3: Probabilità - Distribuzione Esponenziale (4 punti)",
            timeLimit: "Tempo suggerito: 5 minuti",
            questions: [
                {
                    id: 10,
                    type: "fill",
                    points: 1,
                    text: "Un sistema di controllo ha 5 sensori con tempo di rottura T ~ Exp(media = 320 giorni). Calcola la probabilità che un sensore si rompa PRIMA di 530 giorni. [Usa: 1 - e^(-530/320) ≈ 0.8091]",
                    hint: "P(T ≤ 530) = 1 - e^(-530/320) o pexp(530, rate = 1/320)",
                    correctAnswer: "0.8091",
                    tolerance: 0.001
                },
                {
                    id: 11,
                    type: "fill",
                    points: 1.5,
                    text: "Il sistema è attivo se almeno 2 sensori funzionano. Calcola la probabilità che il sistema sia attivo a 530 giorni. I sensori sono indipendenti. [Approssima a 4 decimali]",
                    hint: "P(sistema attivo) = P(X ≥ 2) dove X ~ Bin(5, p) con p = P(sensore funziona) = e^(-530/320)",
                    correctAnswer: "0.1472",
                    tolerance: 0.001
                },
                {
                    id: 12,
                    type: "fill",
                    points: 1.5,
                    text: "Nuovi sensori hanno media 410 giorni. Se rappresentano 1/4 del totale, calcola la probabilità che un sensore scelto a caso si rompa prima di 530 giorni (approssima a 4 decimali).",
                    hint: "Teorema delle probabilità totali: P(T<530) = P(vecchio)P(T<530|vecchio) + P(nuovo)P(T<530|nuovo)",
                    correctAnswer: "0.7342",
                    tolerance: 0.001
                }
            ]
        },
        {
            title: "PARTE 4: Domande Teoriche (6 punti)",
            timeLimit: "Tempo restante",
            questions: [
                {
                    id: 13,
                    type: "multiple",
                    points: 1.5,
                    text: "La Legge (Debole) dei Grandi Numeri afferma che:",
                    options: [
                        "La media campionaria converge in probabilità alla media della popolazione",
                        "La somma di v.a. normali è sempre normale",
                        "La varianza campionaria converge sempre a zero",
                        "Gli eventi rari diventano più probabili con n grande"
                    ],
                    correctAnswer: 0,
                    explanation: "LGN: X̄ₙ → μ in probabilità quando n → ∞"
                },
                {
                    id: 14,
                    type: "multiple",
                    points: 1.5,
                    text: "Il Teorema del Limite Centrale stabilisce che:",
                    options: [
                        "La distribuzione della somma (standardizzata) di v.a. i.i.d. converge a una Normale per n grande",
                        "Tutte le distribuzioni sono approssimabili con una Normale",
                        "La media campionaria è sempre distribuita normalmente",
                        "La varianza tende a infinito per n grande"
                    ],
                    correctAnswer: 0,
                    explanation: "TLC: (X̄ₙ - μ)/(σ/√n) → N(0,1) per n → ∞, qualunque sia la distribuzione originale (purché abbia varianza finita)"
                },
                {
                    id: 15,
                    type: "multiple",
                    points: 1.5,
                    text: "Per verificare la normalità di un dataset, quale metodo NON è appropriato?",
                    options: [
                        "Test Chi-quadrato per l'indipendenza",
                        "Test di Shapiro-Wilk",
                        "Q-Q plot",
                        "Test di Kolmogorov-Smirnov"
                    ],
                    correctAnswer: 0,
                    explanation: "Il Chi-quadrato per l'indipendenza serve per variabili categoriali, non per testare la normalità."
                },
                {
                    id: 16,
                    type: "multiple",
                    points: 1.5,
                    text: "In R, per calcolare P(X > 530) dove X ~ Exp(λ = 1/320), quale comando usi?",
                    options: [
                        "pexp(530, rate = 1/320, lower.tail = FALSE)",
                        "dexp(530, rate = 1/320)",
                        "qexp(530, rate = 1/320)",
                        "rexp(530, rate = 1/320)"
                    ],
                    correctAnswer: 0,
                    explanation: "pexp() calcola P(X ≤ x). Con lower.tail=FALSE ottieni P(X > x). dexp è la densità, qexp è il quantile, rexp genera numeri casuali."
                }
            ]
        }
    ];

    // Timer countdown
    useEffect(() => {
        if (examStarted && !examFinished && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        handleFinishExam();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [examStarted, examFinished, timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStartExam = () => {
        setExamStarted(true);
        setExamFinished(false);
        setTimeLeft(20 * 60);
        setAnswers({});
        setCurrentSection(0);
    };

    const handleAnswer = (questionId, answer) => {
        setAnswers({...answers, [questionId]: answer});
    };

    const handleFinishExam = () => {
        setExamFinished(true);
    };

    const calculateScore = () => {
        let totalScore = 0;
        let maxScore = 0;

        examSections.forEach(section => {
            section.questions.forEach(q => {
                maxScore += q.points;
                const userAnswer = answers[q.id];

                if (q.type === 'fill' || q.type === 'code') {
                    if (q.type === 'code' && q.acceptableAnswers) {
                        if (q.acceptableAnswers.some(ans =>
                            userAnswer?.toLowerCase().trim() === ans.toLowerCase().trim()
                        )) {
                            totalScore += q.points;
                        }
                    } else {
                        const correct = parseFloat(q.correctAnswer);
                        const user = parseFloat(userAnswer);
                        if (!isNaN(user) && Math.abs(user - correct) <= q.tolerance) {
                            totalScore += q.points;
                        }
                    }
                } else if (q.type === 'multiple') {
                    if (userAnswer === q.correctAnswer) {
                        totalScore += q.points;
                    }
                }
            });
        });

        return { totalScore, maxScore };
    };

    // Schermata iniziale
    if (!examStarted) {
        return (
            <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-blue-900 mb-4">
                        📝 Simulazione Esame EPS
                    </h1>
                    <p className="text-xl text-gray-700 mb-6">
                        Elementi di Probabilità e Statistica
                    </p>
                </div>

                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                        <AlertCircle className="w-6 h-6" />
                        Istruzioni Importanti
                    </h2>
                    <ul className="space-y-3 text-gray-800">
                        <li className="flex items-start gap-2">
                            <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                            <span><strong>Tempo disponibile:</strong> 20 minuti (come l'esame reale)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                            <span><strong>Struttura:</strong> 4 parti (Analisi Descrittiva, Test di Ipotesi, Probabilità, Teoria)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                            <span><strong>Punteggio:</strong> 20 punti totali, 12 per la sufficienza</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                            <span><strong>Approssimazioni:</strong> Dove richiesto, approssima alla 2a o 4a cifra decimale</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Code className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                            <span><strong>R:</strong> In un esame reale, userai RStudio. Qui simula mentalmente i comandi</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-bold text-yellow-900 mb-2">⚠️ Suggerimenti Strategici</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                        <li>✓ Inizia dalle domande che ti sembrano più facili</li>
                        <li>✓ Non perdere troppo tempo su una domanda: segna e passa oltre</li>
                        <li>✓ Tieni d'occhio il timer - gestisci bene i 20 minuti</li>
                        <li>✓ Controlla le approssimazioni richieste</li>
                        <li>✓ Negli ultimi 3 minuti, rivedi le risposte</li>
                    </ul>
                </div>

                <button
                    onClick={handleStartExam}
                    className="w-full bg-blue-600 text-white py-4 px-8 rounded-lg text-xl font-bold hover:bg-blue-700 transition shadow-lg"
                >
                    🚀 Inizia l'Esame
                </button>
            </div>
        );
    }

    // Schermata risultati
    if (examFinished) {
        const { totalScore, maxScore } = calculateScore();
        const percentage = (totalScore / maxScore) * 100;
        const passed = totalScore >= 12;

        return (
            <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-lg">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        {passed ? '🎉 Esame Completato!' : '📚 Esame Completato'}
                    </h2>
                    <div className="text-7xl font-bold mb-4">
            <span className={passed ? 'text-green-600' : 'text-red-600'}>
              {totalScore.toFixed(1)}/{maxScore}
            </span>
                    </div>
                    <p className="text-2xl text-gray-600 mb-4">
                        Percentuale: {percentage.toFixed(1)}%
                    </p>
                    <div className={`inline-block px-6 py-3 rounded-full text-xl font-bold ${
                        passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                        {passed ? '✓ SUPERATO (≥12/20)' : '✗ NON SUPERATO (<12/20)'}
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Dettaglio per Sezione:</h3>
                    {examSections.map((section, secIdx) => {
                        let sectionScore = 0;
                        let sectionMax = 0;
                        section.questions.forEach(q => {
                            sectionMax += q.points;
                            const userAnswer = answers[q.id];
                            if (q.type === 'fill' || q.type === 'code') {
                                if (q.type === 'code' && q.acceptableAnswers) {
                                    if (q.acceptableAnswers.some(ans =>
                                        userAnswer?.toLowerCase().trim() === ans.toLowerCase().trim()
                                    )) {
                                        sectionScore += q.points;
                                    }
                                } else {
                                    const correct = parseFloat(q.correctAnswer);
                                    const user = parseFloat(userAnswer);
                                    if (!isNaN(user) && Math.abs(user - correct) <= q.tolerance) {
                                        sectionScore += q.points;
                                    }
                                }
                            } else if (userAnswer === q.correctAnswer) {
                                sectionScore += q.points;
                            }
                        });

                        return (
                            <div key={secIdx} className="bg-gray-50 p-4 rounded-lg mb-3">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-800">{section.title}</span>
                                    <span className="font-bold text-lg">
                    {sectionScore.toFixed(1)}/{sectionMax} punti
                  </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="space-y-4 mb-8">
                    <h3 className="text-xl font-bold text-gray-800">Correzione Dettagliata:</h3>
                    {examSections.map((section, secIdx) => (
                        <div key={secIdx} className="border-2 border-gray-200 rounded-lg p-4">
                            <h4 className="font-bold text-lg text-blue-900 mb-3">{section.title}</h4>
                            {section.questions.map((q, qIdx) => {
                                const userAnswer = answers[q.id];
                                let isCorrect = false;

                                if (q.type === 'fill' || q.type === 'code') {
                                    if (q.type === 'code' && q.acceptableAnswers) {
                                        isCorrect = q.acceptableAnswers.some(ans =>
                                            userAnswer?.toLowerCase().trim() === ans.toLowerCase().trim()
                                        );
                                    } else {
                                        const correct = parseFloat(q.correctAnswer);
                                        const user = parseFloat(userAnswer);
                                        isCorrect = !isNaN(user) && Math.abs(user - correct) <= q.tolerance;
                                    }
                                } else {
                                    isCorrect = userAnswer === q.correctAnswer;
                                }

                                return (
                                    <div key={q.id} className={`mb-4 p-3 rounded-lg border-2 ${
                                        isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
                                    }`}>
                                        <div className="flex items-start gap-2 mb-2">
                                            {isCorrect ?
                                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" /> :
                                                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                                            }
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-800 mb-1">
                                                    Q{q.id} ({q.points}pt): {q.text}
                                                </p>
                                                {q.type === 'multiple' ? (
                                                    <div className="text-sm">
                                                        <p>La tua risposta: <span className={isCorrect ? 'text-green-700 font-bold' : 'text-red-700'}>
                              {userAnswer !== undefined ? q.options[userAnswer] : 'Non risposto'}
                            </span></p>
                                                        {!isCorrect && (
                                                            <p>Risposta corretta: <span className="text-green-700 font-bold">
                                {q.options[q.correctAnswer]}
                              </span></p>
                                                        )}
                                                        {q.explanation && (
                                                            <p className="text-gray-600 mt-1 italic">{q.explanation}</p>
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
                                                            <p className="text-gray-600 mt-1 italic">💡 {q.hint}</p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-bold text-blue-900 mb-2">📊 Analisi della Performance</h3>
                    <p className="text-gray-700">
                        {passed ? (
                            <>Ottimo lavoro! Hai dimostrato una buona padronanza degli argomenti.
                                Per migliorare ulteriormente, focalizzati sulle domande sbagliate e ripassa
                                i concetti correlati.</>
                        ) : (
                            <>Non scoraggiarti! L'esame simulato serve proprio a identificare le aree
                                da migliorare. Ripassa gli argomenti delle domande sbagliate e riprova.
                                Concentrati su: analisi descrittiva, test di ipotesi, e distribuzioni di probabilità.</>
                        )}
                    </p>
                </div>

                <button
                    onClick={() => {
                        setExamStarted(false);
                        setExamFinished(false);
                        setAnswers({});
                        setCurrentSection(0);
                        setTimeLeft(20 * 60);
                    }}
                    className="w-full bg-blue-600 text-white py-4 px-8 rounded-lg text-xl font-bold hover:bg-blue-700 transition"
                >
                    🔄 Ricomincia Simulazione
                </button>
            </div>
        );
    }

    // Schermata esame in corso
    const section = examSections[currentSection];
    const timeWarning = timeLeft < 300; // ultimi 5 minuti

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            {/* Header con timer */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b-2">
                <h1 className="text-2xl font-bold text-gray-800">Esame EPS - Simulazione</h1>
                <div className={`flex items-center gap-3 px-6 py-3 rounded-lg font-bold text-xl ${
                    timeWarning ? 'bg-red-100 text-red-800 animate-pulse' : 'bg-blue-100 text-blue-800'
                }`}>
                    <Timer className="w-6 h-6" />
                    {formatTime(timeLeft)}
                </div>
            </div>

            {/* Navigazione sezioni */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
                {examSections.map((sec, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSection(idx)}
                        className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                            currentSection === idx
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Parte {idx + 1}
                    </button>
                ))}
            </div>

            {/* Sezione corrente */}
            <div className="mb-6">
                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
                    <h2 className="text-xl font-bold text-blue-900 mb-1">{section.title}</h2>
                    <p className="text-sm text-gray-600">{section.timeLimit}</p>
                </div>

                <div className="space-y-6">
                    {section.questions.map((q, idx) => (
                        <div key={q.id} className="bg-gray-50 p-5 rounded-lg border-2 border-gray-200">
                            <div className="flex items-start gap-3 mb-3">
                <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {idx + 1}
                </span>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800 mb-1">
                                        {q.text}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        ({q.points} punt{q.points !== 1 ? 'i' : 'o'})
                                    </p>
                                    {q.hint && (
                                        <p className="text-sm text-blue-600 mt-2 italic">💡 {q.hint}</p>
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
                                                    : 'border-gray-300 hover:border-blue-300 hover:bg-gray-100'
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
                                                <span>{opt}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="ml-11">
                                    <input
                                        type="text"
                                        placeholder={q.type === 'code' ? "Scrivi il comando R..." : "Inserisci il valore numerico..."}
                                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                        value={answers[q.id] || ''}
                                        onChange={(e) => handleAnswer(q.id, e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Pulsanti navigazione */}
            <div className="flex gap-4 mt-8">
                {currentSection > 0 && (
                    <button
                        onClick={() => setCurrentSection(currentSection - 1)}
                        className="flex-1 bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-400 transition"
                    >
                        ← Sezione Precedente
                    </button>
                )}
                {currentSection < examSections.length - 1 ? (
                    <button
                        onClick={() => setCurrentSection(currentSection + 1)}
                        className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Sezione Successiva →
                    </button>
                ) : (
                    <button
                        onClick={handleFinishExam}
                        className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                        ✓ Concludi Esame
                    </button>
                )}
            </div>

            {/* Avviso risposte mancanti */}
            <div className="mt-6 bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                    <strong>Suggerimento:</strong> Rispondi a tutte le domande prima di concludere.
                    Puoi navigare tra le sezioni usando i pulsanti in alto. Le risposte non date
                    vengono considerate errate.
                </p>
            </div>
        </div>
    );
};

export default EPSExamSimulator;