import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, RotateCcw, Trophy } from 'lucide-react';

const QuizLuglio2024 = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [showExplanation, setShowExplanation] = useState({});

    const questions = [
        {
            id: 1,
            category: "Visualizzazioni in R",
            difficulty: "⭐⭐",
            question: "Completa le affermazioni sul barplot:",
            type: "fill",
            subQuestions: [
                {
                    text: "Un _____ è un grafico che contiente delle barre. Viene usato per rappresentare _____.",
                    options: ["barplot, variabili qualitative", "istogramma, variabili qualitative", "barplot, variabili quantitative", "box plot, tutti i tipi di variabili"],
                    correct: 0
                },
                {
                    text: "Se le barre sono verticali, sull'asse delle x vengono rappresentati _____.",
                    options: ["i percentili", "i livelli della variabile fattore", "i bins", "tutti i tipi di variabili"],
                    correct: 1
                },
                {
                    text: "Una rappresentazione equivalente si può ottenere con un _____, dove le barre vengono sostituite da _____.",
                    options: ["box plot, aree", "istogramma, linee", "dot plot, punti", "barplot, linee"],
                    correct: 2
                }
            ],
            explanation: `✅ SOLUZIONE COMPLETA:

Un **barplot** è un grafico che contiene delle barre. Viene usato per rappresentare **variabili qualitative**.

Se le barre sono verticali, sull'asse delle x vengono rappresentati **i livelli della variabile fattore**.

Una rappresentazione equivalente si può ottenere con un **dot plot**, dove le barre vengono sostituite da **punti**.

📊 **Differenze tra grafici:**
- **Barplot**: barre per variabili qualitative/fattore
- **Istogramma**: barre per variabili quantitative (con bins)
- **Dot plot**: alternativa al barplot con punti invece di barre
- **Box plot**: rappresenta la distribuzione con quartili

💡 **In R:**
\`\`\`r
# Barplot per variabili qualitative
barplot(table(dati$categoria))

# Dot plot (alternativa)
dotchart(table(dati$categoria))

# Istogramma per variabili quantitative
hist(dati$valore)

# Box plot per distribuzione
boxplot(dati$valore ~ dati$gruppo)
\`\`\``,
            realExam: "12 Luglio 2024, Domanda 1"
        },
        {
            id: 2,
            category: "Probabilità Classica",
            difficulty: "⭐⭐⭐",
            question: "Si tira cinque volte una moneta non truccata. Calcolare:",
            type: "numeric",
            subQuestions: [
                {
                    text: "1. La probabilità dell'evento A = \"i primi tre risultati sono uguali\"",
                    answer: "0.2500",
                    tolerance: 0.0001
                },
                {
                    text: "2. La probabilità dell'evento B = \"i primi tre o gli ultimi tre risultati sono uguali\"",
                    answer: "0.4375",
                    tolerance: 0.0001
                },
                {
                    text: "3. P(A|B) = ?",
                    answer: "0.5714",
                    tolerance: 0.0001
                }
            ],
            explanation: `✅ SOLUZIONE COMPLETA:

**Evento A: "i primi tre risultati sono uguali"**
A = (CCC··) ∪ (TTT··)

P(A) = 2 × (1/2)³ = 2 × 1/8 = 1/4 = **0.2500**

**Evento B: "i primi tre o gli ultimi tre risultati sono uguali"**
B = A ∪ A'
dove A' = "gli ultimi tre risultati sono uguali" = (··CCC) ∪ (··TTT)

P(A') = P(A) = 1/4

A ∩ A' = "cinque risultati uguali" = (CCCCC) ∪ (TTTTT)
P(A ∩ A') = 2 × (1/2)⁵ = 2/32 = 1/16

P(B) = P(A ∪ A') = P(A) + P(A') - P(A ∩ A')
P(B) = 1/4 + 1/4 - 1/16 = 4/16 + 4/16 - 1/16 = 7/16 = **0.4375**

**Probabilità condizionata P(A|B):**
P(A|B) = P(A ∩ B) / P(B)

Osserviamo che A ⊆ B (se i primi tre sono uguali, allora B è vero)
Quindi A ∩ B = A

P(A|B) = P(A) / P(B) = (1/4) / (7/16) = (1/4) × (16/7) = 4/7 = **0.5714**

📝 **Ragionamento:**
- Dato che B è vero (primi tre O ultimi tre uguali)
- La probabilità che siano i primi tre è 4/7
- La probabilità che siano gli ultimi tre è 3/7 (casi non comuni ad A)`,
            realExam: "12 Luglio 2024, Domanda 2"
        },
        {
            id: 3,
            category: "Normale ed Esponenziale Indipendenti",
            difficulty: "⭐⭐⭐",
            question: "Sia X ~ N(0.2, 1) e Y ~ Exp(rate=1), indipendenti. Determinare:",
            type: "numeric",
            subQuestions: [
                {
                    text: "1. La probabilità che Y sia maggiore di 2",
                    answer: "0.1353",
                    tolerance: 0.0001,
                    hint: "Usa pexp(2, 1)"
                },
                {
                    text: "2. La probabilità che almeno una delle due variabili sia maggiore di 2",
                    answer: "0.1664",
                    tolerance: 0.0001,
                    hint: "1 - P(entrambe < 2)"
                },
                {
                    text: "3. La probabilità che al massimo una delle due sia maggiore di 1",
                    answer: "0.9221",
                    tolerance: 0.0001,
                    hint: "1 - P(entrambe > 1)"
                }
            ],
            explanation: `✅ SOLUZIONE COMPLETA:

**1. P(Y > 2) con Y ~ Exp(rate=1):**

\`\`\`r
1 - pexp(2, 1)
# [1] 0.1353353
\`\`\`

**Risposta:** 0.1353

**2. P(almeno una > 2) = P(X > 2 ∪ Y > 2):**

Uso il complementare:
P(almeno una > 2) = 1 - P(entrambe ≤ 2)

Per indipendenza:
P(X ≤ 2, Y ≤ 2) = P(X ≤ 2) × P(Y ≤ 2)

\`\`\`r
1 - (pnorm(2, 0.2, 1) * pexp(2, 1))
# [1] 0.166403
\`\`\`

**Risposta:** 0.1664

**3. P(al massimo una > 1):**

Significa: o nessuna o esattamente una è > 1

Equivalente a: 1 - P(entrambe > 1)

\`\`\`r
1 - (1 - pnorm(1, 0.2, 1)) * (1 - pexp(1, 1))
# [1] 0.9220628
\`\`\`

**Risposta:** 0.9221

📊 **Concetti chiave:**
- **Indipendenza**: P(A ∩ B) = P(A) × P(B)
- **Complementare**: spesso più facile calcolare 1 - P(opposto)
- **"Almeno una"**: 1 - P(nessuna)
- **"Al massimo una"**: 1 - P(entrambe)

💡 **Funzioni R:**
- \`pnorm(x, mean, sd)\`: P(X ≤ x) per Normale
- \`pexp(x, rate)\`: P(Y ≤ x) per Esponenziale`,
            realExam: "12 Luglio 2024, Domanda 3"
        },
        {
            id: 4,
            category: "Analisi Descrittiva + Test t Indipendenti",
            difficulty: "⭐⭐⭐⭐",
            question: "Dataset trazione.RData: resistenza alla trazione di due materiali (A e B). Rispondere:",
            type: "mixed",
            subQuestions: [
                {
                    text: "1a. Numero di misurazioni totali",
                    type: "numeric",
                    answer: "191",
                    tolerance: 0
                },
                {
                    text: "1b. Resistenza media del materiale B",
                    type: "numeric",
                    answer: "27.3547",
                    tolerance: 0.0001
                },
                {
                    text: "1c. Deviazione standard del materiale B",
                    type: "numeric",
                    answer: "3.1653",
                    tolerance: 0.0001
                },
                {
                    text: "2. Quante osservazioni del materiale B hanno resistenza ≥ 30?",
                    type: "numeric",
                    answer: "23",
                    tolerance: 0
                },
                {
                    text: "3. Il 20% delle osservazioni del materiale B è maggiore di:",
                    type: "numeric",
                    answer: "30.3",
                    tolerance: 0.1
                },
                {
                    text: "4. Quale test usare per confrontare i due materiali?",
                    type: "choice",
                    options: [
                        "Test t appaiato (paired=TRUE)",
                        "Test t indipendente (paired=FALSE)",
                        "Test per proporzioni (binom.test)",
                        "Test ANOVA"
                    ],
                    correct: 1
                },
                {
                    text: "5. Il p-value ottenuto è:",
                    type: "numeric",
                    answer: "0",
                    tolerance: 0.0001,
                    hint: "p-value < 0.0001, approssimiamo a 0"
                },
                {
                    text: "6. Con α = 0.01, quale decisione prendo?",
                    type: "choice",
                    options: [
                        "Non rifiuto H₀",
                        "Rifiuto H₀",
                        "Accetto H₀",
                        "Non posso concludere"
                    ],
                    correct: 1
                },
                {
                    text: "7. Conclusione finale:",
                    type: "choice",
                    options: [
                        "I due materiali hanno le stesse prestazioni",
                        "I due materiali NON hanno le stesse prestazioni",
                        "Il materiale A è superiore al B",
                        "Non posso concludere nulla"
                    ],
                    correct: 1
                }
            ],
            explanation: `✅ SOLUZIONE COMPLETA:

**PARTE 1 - ANALISI DESCRITTIVA:**

\`\`\`r
# Caricare i dati
load("trazione.RData")

# 1a. Numero misurazioni
nrow(dati)
# [1] 191

# 1b. Media materiale B
mean(dati$trazione[dati$materiale == "B"])
# [1] 27.35471

# 1c. Deviazione standard materiale B
sd(dati$trazione[dati$materiale == "B"])
# [1] 3.165287

# 2. Contare osservazioni B con resistenza ≥ 30
sum(dati$trazione[dati$materiale == "B"] >= 30)
# [1] 23

# 3. 80° percentile (20% superiore) per materiale B
quantile(dati$trazione[dati$materiale == "B"], 0.8)
#    80%
# 30.30105
\`\`\`

**PARTE 2 - GRAFICO CORRETTO:**

Il grafico A (barplot) mostra due barre side-by-side che rappresentano la frequenza/conteggio dei due materiali.

**PARTE 3 - TEST DI IPOTESI:**

**Domanda:** I due materiali hanno le stesse prestazioni?

**Test appropriato:**
✅ Test t per campioni **indipendenti** (paired=FALSE)

❌ NON appaiato perché:
- Non ci sono misure ripetute
- Campioni diversi di materiali diversi
- Nessun accoppiamento naturale tra osservazioni

**Ipotesi:**
- H₀: μ_A = μ_B (stessa resistenza media)
- H₁: μ_A ≠ μ_B (resistenze diverse)

\`\`\`r
# Test t indipendente, bilaterale
t.test(dati$trazione[dati$materiale == "A"],
       dati$trazione[dati$materiale == "B"],
       alternative = "two.sided",
       paired = FALSE)

# t = 40.xxx, df = xxx, p-value < 2.2e-16
\`\`\`

**P-value:** ≈ 0 (< 0.0001)

**Decisione:** Rifiuto H₀ perché p-value < 0.01

**Conclusione:** I due materiali mediamente **NON** hanno le stesse prestazioni (resistenza diversa).

🎯 **Concetti chiave:**

**Test t INDIPENDENTI vs APPAIATI:**
- **Indipendenti**: gruppi diversi, nessun collegamento
- **Appaiati**: stessi soggetti, misure prima/dopo, coppie naturali

**Interpretazione:**
- p-value ≈ 0 ⟹ evidenza fortissima contro H₀
- Rifiuto H₀ ⟹ i materiali sono significativamente diversi
- NON diciamo "quale è migliore" (test bilaterale)

💡 **Comandi R utili:**
\`\`\`r
# Filtrare per gruppo
dati$var[dati$gruppo == "A"]

# Contare con condizione
sum(condizione)

# Percentile (quantile)
quantile(x, prob)  # prob=0.8 per 80°

# Test t indipendente
t.test(x, y, paired=FALSE)
\`\`\``,
            realExam: "12 Luglio 2024, Domanda 4"
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

        if (question.type === 'numeric' || subQuestion.type === 'numeric') {
            const numAnswer = parseFloat(userAnswer);
            const correctAnswer = parseFloat(subQuestion.answer);
            const tolerance = subQuestion.tolerance || 0.0001;
            return Math.abs(numAnswer - correctAnswer) <= tolerance;
        } else if (question.type === 'choice' || subQuestion.type === 'choice') {
            return parseInt(userAnswer) === subQuestion.correct;
        } else {
            return parseInt(userAnswer) === subQuestion.correct;
        }
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
                        <p className="text-gray-600">Esame 12 Luglio 2024 - Turno 1</p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-blue-600 mb-2">
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
                                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-2">
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
                                                            Tua risposta: {subQ.type === 'choice' || question.type === 'choice'
                                                                ? subQ.options[parseInt(userAnswer)]
                                                                : userAnswer}
                                                            {' | '}Corretta: {subQ.type === 'choice' || question.type === 'choice'
                                                                ? subQ.options[subQ.correct]
                                                                : subQ.answer}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={() => toggleExplanation(question.id)}
                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                    {showExplanation[question.id] ? '▼ Nascondi spiegazione' : '▶ Mostra spiegazione'}
                                </button>

                                {showExplanation[question.id] && (
                                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
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
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all"
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
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                            Esame Reale 12 Luglio 2024
                        </span>
                        <span className="text-3xl">{currentQ.difficulty}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentQ.category}</h2>
                    <p className="text-gray-600">{currentQ.question}</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Domanda {currentQuestion + 1} di {questions.length}</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Sub Questions */}
                <div className="space-y-6 mb-8">
                    {currentQ.subQuestions.map((subQ, subIndex) => (
                        <div key={subIndex} className="p-4 bg-gray-50 rounded-lg">
                            <p className="font-medium mb-3">{subQ.text}</p>
                            {subQ.hint && (
                                <p className="text-sm text-blue-600 mb-2">💡 Suggerimento: {subQ.hint}</p>
                            )}

                            {(currentQ.type === 'numeric' || subQ.type === 'numeric') && (
                                <input
                                    type="text"
                                    value={selectedAnswers[`${currentQ.id}-${subIndex}`] || ''}
                                    onChange={(e) => handleAnswer(currentQ.id, subIndex, e.target.value)}
                                    placeholder="Inserisci la risposta (es. 0.1234)"
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                />
                            )}

                            {(currentQ.type === 'fill' || currentQ.type === 'choice' || subQ.type === 'choice') && (
                                <div className="space-y-2">
                                    {subQ.options.map((option, optIndex) => (
                                        <label
                                            key={optIndex}
                                            className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                                                selectedAnswers[`${currentQ.id}-${subIndex}`] === optIndex.toString()
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-300 hover:border-blue-300'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name={`question-${currentQ.id}-${subIndex}`}
                                                value={optIndex}
                                                checked={selectedAnswers[`${currentQ.id}-${subIndex}`] === optIndex.toString()}
                                                onChange={(e) => handleAnswer(currentQ.id, subIndex, e.target.value)}
                                                className="mr-3"
                                            />
                                            <span>{option}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
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
                            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all"
                        >
                            Prossima
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

export default QuizLuglio2024;
