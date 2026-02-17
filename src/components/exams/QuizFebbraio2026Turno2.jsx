import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertCircle, Download } from 'lucide-react';

const QuizFebbraio2026Turno2 = () => {
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [showSolution, setShowSolution] = useState({});

    const questions = [
        {
            id: 1,
            title: 'Domanda 1: Corsi di Recupero - Probabilità Totali e Bayes',
            type: 'multiple-inputs',
            rDataset: null,
            text: `In una scuola, gli studenti possono scegliere tra due corsi di recupero di matematica:
• **Corso A**: seguito dal 60% degli studenti
• **Corso B**: seguito dal 40% degli studenti

Alla fine dell'anno:
• l'80% degli studenti del corso A supera l'esame
• il 65% degli studenti del corso B supera l'esame`,
            subQuestions: [
                {
                    id: '1a',
                    question: '1. Uno studente viene scelto a caso. Qual è la probabilità che lo studente ha frequentato il corso A?',
                    answer: '0.6'
                },
                {
                    id: '1b',
                    question: '2. Uno studente viene scelto a caso. Qual è la probabilità che lo studente ha frequentato il corso B?',
                    answer: '0.4'
                },
                {
                    id: '1c',
                    question: '3. Uno studente viene scelto a caso. Qual è la probabilità che lo studente ha superato l\'esame?',
                    answer: '0.74'
                },
                {
                    id: '1d',
                    question: '4. Uno studente viene scelto a caso tra quelli che hanno superato l\'esame. Qual è la probabilità che lo studente provenga dal corso A?',
                    answer: '0.6486'
                }
            ],
            solution: `**Soluzione:**

Sia:
- A: lo studente ha frequentato il corso A
- B: lo studente ha frequentato il corso B
- S: lo studente ha superato l'esame

**1) P(A) = 0.6** (dato dal problema)

**2) P(B) = 0.4** (dato dal problema)

**3) P(S) - Formula delle probabilità totali:**
\`\`\`
P(S) = P(S|A)×P(A) + P(S|B)×P(B)
     = 0.8 × 0.6 + 0.65 × 0.4
     = 0.48 + 0.26
     = 0.74
\`\`\`

**4) P(A|S) - Formula di Bayes:**
\`\`\`
P(A|S) = P(S|A)×P(A) / P(S)
       = (0.8 × 0.6) / 0.74
       = 0.48 / 0.74
       = 0.6486
\`\`\`

**Concetti chiave:**
- **Probabilità totali**: per calcolare P(S) sommiamo i contributi dei due corsi
- **Bayes**: dato che lo studente ha superato, calcoliamo la probabilità che venga dal corso A
- A ha una proporzione più alta nel totale (60% vs 40%) e un successo più alto (80% vs 65%), quindi ha senso che P(A|S) > 0.5`
        },
        {
            id: 2,
            title: 'Domanda 2: Parcheggi - Analisi Dataset e Test Proporzioni',
            type: 'multiple-mixed',
            rDataset: 'parcheggi.RData',
            text: `Un comune sta studiando l'utilizzo dei posti auto in due zone urbane: una zona centrale e una zona periferica.
L'obiettivo è confrontare la percentuale di posti occupati nelle due zone e valutare il livello complessivo di occupazione.

**Dataset**: parcheggi.RData`,
            parts: [
                {
                    title: 'Analisi Descrittiva',
                    subQuestions: [
                        {
                            id: '2a',
                            question: '1. Lo studio comprende ___ osservazioni, delle quali ___ sono riferite a posti non occupati in zona periferica.',
                            type: 'input',
                            answers: ['200', '114'],
                            hint: 'nrow(parcheggi) e sum(parcheggi$zona=="periferica" & parcheggi$occupato=="no")'
                        },
                        {
                            id: '2b',
                            question: '2. La proporzione complessiva di posti occupati è pari a ___',
                            type: 'input',
                            answer: '0.825',
                            tolerance: 0.01,
                            hint: 'sum(parcheggi$occupato=="si")/nrow(parcheggi)'
                        },
                        {
                            id: '2c',
                            question: '3. Se consideriamo solo la zona periferica, la proporzione di posti occupati è pari a ___',
                            type: 'input',
                            answer: '0.64',
                            tolerance: 0.01,
                            hint: 'sum(parcheggi$occupato[parcheggi$zona=="periferica"]=="si")/sum(parcheggi$zona=="periferica")'
                        }
                    ]
                },
                {
                    title: 'Analisi Quantitativa',
                    description: 'Si vuole dare una risposta quantitativa alla domanda: **più dell\'80% dei posti auto risulta occupato?**',
                    subQuestions: [
                        {
                            id: '2d',
                            question: '4. Per rispondere a questa domanda si utilizza:',
                            type: 'choice',
                            options: [
                                'un test di ipotesi per la proporzione di posti non occupati con H₀: p=0.2 contro H₁: p > 0.2',
                                'un test di ipotesi per la proporzione di posti non occupati con H₀: p=0.8 contro H₁: p>0.8',
                                'un test di ipotesi per la proporzione di posti occupati con H₀: p=0.8 contro H₁: p>0.8',
                                'un test di ipotesi per la proporzione di posti occupati con H₀: p<0.8 contro H₁: p=0.8'
                            ],
                            correctIndex: 2
                        },
                        {
                            id: '2e',
                            question: '5. Il p-value del test è pari a ___',
                            type: 'input',
                            answer: '0.0638',
                            tolerance: 0.01,
                            hint: 'binom.test(sum(parcheggi$occupato=="si"), nrow(parcheggi), p=0.8, alternative="greater")$p.value'
                        },
                        {
                            id: '2f',
                            question: '6. Con livello di significatività pari a 0.05, posso affermare che:',
                            type: 'choice',
                            options: [
                                'devo rifiutare l\'ipotesi nulla',
                                'non posso rifiutare l\'ipotesi nulla'
                            ],
                            correctIndex: 1,
                            explanation: 'p-value (0.0638) > α (0.05), quindi NON rifiuto H₀'
                        },
                        {
                            id: '2g',
                            question: '7. Un intervallo di confidenza al 99% per la proporzione di parcheggi occupati in periferia è dato da [___, ___]',
                            type: 'input',
                            answers: ['0.5368', '0.7355'],
                            tolerance: 0.01,
                            hint: 'binom.test(sum(parcheggi$occupato[parcheggi$zona=="periferica"]=="si"), sum(parcheggi$zona=="periferica"), conf.level=0.99)$conf.int'
                        }
                    ]
                }
            ],
            solution: `**Soluzione:**

**Codice R completo:**

\`\`\`r
# Carica dataset
load("parcheggi.RData")

# 1. Numero osservazioni e posti non occupati in periferia
nrow(parcheggi)  # 200
sum(parcheggi$zona=="periferica" & parcheggi$occupato=="no")  # 114

# Oppure con table:
table(parcheggi)

# 2. Proporzione complessiva posti occupati
sum(parcheggi$occupato=="si")/nrow(parcheggi)  # 0.825

# 3. Proporzione posti occupati in periferia
sum(parcheggi$occupato[parcheggi$zona=="periferica"]=="si") /
  sum(parcheggi$zona=="periferica")  # 0.64

# 4-6. Test: più dell'80% occupati?
# H₀: p = 0.8  vs  H₁: p > 0.8
test <- binom.test(sum(parcheggi$occupato=="si"),
                   nrow(parcheggi),
                   p=0.8,
                   alternative="greater")
test$p.value  # 0.0638

# p-value > 0.05 → NON rifiuto H₀
# Non c'è evidenza statistica che più dell'80% sia occupato

# 7. IC 99% per proporzione occupati in periferia
binom.test(sum(parcheggi$occupato[parcheggi$zona=="periferica"]=="si"),
           sum(parcheggi$zona=="periferica"),
           conf.level=0.99)$conf.int
# [0.5368, 0.7355]
\`\`\`

**Concetti chiave:**
- **Filtraggio dati**: parcheggi$occupato[parcheggi$zona=="periferica"] per considerare solo periferia
- **Test unilaterale**: alternative="greater" perché vogliamo verificare se p > 0.8
- **Interpretazione p-value**: 0.0638 > 0.05 → NON rifiuto H₀ (no evidenza per affermare che >80% occupati)
- **IC più largo con confidenza maggiore**: 99% vs 95%`
        },
        {
            id: 3,
            title: 'Domanda 3: Pronto Soccorso - Esponenziale e Memoryless',
            type: 'multiple-inputs',
            rDataset: null,
            text: `In un pronto soccorso, il tempo T (in minuti) tra due arrivi consecutivi di ambulanze può essere modellato con una variabile aleatoria **esponenziale con media 10 minuti**.

Si considerino i tempi tra gli arrivi delle ambulanze indipendenti.`,
            subQuestions: [
                {
                    id: '3a',
                    question: '1. Con quale probabilità si aspetta più di 15 minuti l\'ambulanza?',
                    answer: '0.2231'
                },
                {
                    id: '3b',
                    question: '2. Con quale probabilità si aspetta più di 15 minuti e meno di 20 minuti l\'ambulanza?',
                    answer: '0.0880'
                },
                {
                    id: '3c',
                    question: '3. Sono trascorsi 15 minuti e nessuna ambulanza è arrivata. Con quale probabilità la prossima ambulanza arriverà entro i successivi 5 minuti?',
                    answer: '0.3935'
                }
            ],
            solution: `**Soluzione:**

**Informazioni:**
- T ~ Esponenziale con media μ = 10 minuti
- rate λ = 1/μ = 1/10 = 0.1

**⚠️ ATTENZIONE:** In R, pexp usa il parametro \`rate\`, NON la media!

**Codice R:**

\`\`\`r
# Media = 10 → rate = 1/10 = 0.1
lambda <- 0.1

# 1) P(T > 15)
1 - pexp(15, rate=0.1)
# oppure: pexp(15, rate=0.1, lower.tail=FALSE)
# = 0.2231

# 2) P(15 < T < 20) = P(T < 20) - P(T < 15)
pexp(20, rate=0.1) - pexp(15, rate=0.1)
# = 0.8647 - 0.7769
# = 0.0880

# 3) P(T ≤ 20 | T > 15) = P(T ≤ 5)  [proprietà memoryless!]
pexp(5, rate=0.1)
# = 0.3935
\`\`\`

**Spiegazione dettagliata:**

**1) P(T > 15):**
- Probabilità che l'ambulanza arrivi DOPO 15 minuti
- P(T > 15) = 1 - P(T ≤ 15) = 1 - pexp(15, 0.1) = 0.2231

**2) P(15 < T < 20):**
- Probabilità che l'ambulanza arrivi tra 15 e 20 minuti
- P(15 < T < 20) = P(T ≤ 20) - P(T ≤ 15)
- = pexp(20, 0.1) - pexp(15, 0.1) = 0.0880

**3) Proprietà Memoryless (fondamentale!):**
- Sono passati 15 minuti senza arrivi
- Vogliamo P(ambulanza arrivi nei prossimi 5 minuti | sono passati 15 minuti)
- P(T ≤ 20 | T > 15) = ?

**Proprietà memoryless dell'esponenziale:**
\`\`\`
P(T > m | T > n) = P(T > m-n)  se m > n

Equivalentemente:
P(T ≤ m | T > n) = P(T ≤ m-n)
\`\`\`

Quindi:
\`\`\`
P(T ≤ 20 | T > 15) = P(T ≤ 5) = pexp(5, 0.1) = 0.3935
\`\`\`

**Interpretazione:** L'esponenziale "dimentica" il passato. Dopo 15 minuti, la probabilità di aspettare altri 5 minuti è la stessa che aspettare 5 minuti dall'inizio!

**Errori comuni:**
- ❌ Usare la media invece del rate: pexp(15, **10**) è SBAGLIATO!
- ❌ Non applicare memoryless al punto 3
- ✅ rate = 1/media = 0.1`
        },
        {
            id: 4,
            title: 'Domanda 4: Teoria - Intervalli di Confidenza per Proporzioni',
            type: 'fill-in-blanks',
            text: `Completa le seguenti affermazioni sugli intervalli di confidenza:

Data la realizzazione di un campione di taglia n di variabili aleatorie di **Bernoulli** di parametro p:

1. L'intervallo di confidenza al 95% per la ___ p **___** l'intervallo di confidenza al 99% per la proporzione p.

2. L'ampiezza dei due intervalli ___ dalla realizzazione del campione.

3. A parità di confidenza e di media campionaria, se la taglia del campione aumenta, l'ampiezza dell'intervallo ___.`,
            blanks: [
                {
                    id: '4a',
                    options: ['proporzione', 'media', 'varianza', 'covarianza'],
                    correctIndex: 0
                },
                {
                    id: '4b',
                    options: ['è contenuto nell\'', 'interseca l\'', 'contiene l\'', 'resta invariata'],
                    correctIndex: 0,
                    explanation: 'IC al 95% ⊂ IC al 99% (più confidenza = intervallo più ampio)'
                },
                {
                    id: '4c',
                    options: ['dipende', 'non dipende'],
                    correctIndex: 0,
                    explanation: 'L\'ampiezza dipende dal numero di successi osservati nel campione'
                },
                {
                    id: '4d',
                    options: ['diminuisce', 'resta invariata', 'cresce'],
                    correctIndex: 0,
                    explanation: 'Più dati = più precisione = intervallo più stretto'
                }
            ],
            solution: `**Soluzione:**

**1. L'IC al 95% è CONTENUTO nell'IC al 99%**

Perché:
- IC al 95% copre l'intervallo centrale che lascia 2.5% per lato
- IC al 99% copre l'intervallo centrale che lascia 0.5% per lato
- IC al 99% deve essere più ampio per avere più confidenza

**Esempio numerico:**
\`\`\`r
# 80 successi su 100 prove
test <- binom.test(80, 100)

# IC 95%
binom.test(80, 100, conf.level=0.95)$conf.int
# [0.707, 0.876]

# IC 99%
binom.test(80, 100, conf.level=0.99)$conf.int
# [0.682, 0.897]

# IC 95% ⊂ IC 99%: [0.707, 0.876] è dentro [0.682, 0.897] ✓
\`\`\`

**2. L'ampiezza DIPENDE dalla realizzazione**

L'ampiezza dell'IC dipende da:
- Numero di successi osservati
- Proporzione campionaria p̂

Esempio:
\`\`\`r
# Caso 1: 50 successi su 100
binom.test(50, 100, conf.level=0.95)$conf.int
# Ampiezza: 0.5 ± 0.098 ≈ 0.196

# Caso 2: 80 successi su 100
binom.test(80, 100, conf.level=0.95)$conf.int
# Ampiezza: 0.8 ± 0.078 ≈ 0.156

# Ampiezze diverse! Dipende dalla realizzazione
\`\`\`

**3. Se n aumenta, l'ampiezza DIMINUISCE**

Più dati → più precisione → intervallo più stretto

\`\`\`r
# n = 50, 40 successi (p=0.8)
binom.test(40, 50, conf.level=0.95)$conf.int
# [0.656, 0.900] → ampiezza ≈ 0.244

# n = 100, 80 successi (p=0.8)
binom.test(80, 100, conf.level=0.95)$conf.int
# [0.707, 0.876] → ampiezza ≈ 0.169

# n = 500, 400 successi (p=0.8)
binom.test(400, 500, conf.level=0.95)$conf.int
# [0.762, 0.835] → ampiezza ≈ 0.073

# Ampiezza diminuisce con n crescente! ✓
\`\`\`

**Formule teoriche (approssimazione normale):**

Ampiezza IC ≈ 2 × z × √(p̂(1-p̂)/n)

Dove:
- z = 1.96 per 95%, z = 2.576 per 99%
- Ampiezza ∝ 1/√n → aumentando n, diminuisce ampiezza

**Concetti chiave:**
- Più confidenza → intervallo più ampio
- Più dati (n grande) → intervallo più stretto
- L'ampiezza varia con la realizzazione del campione (successi osservati)`
        }
    ];

    const handleInputChange = (questionId, subQuestionId, value, index = null) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: {
                ...prev[questionId],
                [subQuestionId]: index !== null ? {
                    ...prev[questionId]?.[subQuestionId],
                    [index]: value
                } : value
            }
        }));
    };

    const checkAnswer = (questionId, subQuestion, subQuestionId) => {
        const userAnswer = answers[questionId]?.[subQuestionId];

        if (subQuestion.type === 'choice') {
            return parseInt(userAnswer) === subQuestion.correctIndex;
        } else if (subQuestion.type === 'input') {
            if (subQuestion.answers) {
                // Multiple inputs
                return subQuestion.answers.every((ans, idx) => {
                    const userVal = parseFloat(userAnswer?.[idx]);
                    const correctVal = parseFloat(ans);
                    const tolerance = subQuestion.tolerance || 0.01;
                    return Math.abs(userVal - correctVal) < tolerance;
                });
            } else {
                // Single input
                const userVal = parseFloat(userAnswer);
                const correctVal = parseFloat(subQuestion.answer);
                const tolerance = subQuestion.tolerance || 0.01;
                return Math.abs(userVal - correctVal) < tolerance;
            }
        }
        return false;
    };

    const checkMultipleInputs = (questionId, subQuestions) => {
        return subQuestions.every(sq => {
            const userAnswer = answers[questionId]?.[sq.id];
            if (!userAnswer) return false;
            const userVal = parseFloat(userAnswer);
            const correctVal = parseFloat(sq.answer);
            return Math.abs(userVal - correctVal) < 0.01;
        });
    };

    const checkFillInBlanks = (questionId, blanks) => {
        return blanks.every(blank => {
            const userAnswer = answers[questionId]?.[blank.id];
            return parseInt(userAnswer) === blank.correctIndex;
        });
    };

    const renderQuestion = (question) => {
        const isCorrect = question.type === 'multiple-inputs'
            ? checkMultipleInputs(question.id, question.subQuestions)
            : question.type === 'fill-in-blanks'
            ? checkFillInBlanks(question.id, question.blanks)
            : false;

        return (
            <div key={question.id} className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{question.title}</h3>
                    {showResults && (
                        <div className="flex items-center gap-2">
                            {isCorrect ? (
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                            ) : (
                                <XCircle className="w-6 h-6 text-red-600" />
                            )}
                        </div>
                    )}
                </div>

                {question.rDataset && (
                    <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded flex items-center gap-2">
                        <Download className="w-5 h-5 text-blue-600" />
                        <div>
                            <span className="font-semibold text-blue-900">Dataset R: </span>
                            <code className="text-blue-700 bg-blue-100 px-2 py-1 rounded">{question.rDataset}</code>
                        </div>
                    </div>
                )}

                <div className="prose max-w-none mb-6">
                    {question.text.split('\n').map((line, idx) => (
                        <p key={idx} className="text-gray-700 mb-2">{line}</p>
                    ))}
                </div>

                {/* Multiple Inputs */}
                {question.type === 'multiple-inputs' && (
                    <div className="space-y-4">
                        {question.subQuestions.map((sq) => (
                            <div key={sq.id} className="border-l-4 border-purple-300 pl-4">
                                <p className="font-medium text-gray-800 mb-2">{sq.question}</p>
                                <input
                                    type="number"
                                    step="0.0001"
                                    className="w-48 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                    value={answers[question.id]?.[sq.id] || ''}
                                    onChange={(e) => handleInputChange(question.id, sq.id, e.target.value)}
                                    disabled={showResults}
                                />
                                {showResults && (
                                    <span className="ml-3 text-sm text-gray-600">
                                        Risposta corretta: <strong>{sq.answer}</strong>
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Multiple Mixed (Parts) */}
                {question.type === 'multiple-mixed' && question.parts && (
                    <div className="space-y-6">
                        {question.parts.map((part, partIdx) => (
                            <div key={partIdx} className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-lg font-bold text-purple-700 mb-3">{part.title}</h4>
                                {part.description && (
                                    <p className="text-gray-700 mb-4 italic">{part.description}</p>
                                )}
                                <div className="space-y-4">
                                    {part.subQuestions.map((sq) => (
                                        <div key={sq.id} className="border-l-4 border-purple-300 pl-4">
                                            <p className="font-medium text-gray-800 mb-2">{sq.question}</p>

                                            {sq.type === 'input' && (
                                                <>
                                                    {sq.answers ? (
                                                        <div className="flex gap-2 items-center flex-wrap">
                                                            {sq.answers.map((_, idx) => (
                                                                <input
                                                                    key={idx}
                                                                    type="number"
                                                                    step="0.0001"
                                                                    className="w-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                                                    value={answers[question.id]?.[sq.id]?.[idx] || ''}
                                                                    onChange={(e) => handleInputChange(question.id, sq.id, e.target.value, idx)}
                                                                    disabled={showResults}
                                                                />
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <input
                                                            type="number"
                                                            step="0.0001"
                                                            className="w-48 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                                            value={answers[question.id]?.[sq.id] || ''}
                                                            onChange={(e) => handleInputChange(question.id, sq.id, e.target.value)}
                                                            disabled={showResults}
                                                        />
                                                    )}
                                                    {sq.hint && (
                                                        <p className="text-xs text-gray-500 mt-1 italic">💡 {sq.hint}</p>
                                                    )}
                                                </>
                                            )}

                                            {sq.type === 'choice' && (
                                                <div className="space-y-2">
                                                    {sq.options.map((option, idx) => (
                                                        <label key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                name={`${question.id}-${sq.id}`}
                                                                value={idx}
                                                                checked={parseInt(answers[question.id]?.[sq.id]) === idx}
                                                                onChange={(e) => handleInputChange(question.id, sq.id, e.target.value)}
                                                                disabled={showResults}
                                                                className="mt-1"
                                                            />
                                                            <span className={`${showResults && idx === sq.correctIndex ? 'font-bold text-green-700' : ''}`}>
                                                                {option}
                                                            </span>
                                                        </label>
                                                    ))}
                                                    {sq.explanation && showResults && (
                                                        <p className="text-sm text-blue-700 bg-blue-50 p-2 rounded mt-2">
                                                            ℹ️ {sq.explanation}
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            {showResults && sq.answer && (
                                                <p className="mt-2 text-sm text-gray-600">
                                                    Risposta corretta: <strong>{sq.answer}</strong>
                                                </p>
                                            )}
                                            {showResults && sq.answers && (
                                                <p className="mt-2 text-sm text-gray-600">
                                                    Risposte corrette: <strong>{sq.answers.join(', ')}</strong>
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Fill in Blanks */}
                {question.type === 'fill-in-blanks' && (
                    <div className="space-y-4">
                        {question.text.split('\n\n').map((paragraph, pIdx) => (
                            <div key={pIdx} className="bg-gray-50 p-4 rounded-lg">
                                {paragraph.split('\n').map((line, lIdx) => {
                                    const blankMatch = line.match(/___/g);
                                    if (!blankMatch) {
                                        return <p key={lIdx} className="text-gray-700 mb-2">{line}</p>;
                                    }

                                    const blank = question.blanks[pIdx - 1];
                                    if (!blank) return <p key={lIdx} className="text-gray-700 mb-2">{line}</p>;

                                    return (
                                        <div key={lIdx} className="mb-4">
                                            <p className="text-gray-700 mb-3">{line.replace(/___/g, '______')}</p>
                                            <select
                                                className="w-full md:w-96 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                                value={answers[question.id]?.[blank.id] ?? ''}
                                                onChange={(e) => handleInputChange(question.id, blank.id, e.target.value)}
                                                disabled={showResults}
                                            >
                                                <option value="">-- Seleziona --</option>
                                                {blank.options.map((option, idx) => (
                                                    <option key={idx} value={idx}>{option}</option>
                                                ))}
                                            </select>
                                            {blank.explanation && showResults && (
                                                <p className="text-sm text-blue-700 mt-2 italic">💡 {blank.explanation}</p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                )}

                {/* Solution */}
                {question.solution && (
                    <div className="mt-6">
                        <button
                            onClick={() => setShowSolution(prev => ({ ...prev, [question.id]: !prev[question.id] }))}
                            className="flex items-center gap-2 text-purple-700 hover:text-purple-900 font-semibold"
                        >
                            <AlertCircle className="w-5 h-5" />
                            {showSolution[question.id] ? 'Nascondi soluzione' : 'Mostra soluzione'}
                        </button>
                        {showSolution[question.id] && (
                            <div className="mt-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                                <div className="prose max-w-none text-sm">
                                    {question.solution.split('\n').map((line, idx) => {
                                        if (line.startsWith('```')) {
                                            const isStart = !line.includes('```r') || line === '```r';
                                            return isStart ? null : <br key={idx} />;
                                        }
                                        if (line.trim().startsWith('#') || line.includes('pexp') || line.includes('binom.test')) {
                                            return <code key={idx} className="block bg-gray-900 text-gray-100 p-2 rounded my-1">{line}</code>;
                                        }
                                        return <p key={idx} className="text-gray-700 mb-2 whitespace-pre-wrap">{line}</p>;
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-lg shadow-lg mb-8">
                <h1 className="text-3xl font-bold mb-2">Esame 6 Febbraio 2026 - Turno 2 (6 CFU)</h1>
                <p className="text-purple-100">4 domande da esame reale</p>
                <div className="mt-4 text-sm text-purple-100">
                    <p>📅 Data: 6 febbraio 2026, ore 12:56-13:35</p>
                    <p>⏱️ Durata: 38 minuti</p>
                    <p>📚 Argomenti: Probabilità Totali/Bayes, Test Proporzioni, Esponenziale Memoryless, Teoria IC</p>
                </div>
            </div>

            {questions.map(renderQuestion)}

            <div className="flex gap-4 justify-center mt-8">
                <button
                    onClick={() => setShowResults(!showResults)}
                    className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold shadow-lg transition-colors"
                >
                    {showResults ? 'Nascondi Risultati' : 'Mostra Risultati'}
                </button>
            </div>
        </div>
    );
};

export default QuizFebbraio2026Turno2;