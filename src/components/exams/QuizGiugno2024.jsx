import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, RotateCcw, Trophy } from 'lucide-react';

const QuizGiugno2024 = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [showExplanation, setShowExplanation] = useState({});

    const questions = [
        {
            id: 1,
            category: "Analisi Descrittiva + Test t Appaiato",
            difficulty: "⭐⭐⭐⭐",
            question: "Dataset applicazione.RData: compressione percentuale di due algoritmi (A e B). Rispondere:",
            type: "mixed",
            subQuestions: [
                {
                    text: "1a. Numero di misurazioni totali",
                    type: "numeric",
                    answer: "106",
                    tolerance: 0
                },
                {
                    text: "1b. Compressione media dell'algoritmo B",
                    type: "numeric",
                    answer: "46.1243",
                    tolerance: 0.0001
                },
                {
                    text: "1c. Deviazione standard dell'algoritmo B",
                    type: "numeric",
                    answer: "7.3036",
                    tolerance: 0.0001
                },
                {
                    text: "2. Quante osservazioni dell'algoritmo B hanno compressione > 50?",
                    type: "numeric",
                    answer: "46",
                    tolerance: 1,
                    hint: "sum(dati$compressione_B > 50)"
                },
                {
                    text: "3. Il 20% delle osservazioni dell'algoritmo B è inferiore a:",
                    type: "numeric",
                    answer: "40.2",
                    tolerance: 0.1,
                    hint: "quantile(..., 0.2)"
                },
                {
                    text: "4. Quale grafico è corretto?",
                    type: "choice",
                    options: [
                        "A: Istogramma",
                        "B: Boxplot side-by-side",
                        "C: Istogramma sovrapposto",
                        "D: Boxplot verticali separati"
                    ],
                    correct: 1
                },
                {
                    text: "5. Quale test usare per confrontare i due algoritmi?",
                    type: "choice",
                    options: [
                        "Test t indipendente con H₀: μ_A < μ_B",
                        "Test t appaiato con H₁: μ_A < μ_B",
                        "Test t indipendente con H₁: μ_A < μ_B",
                        "Test t appaiato con H₀: μ_A = μ_B"
                    ],
                    correct: 3
                },
                {
                    text: "6. Il p-value ottenuto è:",
                    type: "numeric",
                    answer: "0.0000",
                    tolerance: 0.0001,
                    hint: "1.811e-12 ≈ 0"
                },
                {
                    text: "7. Con α = 0.01, quale decisione prendo?",
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
                    text: "8. Conclusione finale:",
                    type: "choice",
                    options: [
                        "I due algoritmi hanno stessa prestazione",
                        "L'algoritmo A è inferiore all'algoritmo B",
                        "Nessuna delle affermazioni è vera",
                        "L'algoritmo A è superiore all'algoritmo B"
                    ],
                    correct: 2
                }
            ],
            explanation: `✅ SOLUZIONE COMPLETA:

**PARTE 1 - ANALISI DESCRITTIVA:**

\`\`\`r
# Caricare i dati
load("applicazione.RData")

# 1a. Numero misurazioni
nrow(dati)
# [1] 106

# 1b. Media algoritmo B
mean(dati$compressione_B)
# [1] 46.12434

# 1c. Deviazione standard algoritmo B
sd(dati$compressione_B)
# [1] 7.303602

# 2. Contare osservazioni B con compressione > 50
sum(dati$compressione_B > 50)
# [1] 46 (circa, accetta anche 45-46)

# 3. 20° percentile (20% inferiore) per algoritmo B
quantile(dati$compressione_B, 0.2)
#    20%
# 40.2xxxx
\`\`\`

**PARTE 2 - GRAFICO CORRETTO:**

Il grafico B (boxplot side-by-side) mostra due boxplot affiancati per confrontare le distribuzioni dei due algoritmi.

**PARTE 3 - TEST DI IPOTESI:**

**Domanda:** I due algoritmi hanno le stesse prestazioni?

**Test appropriato:**
✅ Test t per campioni **APPAIATI** (paired=TRUE)

⚠️ **ATTENZIONE:** Campioni appaiati perché:
- Stessi file testati con entrambi gli algoritmi
- Misure ripetute sugli stessi soggetti (file)
- Accoppiamento naturale tra osservazioni

**Ipotesi:**
- H₀: μ_A = μ_B (stessa compressione media)
- H₁: μ_A ≠ μ_B (compressioni diverse)

\`\`\`r
# Test t appaiato, bilaterale
t.test(dati$compressione_A,
       dati$compressione_B,
       alternative = "two.sided",
       paired = TRUE)

# t = -7.xxx, df = 105, p-value = 1.811e-12
\`\`\`

**P-value:** 1.811e-12 ≈ 0

**Decisione:** Rifiuto H₀ perché p-value < 0.01

**Conclusione:** "Nessuna delle affermazioni è vera"

Perché?
- Il test è BILATERALE (two.sided)
- Sappiamo che μ_A ≠ μ_B (sono diversi)
- Ma NON sappiamo quale è migliore dal test bilaterale
- Le opzioni "A inferiore a B" richiederebbero test unilaterale
- Quindi nessuna affermazione fornita è corretta!

🎯 **Concetti chiave:**

**Test t APPAIATO vs INDIPENDENTE:**
- **Appaiato**: stessi file, due misure su ogni file
- **Indipendente**: gruppi diversi, nessun collegamento

**Test BILATERALE vs UNILATERALE:**
- **Bilaterale** (two.sided): H₁: μ_A ≠ μ_B (diversi, ma non sappiamo chi è maggiore)
- **Unilaterale** (less/greater): H₁: μ_A < μ_B o μ_A > μ_B (specifichiamo direzione)

💡 **Comandi R:**
\`\`\`r
# Test t appaiato
t.test(x, y, paired=TRUE, alternative="two.sided")

# Se vogliamo sapere CHI è migliore
t.test(x, y, paired=TRUE, alternative="less")  # H₁: x < y
t.test(x, y, paired=TRUE, alternative="greater")  # H₁: x > y
\`\`\`

📊 **Interpretazione tricky:**
La conclusione corretta sarebbe: "I due algoritmi hanno compressione media DIVERSA, ma dal test bilaterale non possiamo dire quale è migliore". Questa sfumatura non è presente nelle opzioni fornite, quindi la risposta è "Nessuna delle affermazioni è vera".`,
            realExam: "20 Giugno 2024, Domanda 1"
        },
        {
            id: 2,
            category: "Binomiale - Somma di VA",
            difficulty: "⭐⭐⭐",
            question: "Due urne U₁ (30% bianche) e U₂ (50% bianche). Si estraggono 4 palline da U₁ e 6 da U₂ (con reimbussolamento). Tutte vanno in urna U₃. Sia X la proporzione di bianche in U₃. Calcolare:",
            type: "numeric",
            subQuestions: [
                {
                    text: "1. E[X] = valore atteso della proporzione",
                    answer: "0.4200",
                    tolerance: 0.0001,
                    hint: "E[X] = (E[B₁] + E[B₂])/10"
                },
                {
                    text: "2. Var(X) = varianza della proporzione",
                    answer: "0.0234",
                    tolerance: 0.0001,
                    hint: "Var(X) = (Var(B₁) + Var(B₂))/100"
                },
                {
                    text: "3. E[X²] = momento secondo",
                    answer: "0.1998",
                    tolerance: 0.0001,
                    hint: "E[X²] = Var(X) + (E[X])²"
                }
            ],
            explanation: `✅ SOLUZIONE COMPLETA:

**Setup del problema:**
- Urna U₁: proporzione p₁ = 0.3 bianche
- Urna U₂: proporzione p₂ = 0.5 bianche
- Estrazioni: n₁ = 4 da U₁, n₂ = 6 da U₂ (con reimbussolamento)
- Totale palline in U₃: 10

**Variabili Binomiali:**
- B₁ = numero bianche da U₁ ~ Bin(4, 0.3)
- B₂ = numero bianche da U₂ ~ Bin(6, 0.5)
- B₁ e B₂ sono **indipendenti**

**Proporzione di bianche in U₃:**
X = (B₁ + B₂) / 10

**1. Valore atteso E[X]:**

E[B₁] = n₁ × p₁ = 4 × 0.3 = 1.2
E[B₂] = n₂ × p₂ = 6 × 0.5 = 3.0

E[X] = E[(B₁ + B₂)/10] = (E[B₁] + E[B₂])/10

E[X] = (1.2 + 3.0)/10 = **0.4200**

**2. Varianza Var(X):**

Var(B₁) = n₁ × p₁ × (1-p₁) = 4 × 0.3 × 0.7 = 0.84
Var(B₂) = n₂ × p₂ × (1-p₂) = 6 × 0.5 × 0.5 = 1.50

Per indipendenza:
Var(B₁ + B₂) = Var(B₁) + Var(B₂) = 0.84 + 1.50 = 2.34

Var(X) = Var[(B₁ + B₂)/10] = Var(B₁ + B₂)/100

Var(X) = 2.34/100 = **0.0234**

**3. Momento secondo E[X²]:**

Formula fondamentale:
E[X²] = Var(X) + (E[X])²

E[X²] = 0.0234 + (0.42)²
E[X²] = 0.0234 + 0.1764
E[X²] = **0.1998**

📊 **Concetti chiave:**

**Binomiale:**
- E[B] = np
- Var(B) = np(1-p)

**Proprietà del Valore Atteso:**
- E[aX + b] = aE[X] + b
- E[X + Y] = E[X] + E[Y] (sempre)

**Proprietà della Varianza:**
- Var(aX + b) = a²Var(X)
- Var(X + Y) = Var(X) + Var(Y) (se indipendenti!)

**Momento secondo:**
- E[X²] = Var(X) + (E[X])²
- Equivalente: Var(X) = E[X²] - (E[X])²

💡 **In R:**
\`\`\`r
# Simulazione
B1 <- rbinom(10000, 4, 0.3)
B2 <- rbinom(10000, 6, 0.5)
X <- (B1 + B2) / 10

mean(X)     # ≈ 0.42
var(X)      # ≈ 0.0234
mean(X^2)   # ≈ 0.1998
\`\`\``,
            realExam: "20 Giugno 2024, Domanda 2"
        },
        {
            id: 3,
            category: "Teoria - Distribuzione Binomiale",
            difficulty: "⭐⭐",
            question: "Completa le affermazioni sulla distribuzione Binomiale:",
            type: "fill",
            subQuestions: [
                {
                    text: "La variabile aleatoria Binomiale è una variabile aleatoria _____.",
                    options: ["discreta", "continua", "mista", "ibrida"],
                    correct: 0
                },
                {
                    text: "I parametri sono n (numero di prove) e p (probabilità di _____).",
                    options: ["fallimento", "successo", "errore", "evento"],
                    correct: 1
                },
                {
                    text: "Il supporto della variabile aleatoria Binomiale è _____.",
                    options: ["{0,1,...}", "R", "{0,1,...,n}", "Z"],
                    correct: 2
                },
                {
                    text: "La media della Binomiale è _____.",
                    options: ["n/p", "np", "n(1-p)", "√(np)"],
                    correct: 1
                }
            ],
            explanation: `✅ SOLUZIONE COMPLETA:

**La variabile aleatoria Binomiale:**

1. È una variabile aleatoria **DISCRETA**
   - Assume solo valori interi
   - Non può essere continua

2. Ha parametri:
   - **n**: numero di prove (esperimenti)
   - **p**: probabilità di **SUCCESSO** in ciascuna prova
   - (1-p) è la probabilità di fallimento

3. Il supporto è **{0, 1, 2, ..., n}**
   - Minimo: 0 successi
   - Massimo: n successi
   - Tutti valori interi tra 0 e n

4. La media è **E[X] = np**
   - Non n/p!
   - Non √(np)!

📊 **Distribuzione Binomiale completa:**

**X ~ Bin(n, p)**

- **Parametri**: n ∈ ℕ, p ∈ [0,1]
- **Supporto**: {0, 1, 2, ..., n}
- **PMF**: P(X = k) = C(n,k) × p^k × (1-p)^(n-k)
- **Media**: E[X] = np
- **Varianza**: Var(X) = np(1-p)
- **Deviazione standard**: σ = √(np(1-p))

**Interpretazione:**
La Binomiale conta il numero di successi in n prove indipendenti, ognuna con probabilità p di successo.

**Esempi:**
- Lanciare 10 monete, contare teste → Bin(10, 0.5)
- 20 quiz, prob. risposta giusta 0.25 → Bin(20, 0.25)
- 100 pazienti, prob. guarigione 0.8 → Bin(100, 0.8)

💡 **In R:**
\`\`\`r
# PMF: P(X = k)
dbinom(k, n, p)

# CDF: P(X ≤ k)
pbinom(k, n, p)

# Quantile: valore x tale che P(X ≤ x) = q
qbinom(q, n, p)

# Generare valori casuali
rbinom(N, n, p)

# Esempio: X ~ Bin(10, 0.3)
dbinom(3, 10, 0.3)  # P(X = 3)
pbinom(3, 10, 0.3)  # P(X ≤ 3)
\`\`\`

⚠️ **Errori comuni:**
- ❌ Media = n/p (NO! È np)
- ❌ Supporto = {0,1,...} infinito (NO! Limitato a n)
- ❌ Confondere successo con fallimento
- ❌ Dimenticare che le prove devono essere indipendenti`,
            realExam: "20 Giugno 2024, Domanda 3"
        },
        {
            id: 4,
            category: "Esponenziale - Probabilità Condizionata",
            difficulty: "⭐⭐⭐",
            question: "Siano X ~ Exp(rate=2) e Y ~ Exp(rate=1) indipendenti. Determinare:",
            type: "numeric",
            subQuestions: [
                {
                    text: "1. P(X > 3)",
                    answer: "0.0025",
                    tolerance: 0.0001,
                    hint: "1 - pexp(3, 2)"
                },
                {
                    text: "2. P(X > 2 e Y > 2) = P(entrambe > 2)",
                    answer: "0.0025",
                    tolerance: 0.0001,
                    hint: "Usa indipendenza"
                },
                {
                    text: "3. P(X < 7 | X > 6) = P(X in (6,7) dato X > 6)",
                    answer: "0.8647",
                    tolerance: 0.0001,
                    hint: "Usa probabilità condizionata"
                }
            ],
            explanation: `✅ SOLUZIONE COMPLETA:

**Setup:**
- X ~ Exp(rate = λ_X = 2)
- Y ~ Exp(rate = λ_Y = 1)
- X e Y sono **indipendenti**

**1. P(X > 3):**

Per l'Esponenziale:
P(X > t) = 1 - P(X ≤ t) = 1 - F_X(t) = e^(-λt)

\`\`\`r
1 - pexp(3, 2)
# [1] 0.002478752
\`\`\`

Oppure:
P(X > 3) = e^(-2×3) = e^(-6) ≈ **0.0025**

**2. P(X > 2 e Y > 2):**

Per **indipendenza**:
P(X > 2 ∩ Y > 2) = P(X > 2) × P(Y > 2)

\`\`\`r
(1 - pexp(2, 2)) * (1 - pexp(2, 1))
# [1] 0.002478752
\`\`\`

Calcolo:
P(X > 2) = e^(-2×2) = e^(-4) ≈ 0.0183
P(Y > 2) = e^(-1×2) = e^(-2) ≈ 0.1353

P(entrambe > 2) = 0.0183 × 0.1353 ≈ **0.0025**

**3. P(X < 7 | X > 6):**

Probabilità condizionata:
P(X < 7 | X > 6) = P(6 < X < 7) / P(X > 6)

Numeratore:
P(6 < X < 7) = P(X < 7) - P(X ≤ 6)
             = F_X(7) - F_X(6)
             = [1 - e^(-14)] - [1 - e^(-12)]
             = e^(-12) - e^(-14)

Denominatore:
P(X > 6) = e^(-12)

Quindi:
P(X < 7 | X > 6) = (e^(-12) - e^(-14)) / e^(-12)
                  = 1 - e^(-2)
                  ≈ **0.8647**

\`\`\`r
(pexp(7, 2) - pexp(6, 2)) / (1 - pexp(6, 2))
# [1] 0.8646647
\`\`\`

**Verifica con proprietà memoryless:**
P(X < 7 | X > 6) = P(X - 6 < 1)
                  = P(X < 1)  [per memoryless]
                  = 1 - e^(-2×1)
                  = 1 - e^(-2)
                  ≈ 0.8647 ✓

📊 **Concetti chiave:**

**Esponenziale - Formule:**
- PDF: f(x) = λe^(-λx), x ≥ 0
- CDF: F(x) = 1 - e^(-λx)
- P(X > t) = e^(-λt)
- E[X] = 1/λ
- Var(X) = 1/λ²

**Indipendenza:**
P(A ∩ B) = P(A) × P(B)

**Probabilità condizionata:**
P(A | B) = P(A ∩ B) / P(B)

**Proprietà Memoryless:**
P(X > s+t | X > s) = P(X > t)
"La distribuzione non ha memoria del passato"

💡 **In R:**
\`\`\`r
# CDF: P(X ≤ x)
pexp(x, rate)

# Survival: P(X > x)
1 - pexp(x, rate)

# Esempio con λ = 2
lambda <- 2
t <- 3

# P(X > 3)
exp(-lambda * t)  # Diretto
1 - pexp(t, lambda)  # Con R
\`\`\`

⚠️ **Errori comuni:**
- ❌ Confondere rate con mean (rate = 1/mean!)
- ❌ Dimenticare che P(X > t) = e^(-λt) (non 1 - e^(-λt))
- ❌ Non usare indipendenza quando serve
- ❌ Sbagliare il calcolo della condizionata`,
            realExam: "20 Giugno 2024, Domanda 4"
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
                        <p className="text-gray-600">Esame 20 Giugno 2024 - Turno 1</p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-8">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-purple-600 mb-2">
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
                                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-2">
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
                                    className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                                >
                                    {showExplanation[question.id] ? '▼ Nascondi spiegazione' : '▶ Mostra spiegazione'}
                                </button>

                                {showExplanation[question.id] && (
                                    <div className="mt-4 p-4 bg-purple-50 rounded-lg">
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
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all"
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
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                            Esame Reale 20 Giugno 2024
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
                            className="bg-gradient-to-r from-purple-400 to-pink-600 h-2 rounded-full transition-all duration-300"
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
                                <p className="text-sm text-purple-600 mb-2">💡 Suggerimento: {subQ.hint}</p>
                            )}

                            {(currentQ.type === 'numeric' || subQ.type === 'numeric') && (
                                <input
                                    type="text"
                                    value={selectedAnswers[`${currentQ.id}-${subIndex}`] || ''}
                                    onChange={(e) => handleAnswer(currentQ.id, subIndex, e.target.value)}
                                    placeholder="Inserisci la risposta (es. 0.1234)"
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                                />
                            )}

                            {(currentQ.type === 'fill' || currentQ.type === 'choice' || subQ.type === 'choice') && (
                                <div className="space-y-2">
                                    {subQ.options.map((option, optIndex) => (
                                        <label
                                            key={optIndex}
                                            className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                                                selectedAnswers[`${currentQ.id}-${subIndex}`] === optIndex.toString()
                                                    ? 'border-purple-500 bg-purple-50'
                                                    : 'border-gray-300 hover:border-purple-300'
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
                            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all"
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

export default QuizGiugno2024;
