import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, RotateCcw, BookOpen } from 'lucide-react';

const QuizLuglio2025 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      category: "Probabilità Classica - Esame 11 Lug 2025",
      difficulty: "⭐⭐⭐",
      question: "Si lancia 5 volte una moneta non truccata. Sia A='i primi 3 risultati sono uguali' e A'='gli ultimi 3 risultati sono uguali'. Calcola P(A ∪ A'), cioè la probabilità che i primi 3 OPPURE gli ultimi 3 siano uguali.",
      options: [
        "0.25",
        "0.4375",
        "0.50",
        "0.3125"
      ],
      correct: 1,
      explanation: `✅ SOLUZIONE: 0.4375

DEFINIZIONI:
A = "primi 3 uguali" = (CCC··) ∪ (TTT··)
A' = "ultimi 3 uguali" = (··CCC) ∪ (··TTT)
B = A ∪ A'

CALCOLO P(A):
P(CCC··) = (1/2)³ = 1/8
P(TTT··) = (1/2)³ = 1/8
P(A) = 1/8 + 1/8 = 1/4 = 0.25

CALCOLO P(A'):
Per simmetria, P(A') = P(A) = 0.25

CALCOLO P(A ∩ A'):
A ∩ A' = "tutti 5 uguali" = (CCCCC) ∪ (TTTTT)
P(A ∩ A') = 2 × (1/2)⁵ = 2/32 = 1/16 = 0.0625

FORMULA UNIONE:
P(B) = P(A ∪ A') = P(A) + P(A') - P(A ∩ A')
P(B) = 0.25 + 0.25 - 0.0625 = 0.4375

🎯 VERIFICA:
Sequenze che soddisfano B:
- CCCCC, CCCCT, CCCTT (primi 3 C)
- TTTTT, TTTCC, TTTC (primi 3 T)
- CTCCC, TCCCC, TTCCC, ecc. (ultimi 3 uguali)

Totale: 14 sequenze su 32 = 14/32 = 7/16 = 0.4375 ✓

📌 CONCETTO CHIAVE:
Non dimenticare di sottrarre l'intersezione!
Se no conti due volte le sequenze in A ∩ A'`
    },
    {
      id: 2,
      category: "Esponenziale - Esame 11 Lug 2025",
      difficulty: "⭐⭐⭐",
      question: "X ~ Exp(rate=2). Calcola P(X > 3).",
      options: [
        "pexp(3, 2)",
        "1 - pexp(3, 2)",
        "pexp(2, 3)",
        "1 - pexp(2, 3)"
      ],
      correct: 1,
      explanation: `✅ SOLUZIONE CORRETTA: opzione 2

P(X > 3) = 1 - P(X ≤ 3) = 1 - pexp(3, 2)

CODICE R:
> 1 - pexp(3, 2)
[1] 0.002478752

📌 DISTRIBUZIONE ESPONENZIALE:

PARAMETRIZZAZIONE IN R:
- rate = λ (parametro di intensità)
- Se ti danno la media μ: rate = 1/μ

FORMULE:
- E[X] = 1/λ = 1/rate
- Var(X) = 1/λ² = 1/rate²
- P(X > t) = e^(-λt) = 1 - pexp(t, rate)
- P(X ≤ t) = 1 - e^(-λt) = pexp(t, rate)

ESEMPIO ESERCIZIO:
Se X ~ Exp(rate=2):
- Media: E[X] = 1/2 = 0.5
- Var: Var(X) = 1/4 = 0.25
- P(X > 3) = 1 - pexp(3, 2) = 0.0025

⚠️ ATTENZIONE:
pexp() calcola P(X ≤ t), NON P(X > t)!

🔑 PROPRIETÀ MEMORYLESS:
P(X > s+t | X > s) = P(X > t)
"Il tempo già trascorso non influenza il futuro"`
    },
    {
      id: 3,
      category: "Esponenziale Condizionata - Esame 11 Lug 2025",
      difficulty: "⭐⭐⭐⭐",
      question: "X ~ Exp(rate=2). Calcola P(X < 7 | X > 6), la probabilità che X sia minore di 7 sapendo che è maggiore di 6.",
      options: [
        "pexp(7, 2) - pexp(6, 2)",
        "(pexp(7, 2) - pexp(6, 2)) / (1 - pexp(6, 2))",
        "1 - pexp(1, 2)",
        "pexp(1, 2)"
      ],
      correct: 1,
      explanation: `✅ SOLUZIONE CORRETTA: opzione 2

FORMULA PROBABILITÀ CONDIZIONATA:
P(A|B) = P(A ∩ B) / P(B)

PASSO PER PASSO:

P(X < 7 | X > 6) = P(6 < X < 7) / P(X > 6)

Numeratore: P(6 < X < 7)
= P(X < 7) - P(X ≤ 6)
= pexp(7, 2) - pexp(6, 2)

Denominatore: P(X > 6)
= 1 - P(X ≤ 6)
= 1 - pexp(6, 2)

Risultato:
(pexp(7, 2) - pexp(6, 2)) / (1 - pexp(6, 2))

CODICE R:
> (pexp(7, 2) - pexp(6, 2)) / (1 - pexp(6, 2))
[1] 0.8646647

🔑 NOTA IMPORTANTE:
La proprietà memoryless NON è applicabile qui!

Proprietà memoryless dice:
P(X > s+t | X > s) = P(X > t)

Ma qui abbiamo:
P(X < 7 | X > 6) = P(X < 6+1 | X > 6) ≠ P(X < 1)

Perché? Il condizionamento è su "X > 6" ma la
probabilità è su "X < 7", non "X > 7"!

📊 VERIFICA CON MEMORYLESS:
P(X > 7 | X > 6) = P(X > 1) = 1 - pexp(1, 2)
> 1 - pexp(1, 2)
[1] 0.1353353

Quindi:
P(X < 7 | X > 6) = 1 - P(X > 7 | X > 6)
                 = 1 - 0.1353 = 0.8647 ✓`
    },
    {
      id: 4,
      category: "Test Proporzione - Esame 11 Lug 2025",
      difficulty: "⭐⭐⭐",
      question: "In un dataset di 324 giocatori di basket, 65 sono Playmaker (proporzione 0.2006). Testi H_0: p=0.25 vs H_1: p≠0.25. Ottieni p-value=0.0401. Con α=0.01, quale conclusione?",
      options: [
        "Rifiuto H0, meno del 25% sono Playmaker",
        "Non posso rifiutare H0, il 25% dei giocatori è nel ruolo Playmaker",
        "Rifiuto H0, il 25% dei giocatori è nel ruolo Playmaker",
        "Non posso rifiutare H0, più del 25% sono Playmaker"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: opzione 2

ANALISI DEL TEST:

IPOTESI:
H_0: p = 0.25
H_1: p ≠ 0.25 (test two-sided!)

DATI:
- n = 324 giocatori
- x = 65 Playmaker
- p̂ = 65/324 = 0.2006

CODICE R:
load("basket.RData")

# Verifica dati
table(basket$"Ruolo in campo")

# Test
test <- binom.test(65, 324, p=0.25,
                   alternative="two.sided")
test$p.value  # 0.0401

DECISIONE:
p-value (0.0401) > α (0.01)
→ NON POSSO RIFIUTARE H0

INTERPRETAZIONE CORRETTA:
"Il 25% dei giocatori è nel ruolo Playmaker"

📌 NOTA IMPORTANTISSIMA:
Il p-value (0.0401) sarebbe significativo con α=0.05,
ma NON con α=0.01 (più stringente)!

Livello di significatività più basso → soglia più alta
→ più difficile rifiutare H0

CONFRONTO:
• Con α=0.05: 0.0401 < 0.05 → Rifiuto H0
• Con α=0.01: 0.0401 > 0.01 → Non rifiuto H0

⚠️ FRASEOLOGIA:
✅ "Non posso rifiutare H0"
✅ "Non c'è sufficiente evidenza contro H0"
✅ "Il 25% dei giocatori è nel ruolo Playmaker"
(perché non rifiutiamo che p=0.25)

❌ "Accetto H0" → MAI dire "accetto"!
❌ "p = 0.25 è vero" → non possiamo provarlo!`
    },
    {
      id: 5,
      category: "Teoria - Media Campionaria",
      difficulty: "⭐⭐",
      question: "Completa: 'La media campionaria è ___ che viene usata per ___ la media ___. La media campionaria assume valori ___ su campioni diversi estratti dalla stessa variabile aleatoria.'",
      options: [
        "un parametro / calcolare / delle osservazioni / uguali",
        "una statistica / stimare / della popolazione / diversi",
        "una costante / trasformare / della popolazione / uguali",
        "una statistica / calcolare / delle osservazioni / uguali"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: opzione 2

"La media campionaria è UNA STATISTICA che viene
usata per STIMARE la media DELLA POPOLAZIONE.
La media campionaria assume valori DIVERSI su
campioni diversi estratti dalla stessa variabile
aleatoria."

📚 SPIEGAZIONE DETTAGLIATA:

1. STATISTICA:
   - Funzione dei dati del campione
   - È una VARIABILE ALEATORIA
   - Varia da campione a campione
   - Esempi: X̄, S², mediana campionaria

2. STIMARE (non "calcolare"):
   - Obiettivo: inferire parametri della popolazione
   - Usiamo dati campionari per fare inferenza
   - Base della statistica inferenziale

3. POPOLAZIONE:
   - L'intero insieme di riferimento
   - Ha parametri fissi (μ, σ², ecc.)
   - Spesso non accessibile interamente

4. VALORI DIVERSI:
   - Ogni campione → diverso X̄
   - X̄ ha una distribuzione (distribuzione campionaria)
   - Per il TLC: X̄ ~ N(μ, σ²/n) se n grande

🎯 ESEMPIO PRATICO:

Popolazione: Altezze di tutti gli italiani (μ = 170 cm)

Campione 1 (n=100): X̄₁ = 169.5 cm
Campione 2 (n=100): X̄₂ = 170.8 cm
Campione 3 (n=100): X̄₃ = 169.2 cm

Valori DIVERSI, ma tutti stimano μ = 170!

📊 PROPRIETÀ IMPORTANTE:
E[X̄] = μ (stimatore non distorto)
Var(X̄) = σ²/n (diminuisce con n)

⚠️ DIFFERENZA CHIAVE:
- Parametro: valore FISSO della popolazione
- Statistica: valore VARIABILE del campione`
    }
  ];

  const handleAnswer = (questionIndex, optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex
    });
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) {
        correct++;
      }
    });
    setScore(correct);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const currentQ = questions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;
  const isCorrect = selectedAnswers[currentQuestion] === currentQ.correct;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-8 rounded-xl mb-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <BookOpen className="w-10 h-10" />
          <div>
            <h1 className="text-3xl font-bold">Esame 11 Luglio 2025</h1>
            <p className="text-teal-100 mt-1">
              Quiz completo basato sull'esame reale
            </p>
          </div>
        </div>

        {!showResults && (
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Domanda {currentQuestion + 1} di {questions.length}</span>
            </div>
            <div>
              Risposte: {Object.keys(selectedAnswers).length}/{questions.length}
            </div>
          </div>
        )}
      </div>

      {!showResults ? (
        <>
          {/* Question Navigation */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {questions.map((_, index) => {
              const answered = selectedAnswers[index] !== undefined;
              return (
                <button
                  key={index}
                  onClick={() => goToQuestion(index)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    currentQuestion === index
                      ? 'bg-teal-600 text-white ring-4 ring-teal-200'
                      : answered
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-6">
            <div className="flex justify-between items-start mb-6 flex-wrap gap-3">
              <span className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">
                {currentQ.category}
              </span>
              <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                Difficoltà: {currentQ.difficulty}
              </span>
            </div>

            <h2 className="text-2xl font-semibold mb-8 leading-relaxed text-gray-800">
              {currentQ.question}
            </h2>

            <div className="space-y-4">
              {currentQ.options.map((option, index) => {
                const selected = selectedAnswers[currentQuestion] === index;
                const showCorrect = isAnswered && index === currentQ.correct;
                const showWrong = isAnswered && selected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(currentQuestion, index)}
                    disabled={isAnswered}
                    className={`w-full p-5 text-left rounded-xl border-3 transition ${
                      showCorrect
                        ? 'border-green-500 bg-green-50'
                        : showWrong
                        ? 'border-red-500 bg-red-50'
                        : selected
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 bg-white hover:border-teal-300 hover:bg-gray-50'
                    } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        showCorrect
                          ? 'bg-green-500 text-white'
                          : showWrong
                          ? 'bg-red-500 text-white'
                          : selected
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1 text-base">{option}</span>
                      {showCorrect && <CheckCircle className="w-6 h-6 text-green-600" />}
                      {showWrong && <XCircle className="w-6 h-6 text-red-600" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className={`mt-8 p-6 rounded-xl border-l-4 ${
                isCorrect
                  ? 'bg-green-50 border-green-500'
                  : 'bg-orange-50 border-orange-500'
              }`}>
                <h3 className={`text-xl font-bold mb-4 flex items-center gap-3 ${
                  isCorrect ? 'text-green-800' : 'text-orange-800'
                }`}>
                  {isCorrect ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                  {isCorrect ? 'Corretto!' : 'Non corretto'}
                </h3>
                <div className="whitespace-pre-line text-base leading-relaxed text-gray-700 font-mono text-sm">
                  {currentQ.explanation}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between gap-4">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                currentQuestion === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}
            >
              ← Precedente
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={calculateScore}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition shadow-lg"
              >
                Mostra Risultati
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition"
              >
                Successiva →
              </button>
            )}
          </div>
        </>
      ) : (
        /* Results */
        <div className="bg-white rounded-xl p-10 shadow-lg text-center">
          <div className={`w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl font-bold text-white shadow-xl ${
            score >= 4 ? 'bg-green-500' : score >= 3 ? 'bg-orange-500' : 'bg-red-500'
          }`}>
            {score}/{questions.length}
          </div>

          <h2 className="text-4xl font-bold mb-4">
            {score >= 4 ? '🎉 Ottimo lavoro!' :
             score >= 3 ? '👍 Buon risultato!' :
             '📚 Continua a studiare!'}
          </h2>

          <p className="text-xl text-gray-600 mb-8">
            Hai risposto correttamente a {score} domande su {questions.length}
          </p>

          <div className="bg-gray-50 p-6 rounded-xl mb-8 text-left">
            <h3 className="text-xl font-bold mb-4">📊 Dettaglio Risposte:</h3>
            {questions.map((q, index) => {
              const correct = selectedAnswers[index] === q.correct;
              return (
                <div
                  key={index}
                  className={`p-4 bg-white rounded-lg mb-3 border-l-4 ${
                    correct ? 'border-green-500' : 'border-red-500'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      Domanda {index + 1}: {q.category}
                    </span>
                    {correct ?
                      <CheckCircle className="w-5 h-5 text-green-600" /> :
                      <XCircle className="w-5 h-5 text-red-600" />
                    }
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={resetQuiz}
            className="px-8 py-4 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition flex items-center gap-3 mx-auto shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Ricomincia Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizLuglio2025;
