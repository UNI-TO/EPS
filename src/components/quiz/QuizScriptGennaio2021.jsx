import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, RotateCcw, Trophy, Code } from 'lucide-react';

const QuizScriptGennaio2021 = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [showExplanation, setShowExplanation] = useState({});

    const questions = [
        {
            id: 1,
            category: "Poisson con Probabilità Totale",
            difficulty: "⭐⭐⭐",
            question: "Un ristorante ha due tipi di clienti: con fame (35%) e senza fame (65%). I clienti con fame ordinano in media 5 piatti (Poisson), quelli senza fame 2 piatti. Calcolare:",
            type: "numeric",
            subQuestions: [
                {
                    text: "1. P(cliente ordina ≤ 2 piatti)",
                    answer: "0.4606",
                    tolerance: 0.001,
                    hint: "Usa la legge della probabilità totale"
                },
                {
                    text: "2. P(cliente NON ha fame | ordina esattamente 3 piatti)",
                    answer: "0.5286",
                    tolerance: 0.001,
                    hint: "Usa Bayes: P(NoFame|3) = P(3|NoFame)×P(NoFame) / P(3)"
                }
            ],
            explanation: `✅ SOLUZIONE COMPLETA:

**Setup:**
- P(Fame) = 0.35, P(NoFame) = 0.65
- X_Fame ~ Poisson(λ = 5)
- X_NoFame ~ Poisson(λ = 2)

**1. P(X ≤ 2):**

Usiamo la **legge della probabilità totale**:
P(X ≤ 2) = P(X ≤ 2 | Fame) × P(Fame) + P(X ≤ 2 | NoFame) × P(NoFame)

\`\`\`r
lambdaFame <- 5
lambdaNoFame <- 2
pFame <- 0.35
pNoFame <- 0.65

menoTreFame <- ppois(2, lambdaFame)
menoTreNonFame <- ppois(2, lambdaNoFame)

pFame * menoTreFame + pNoFame * menoTreNonFame
# [1] 0.4606185
\`\`\`

**Risposta:** 0.4606

**2. P(NoFame | X = 3):**

Usiamo il **teorema di Bayes**:
P(NoFame | X=3) = [P(X=3 | NoFame) × P(NoFame)] / P(X=3)

Prima calcoliamo P(X=3):
\`\`\`r
pTreB <- pFame * dpois(3, lambdaFame) +
         pNoFame * dpois(3, lambdaNoFame)
# [1] 0.1965
\`\`\`

Poi applichiamo Bayes:
\`\`\`r
pTreNoFame <- dpois(3, lambdaNoFame)
(pTreNoFame * pNoFame) / pTreB
# [1] 0.5286
\`\`\`

**Risposta:** 0.5286

📊 **Concetti chiave:**

**Legge della probabilità totale:**
P(A) = Σ P(A | B_i) × P(B_i)

**Teorema di Bayes:**
P(B | A) = [P(A | B) × P(B)] / P(A)

💡 **Pattern comune:**
Quando hai gruppi con distribuzioni diverse, usa:
1. Probabilità totale per eventi NON condizionati
2. Bayes per probabilità condizionate inverse`,
            realExam: "Appello Gennaio 2021, Esercizio 1"
        },
        {
            id: 2,
            category: "Esponenziale + Binomiale",
            difficulty: "⭐⭐⭐",
            question: "Durata batterie ~ Exp(media = 400 ore). Si hanno 6 batterie. Calcolare:",
            type: "numeric",
            subQuestions: [
                {
                    text: "1. P(batteria dura > 800 ore)",
                    answer: "0.1353",
                    tolerance: 0.001,
                    hint: "Esponenziale con rate = 1/400"
                },
                {
                    text: "2. Varianza della distribuzione",
                    answer: "160000",
                    tolerance: 100,
                    hint: "Var(Exp) = 1/λ² = media²"
                },
                {
                    text: "3. P(esattamente 1 su 6 dura > 800 ore)",
                    answer: "0.3932",
                    tolerance: 0.001,
                    hint: "Binomiale con n=6, p=P(>800)"
                }
            ],
            explanation: `✅ SOLUZIONE COMPLETA:

**Setup:**
X ~ Exp(media = 400) ⟹ rate λ = 1/400 = 0.0025

**1. P(X > 800):**

\`\`\`r
media <- 400
lambda <- 1/media
pOttocento <- 1 - pexp(800, lambda)
# [1] 0.1353353

# Verifica
1 - pexp(400, lambda)  # P(X > 400) = 0.3679 ≈ e^(-1) ✓
\`\`\`

**Risposta:** 0.1353

**2. Varianza:**

Per Esponenziale:
- E[X] = 1/λ = 400
- Var(X) = 1/λ² = (1/0.0025)² = 400²

\`\`\`r
1/lambda^2
# [1] 160000
\`\`\`

**Risposta:** 160000

**3. P(esattamente 1 su 6 dura > 800):**

Sia Y = numero di batterie su 6 che durano > 800 ore
Y ~ Binomiale(n=6, p=0.1353)

P(Y = 1):
\`\`\`r
dbinom(1, 6, pOttocento)
# [1] 0.3932448
\`\`\`

**Risposta:** 0.3932

📊 **Concetti chiave:**

**Esponenziale:**
- Parametro "rate" λ = 1/media
- P(X > t) = e^(-λt) = 1 - pexp(t, λ)
- Var(X) = 1/λ² = media²

**Combinare distribuzioni:**
1. Trova probabilità singola (Esponenziale)
2. Conta quante volte succede (Binomiale)

⚠️ **Attenzione:**
In R, \`pexp\` usa "rate" NON "mean"!
\`\`\`r
# Corretto
pexp(t, rate = 1/media)

# Equivalente
pexp(t, rate = lambda)
\`\`\``,
            realExam: "Appello Gennaio 2021, Esercizio 2"
        },
        {
            id: 3,
            category: "Esponenziale + Binomiale (Durata chiamate)",
            difficulty: "⭐⭐⭐",
            question: "Durata chiamate ~ Exp(rate = 0.045 min⁻¹). Si fanno 3 chiamate. Calcolare:",
            type: "numeric",
            subQuestions: [
                {
                    text: "1. P(chiamata dura < 55 minuti)",
                    answer: "0.9343",
                    tolerance: 0.001,
                    hint: "pexp(55, 0.045)"
                },
                {
                    text: "2. Durata media totale di 3 chiamate",
                    answer: "66.67",
                    tolerance: 0.5,
                    hint: "3 × E[X] = 3/λ"
                },
                {
                    text: "3. P(almeno 1 su 3 dura < 55 minuti)",
                    answer: "0.9997",
                    tolerance: 0.001,
                    hint: "1 - P(tutte ≥ 55)"
                }
            ],
            explanation: `✅ SOLUZIONE COMPLETA:

**Setup:**
X ~ Exp(rate = λ = 0.045 min⁻¹)

**1. P(X < 55):**

\`\`\`r
lambda <- 0.045
corta <- pexp(55, lambda)
# [1] 0.9343
\`\`\`

**Risposta:** 0.9343

**2. Durata media totale di 3 chiamate:**

E[X] = 1/λ = 1/0.045 ≈ 22.22 minuti

Per 3 chiamate:
E[X₁ + X₂ + X₃] = 3 × E[X] = 3/λ

\`\`\`r
1/lambda * 3
# [1] 66.66667
\`\`\`

**Risposta:** 66.67 minuti

**3. P(almeno 1 su 3 < 55):**

Complementare: P(almeno 1 < 55) = 1 - P(tutte ≥ 55)

Sia Y = numero di chiamate < 55 su 3
Y ~ Binomiale(n=3, p=0.9343)

P(Y ≥ 1) = 1 - P(Y = 0)

\`\`\`r
1 - pbinom(0, 3, corta)
# [1] 0.9997179
\`\`\`

**Risposta:** 0.9997

📊 **Concetti chiave:**

**Esponenziale - Media:**
- E[X] = 1/λ
- λ è il "rate" (tasso di occorrenza)
- 1/λ è il tempo medio tra eventi

**Somma di VA:**
- E[X₁ + X₂ + ... + Xₙ] = n × E[X]
- Vale sempre (anche se non indipendenti!)

**"Almeno uno":**
- P(almeno 1) = 1 - P(nessuno)
- Spesso più facile calcolare il complementare

💡 **Pattern:**
1. Trova p = P(singolo evento)
2. Usa Binomiale per contare quanti successi
3. "Almeno k" → 1 - pbinom(k-1, n, p)`,
            realExam: "Appello Gennaio 2021, Esercizio 3"
        },
        {
            id: 4,
            category: "Ipergeometrica + Bayes",
            difficulty: "⭐⭐⭐⭐",
            question: "Due urne: Verde (4 piene, 6 mezze) e Blu (2 piene, 10 mezze). Si sceglie un'urna (50%-50%), si estraggono 3 palline senza reimbussolamento. Calcolare:",
            type: "numeric",
            subQuestions: [
                {
                    text: "1. P(tutte 3 mezze)",
                    answer: "0.3167",
                    tolerance: 0.001,
                    hint: "Probabilità totale con Ipergeometrica"
                },
                {
                    text: "2. P(almeno 1 piena dall'urna Verde)",
                    answer: "0.8333",
                    tolerance: 0.001,
                    hint: "1 - P(tutte mezze da Verde)"
                },
                {
                    text: "3. P(urna Blu | estratte 2 piene e 1 mezza)",
                    answer: "0.0833",
                    tolerance: 0.001,
                    hint: "Bayes con Ipergeometrica"
                }
            ],
            explanation: `✅ SOLUZIONE COMPLETA:

**Setup:**
- Urna Verde: 4 piene (P), 6 mezze (M), totale 10
- Urna Blu: 2 piene (P), 10 mezze (M), totale 12
- P(Verde) = P(Blu) = 0.5
- Estraiamo 3 palline **senza reimbussolamento** → Ipergeometrica

**1. P(3 mezze):**

Legge probabilità totale:
P(3M) = P(3M | V) × P(V) + P(3M | B) × P(B)

\`\`\`r
# dhyper(k, m, n, d)
# k = numero successi voluti
# m = successi nella popolazione
# n = fallimenti nella popolazione
# d = dimensione campione

pVerde <- 0.5 * dhyper(3, 6, 4, 3)  # 3 mezze da 6 mezze, 4 piene
pBlu <- 0.5 * dhyper(3, 10, 2, 3)   # 3 mezze da 10 mezze, 2 piene

pVerde + pBlu
# [1] 0.3166667
\`\`\`

**Risposta:** 0.3167

**2. P(almeno 1 piena | Verde):**

P(≥1P | V) = 1 - P(0P | V) = 1 - P(3M | V)

\`\`\`r
1 - phyper(0, 6, 4, 3)
# [1] 0.8333333
\`\`\`

Oppure:
\`\`\`r
1 - dhyper(3, 6, 4, 3) / 0.5  # Condizionata a Verde
# [1] 0.8333
\`\`\`

**Risposta:** 0.8333

**3. P(Blu | 2P1M):**

Teorema di Bayes:
P(B | 2P1M) = [P(2P1M | B) × P(B)] / P(2P1M)

Prima calcoliamo P(2P1M | B):
\`\`\`r
# 2 piene da 2 piene E 1 mezza da 10 mezze
aBlu <- dhyper(2, 2, 10, 2) * dhyper(1, 10, 0, 1)
# [1] 0.0151515 (2 piene sono tutte)× (1 mezza certa)
\`\`\`

Poi P(2P1M) totale:
\`\`\`r
pTot <- 0.5 * aBlu +
        0.5 * dhyper(2, 4, 6, 2) * dhyper(1, 6, 2, 1)
# [1] 0.0909091
\`\`\`

Infine Bayes:
\`\`\`r
(aBlu * 0.5) / pTot
# [1] 0.08333333
\`\`\`

**Risposta:** 0.0833

📊 **Concetti chiave:**

**Ipergeometrica:**
X ~ Hyper(N, K, n)
- N = dimensione popolazione
- K = successi nella popolazione
- n = dimensione campione
- P(X = k) = C(K,k) × C(N-K, n-k) / C(N,n)

**In R:**
\`\`\`r
dhyper(k, m, n, d)
# k = successi voluti
# m = successi disponibili
# n = fallimenti disponibili
# d = estrazioni
\`\`\`

**Eventi multipli senza reimbussolamento:**
Se servono 2 condizioni (es. "2P E 1M"):
P(2P ∩ 1M) = P(2P) × P(1M | 2P estratte)
Oppure usa dhyper due volte e moltiplica

⚠️ **Attenzione ordine parametri dhyper!**
dhyper(k, successi_disp, fallimenti_disp, estrazioni)`,
            realExam: "Appello Gennaio 2021, Esercizio 4"
        },
        {
            id: 5,
            category: "Normale + Binomiale",
            difficulty: "⭐⭐⭐",
            question: "Altezza piante ~ N(6.5, 0.6). Si selezionano 7 piante. Calcolare:",
            type: "numeric",
            subQuestions: [
                {
                    text: "1. P(pianta ha altezza < 5.6 cm)",
                    answer: "0.0668",
                    tolerance: 0.001,
                    hint: "pnorm(5.6, 6.5, 0.6)"
                },
                {
                    text: "2. P(altezza tra 5.3 e 7.6 cm)",
                    answer: "0.9404",
                    tolerance: 0.001,
                    hint: "pnorm(7.6, ...) - pnorm(5.3, ...)"
                },
                {
                    text: "3. 13° percentile (altezza sotto cui cade il 13%)",
                    answer: "5.8185",
                    tolerance: 0.01,
                    hint: "qnorm(0.13, 6.5, 0.6)"
                },
                {
                    text: "4. P(al più 3 su 7 hanno altezza < 5.6)",
                    answer: "0.9998",
                    tolerance: 0.001,
                    hint: "pbinom(3, 7, p<5.6)"
                }
            ],
            explanation: `✅ SOLUZIONE COMPLETA:

**Setup:**
X ~ N(μ = 6.5, σ = 0.6)

**1. P(X < 5.6):**

\`\`\`r
media <- 6.5
sd <- 0.6

pMeno <- pnorm(5.6, media, sd)
# [1] 0.06680721
\`\`\`

**Risposta:** 0.0668

**2. P(5.3 < X < 7.6):**

P(a < X < b) = F(b) - F(a)

\`\`\`r
pnorm(7.6, media, sd) - pnorm(5.3, media, sd)
# [1] 0.9404
\`\`\`

**Risposta:** 0.9404

**3. 13° percentile:**

Trovare x tale che P(X ≤ x) = 0.13

\`\`\`r
qnorm(0.13, media, sd)
# [1] 5.818516
\`\`\`

**Risposta:** 5.8185

**4. P(al più 3 su 7 < 5.6):**

Sia Y = numero di piante su 7 con altezza < 5.6
Y ~ Binomiale(n=7, p=0.0668)

P(Y ≤ 3):
\`\`\`r
pbinom(3, 7, pMeno)
# [1] 0.9998445
\`\`\`

**Risposta:** 0.9998

📊 **Concetti chiave:**

**Normale - Funzioni R:**
- \`pnorm(x, mean, sd)\`: P(X ≤ x) [CDF]
- \`qnorm(p, mean, sd)\`: x tale che P(X ≤ x) = p [quantile]
- \`dnorm(x, mean, sd)\`: densità in x [PDF]

**Intervalli:**
- P(a < X < b) = pnorm(b, μ, σ) - pnorm(a, μ, σ)

**Percentili:**
- p-esimo percentile = qnorm(p/100, μ, σ)
- Es: 13° percentile = qnorm(0.13, μ, σ)

**Combinare con Binomiale:**
1. Calcola p = P(evento singolo) con Normale
2. Conta quanti eventi con Binomiale(n, p)

💡 **Pattern comune:**
Normale per eventi singoli + Binomiale per conteggi`,
            realExam: "Appello Gennaio 2021, Esercizio 5"
        },
        {
            id: 6,
            category: "Binomiale con Reimbussolamento + Bayes",
            difficulty: "⭐⭐⭐⭐",
            question: "Due urne: Verde (4P, 10M) e Blu (1P, 8M). Si sceglie urna (50%-50%), si estraggono 4 palline CON reimbussolamento. Calcolare:",
            type: "numeric",
            subQuestions: [
                {
                    text: "1. P(esattamente 3 mezze)",
                    answer: "0.3175",
                    tolerance: 0.001,
                    hint: "Binomiale con reimbussolamento"
                },
                {
                    text: "2. P(almeno 1 mezza dall'urna Verde)",
                    answer: "0.9898",
                    tolerance: 0.001,
                    hint: "1 - P(tutte piene | Verde)"
                },
                {
                    text: "3. P(Blu | estratte 2P2M)",
                    answer: "0.7049",
                    tolerance: 0.001,
                    hint: "Bayes con Binomiale"
                }
            ],
            explanation: `✅ SOLUZIONE COMPLETA:

**Setup:**
- Urna Verde: 4P, 10M (tot 14) → p_M = 10/14
- Urna Blu: 1P, 8M (tot 9) → p_M = 8/9
- P(Verde) = P(Blu) = 0.5
- Estraiamo 4 volte **con reimbussolamento** → Binomiale

**1. P(3M su 4):**

Legge probabilità totale:

\`\`\`r
pPv <- 4/14  # prob. piene Verde
pMv <- 10/14  # prob. mezze Verde
pPb <- 1/9   # prob. piene Blu
pMb <- 8/9   # prob. mezze Blu

prob3M <- 0.5 * dbinom(3, 4, pMv) +
          0.5 * dbinom(3, 4, pMb)
# [1] 0.3174603
\`\`\`

**Risposta:** 0.3175

**2. P(almeno 1M | Verde):**

P(≥1M | V) = 1 - P(0M | V) = 1 - P(4P | V)

\`\`\`r
1 - pbinom(0, 4, pMv)
# [1] 0.9897959
\`\`\`

**Risposta:** 0.9898

**3. P(Blu | 2P2M):**

Teorema di Bayes:
P(B | 2P2M) = [P(2P2M | B) × P(B)] / P(2P2M)

**IMPORTANTE:** Con reimbussolamento, le estrazioni sono indipendenti!
P(2P ∩ 2M) = C(4,2) × p_P² × p_M²

Ma in R, dbinom già include il coefficiente binomiale:
\`\`\`r
# P(2P E 2M | Blu) = P(2P su 4) con prob pPb
# Equivalente: P(2M su 4) con prob pMb
pBlu <- dbinom(2, 2, pPb) * dbinom(2, 2, pMb)
# Oppure più semplice:
pBlu <- dbinom(2, 4, pPb)  # 2 piene su 4 estrazioni
\`\`\`

Totale:
\`\`\`r
pTot <- 0.5 * dbinom(2, 4, pPv) +
        0.5 * dbinom(2, 4, pPb)

(pBlu * 0.5) / pTot
# [1] 0.704918
\`\`\`

**Risposta:** 0.7049

📊 **Concetti chiave:**

**CON reimbussolamento → Binomiale:**
- Probabilità costante ad ogni estrazione
- Estrazioni indipendenti
- X ~ Bin(n, p)

**SENZA reimbussolamento → Ipergeometrica:**
- Probabilità cambia ad ogni estrazione
- Estrazioni dipendenti
- X ~ Hyper(N, K, n)

**Binomiale - Eventi composti:**
Se voglio "k1 di tipo1 E k2 di tipo2" con k1+k2=n:
- Posso usare dbinom(k1, n, p1)
- Oppure dbinom(k2, n, p2)
- Danno lo stesso risultato!

💡 **Trick:**
Con reimbussolamento è MOLTO più semplice!
Binomiale invece di Ipergeometrica.`,
            realExam: "Appello Gennaio 2021, Esercizio 6"
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
                        <p className="text-gray-600">Quiz Script R - Appello Gennaio 2021</p>
                    </div>

                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-6 mb-8">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-cyan-600 mb-2">
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
                                        <span className="inline-block px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium mb-2">
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
                                    className="text-cyan-600 hover:text-cyan-700 text-sm font-medium"
                                >
                                    {showExplanation[question.id] ? '▼ Nascondi spiegazione' : '▶ Mostra spiegazione'}
                                </button>

                                {showExplanation[question.id] && (
                                    <div className="mt-4 p-4 bg-cyan-50 rounded-lg">
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
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
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
                        <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            Quiz Script R - Gennaio 2021
                        </span>
                        <span className="text-3xl">{currentQ.difficulty}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentQ.category}</h2>
                    <p className="text-gray-600">{currentQ.question}</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Esercizio {currentQuestion + 1} di {questions.length}</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-cyan-400 to-blue-600 h-2 rounded-full transition-all duration-300"
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
                                <p className="text-sm text-cyan-600 mb-2">💡 Suggerimento: {subQ.hint}</p>
                            )}
                            <input
                                type="text"
                                value={selectedAnswers[`${currentQ.id}-${subIndex}`] || ''}
                                onChange={(e) => handleAnswer(currentQ.id, subIndex, e.target.value)}
                                placeholder="Inserisci la risposta (es. 0.1234)"
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none"
                            />
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
                            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
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

export default QuizScriptGennaio2021;
