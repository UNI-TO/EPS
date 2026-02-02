import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, BookOpen, AlertCircle } from 'lucide-react';

const QuizGennaio2025Turno4 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      category: "Analisi Descrittiva + Test t Appaiato",
      difficulty: "⭐⭐⭐",
      question: "Dataset bosco.RData: 100 parcelle con densità alberi PRIMA e DOPO diradamento.\n\nDomanda: Quante misurazioni ci sono nello studio?",
      options: [
        "99",
        "100",
        "98",
        "101"
      ],
      correct: 0,
      subQuestions: [
        {
          question: "Densità media DOPO il trattamento?",
          answer: "376.3232",
          code: "mean(dati$DOPO)"
        },
        {
          question: "Deviazione standard DOPO?",
          answer: "155.5385",
          code: "sd(dati$DOPO)"
        },
        {
          question: "Quante parcelle hanno densità DOPO > 500?",
          answer: "27",
          code: "sum(dati$DOPO > 500)"
        },
        {
          question: "90° percentile della densità DOPO (il 10% superiore a...)?",
          answer: "574.6",
          code: "quantile(dati$DOPO, 0.9)"
        }
      ],
      explanation: `✅ SOLUZIONE COMPLETA:

📊 ANALISI DESCRITTIVA:
1. nrow(dati) = 99 misurazioni
2. mean(dati$DOPO) = 376.3232
3. sd(dati$DOPO) = 155.5385
4. sum(dati$DOPO > 500) = 27 parcelle
5. quantile(dati$DOPO, 0.9) = 574.6

📈 GRAFICO COMPATIBILE: B
Istogramma della densità PRIMA (non DOPO!)
Codice: hist(dati$PRIMA, xlab="DENSITÀ (PRIMA)", main="B", breaks=15)

🧪 TEST t APPAIATO:
Domanda: "Il trattamento funziona? La densità è diminuita?"

H₀: μ_PRIMA = μ_DOPO
H₁: μ_PRIMA > μ_DOPO (densità diminuita)

✅ Test corretto:
t.test(dati$PRIMA, dati$DOPO, alternative="greater", paired=TRUE)

⚠️ PERCHÉ paired=TRUE?
- Stesse 99 parcelle misurate 2 volte (PRIMA e DOPO)
- Campioni APPAIATI (NON indipendenti)

⚠️ PERCHÉ alternative="greater"?
- Vogliamo testare se PRIMA > DOPO
- Ovvero se la densità è DIMINUITA

📌 RISULTATI:
- p-value ≈ 0 (< 0.01)
- Decisione: RIFIUTO H₀
- Conclusione: "C'è sufficiente evidenza per affermare che la densità media è diminuita dopo il trattamento"

🎯 PATTERN RICORRENTE:
Studio "prima-dopo" → SEMPRE paired=TRUE`,
      realExam: "29 Gennaio 2025 - Turno 4, Domanda 1"
    },
    {
      id: 2,
      category: "Test t Appaiato - Ipotesi",
      difficulty: "⭐⭐⭐",
      question: "Per testare se il trattamento funziona (densità diminuita), quale test usi?",
      options: [
        "Test per differenza medie, campioni indipendenti, H₀: μ_PRIMA = μ_DOPO",
        "Test per media differenze, campioni appaiati, H₁: μ_PRIMA > μ_DOPO",
        "Test per media differenze, campioni appaiati, H₀: μ_PRIMA > μ_DOPO",
        "Test per differenza medie, campioni indipendenti, H₁: μ_PRIMA > μ_DOPO"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: B

"Test di ipotesi per la media delle differenze, per campioni APPAIATI,
con ipotesi alternativa H₁: μ_PRIMA > μ_DOPO"

📚 ANALISI SCELTA:

1️⃣ CAMPIONI APPAIATI (paired=TRUE):
- Stesse parcelle misurate PRIMA e DOPO
- NON sono due gruppi indipendenti!
- Lavoriamo con le DIFFERENZE: D = PRIMA - DOPO

2️⃣ IPOTESI ALTERNATIVA H₁ (alternative="greater"):
- H₀: μ_PRIMA = μ_DOPO (oppure μ_D = 0)
- H₁: μ_PRIMA > μ_DOPO (oppure μ_D > 0)
- Vogliamo dimostrare che PRIMA > DOPO (densità diminuita)

❌ ERRORI COMUNI:

Opzione A: campioni INDIPENDENTI → SBAGLIATO
- Le parcelle sono le STESSE, non gruppi diversi

Opzione C: H₀ con disuguaglianza → SBAGLIATO
- H₀ contiene SEMPRE uguaglianza (=, ≤, ≥)
- La disuguaglianza stretta (>) va in H₁

Opzione D: indipendenti + H₁ → SBAGLIATO
- Anche se H₁ è giusto, i campioni NON sono indipendenti

💡 CODICE R:
t.test(dati$PRIMA, dati$DOPO,
       paired = TRUE,        # APPAIATI!
       alternative = "greater")  # PRIMA > DOPO

🎯 REGOLA MNEMONICO:
"Stesso gruppo misurato 2 volte" → paired=TRUE
"Due gruppi diversi" → paired=FALSE`,
      realExam: "29 Gennaio 2025 - Turno 4, Domanda 1.5"
    },
    {
      id: 3,
      category: "Test t - Interpretazione P-value",
      difficulty: "⭐⭐",
      question: "Il test t appaiato restituisce p-value ≈ 0. Con α=0.01, cosa puoi affermare?",
      options: [
        "Devo rifiutare l'ipotesi nulla",
        "Non posso rifiutare l'ipotesi nulla",
        "Accetto l'ipotesi alternativa",
        "Non c'è evidenza sufficiente"
      ],
      correct: 0,
      subQuestion: {
        question: "Quale affermazione è corretta sulla densità?",
        options: [
          "Nessuna affermazione è corretta",
          "Non c'è sufficiente evidenza che la densità è diminuita",
          "C'è sufficiente evidenza per affermare che la densità media è diminuita",
          "Non c'è evidenza che il trattamento è efficace"
        ],
        correct: 2
      },
      explanation: `✅ SOLUZIONE:

PARTE 1: DECISIONE STATISTICA
p-value ≈ 0 < α = 0.01
→ RIFIUTO H₀

📌 REGOLA:
- p < α → Rifiuto H₀
- p ≥ α → Non rifiuto H₀

PARTE 2: INTERPRETAZIONE NEL CONTESTO
Risposta corretta: "C'è sufficiente evidenza per affermare che la densità media è diminuita dopo il trattamento"

🔍 SPIEGAZIONE DETTAGLIATA:

1. Abbiamo testato:
   H₀: μ_PRIMA = μ_DOPO
   H₁: μ_PRIMA > μ_DOPO

2. p ≈ 0 < 0.01 → Rifiuto H₀

3. Rifiutando H₀, supportiamo H₁:
   → μ_PRIMA > μ_DOPO
   → La densità PRIMA era maggiore
   → La densità è DIMINUITA dopo il trattamento
   → Il trattamento è EFFICACE

⚠️ ERRORI COMUNI:

❌ "Accetto H₁" → MAI dire "accetto"!
✅ Dire: "Rifiuto H₀" o "Supporto H₁"

❌ "Non c'è evidenza" → SBAGLIATO
✅ p ≈ 0 significa FORTE evidenza!

❌ "Il trattamento non è efficace" → OPPOSTO
✅ Il trattamento È efficace (densità diminuita)

💬 FRASEOLOGIA CORRETTA:
- p < α: "Sufficiente evidenza per rifiutare H₀"
- p ≥ α: "Non sufficiente evidenza per rifiutare H₀"

🎯 NEL CONTESTO:
"C'è sufficiente evidenza statistica per affermare che
l'intervento di diradamento ha ridotto significativamente
la densità degli alberi nelle parcelle boschive"`,
      realExam: "29 Gennaio 2025 - Turno 4, Domande 1.6-1.8"
    },
    {
      id: 4,
      category: "Probabilità Classica - Eventi",
      difficulty: "⭐⭐",
      question: "Si lancia una moneta equa 4 volte. Sia A='i primi 3 risultati sono uguali', B='gli ultimi 2 risultati sono uguali'.\n\nCalcola P(A):",
      options: [
        "0.25",
        "0.50",
        "0.125",
        "0.375"
      ],
      correct: 0,
      subQuestions: [
        {
          question: "P(B) = ?",
          answer: "0.5",
          explanation: "B = ultimi 2 uguali: (··TT) o (··CC)\nP(B) = 2 × (1/2)² = 2 × 1/4 = 0.5"
        },
        {
          question: "P(A ∩ B) = ?",
          answer: "0.125",
          explanation: "A ∩ B = primi 3 E ultimi 2 uguali = tutti 4 uguali\n(TTTT) o (CCCC)\nP(A ∩ B) = 2 × (1/2)⁴ = 2/16 = 0.125"
        }
      ],
      explanation: `✅ SOLUZIONE COMPLETA:

EVENTO A: "Primi 3 risultati uguali"
A = (TTT·) ∪ (CCC·)

Dove · può essere T o C (2 possibilità)

P(TTT·) = (1/2)³ × 1 = 1/8
P(CCC·) = (1/2)³ × 1 = 1/8

P(A) = 1/8 + 1/8 = 2/8 = 1/4 = 0.25

ALTERNATIVA:
P(A) = 2 × (1/2)³ = 2/8 = 0.25

---

EVENTO B: "Ultimi 2 risultati uguali"
B = (··TT) ∪ (··CC)

P(··TT) = 1 × 1 × (1/2)² = 1/4
P(··CC) = 1 × 1 × (1/2)² = 1/4

P(B) = 1/4 + 1/4 = 1/2 = 0.5

ALTERNATIVA:
P(B) = 2 × (1/2)² = 0.5

---

INTERSEZIONE A ∩ B:
"Primi 3 uguali" E "Ultimi 2 uguali"
→ Devono essere TUTTI 4 uguali!

A ∩ B = (TTTT) ∪ (CCCC)

P(TTTT) = (1/2)⁴ = 1/16
P(CCCC) = (1/2)⁴ = 1/16

P(A ∩ B) = 1/16 + 1/16 = 2/16 = 1/8 = 0.125

ALTERNATIVA:
P(A ∩ B) = 2 × (1/2)⁴ = 0.125

---

📌 VERIFICA CON FORMULA UNIONE:
P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
         = 0.25 + 0.5 - 0.125
         = 0.625

🎯 PATTERN:
- n risultati uguali: P = 2 × (1/2)ⁿ
- Fattore 2: per T o C
- (1/2)ⁿ: probabilità specifica sequenza`,
      realExam: "29 Gennaio 2025 - Turno 4, Domanda 2"
    },
    {
      id: 5,
      category: "Teoria - Distribuzione t di Student",
      difficulty: "⭐⭐",
      question: "Completa le frasi sulla distribuzione t di Student:\n\n\"La v.a. t di Student è una v.a. _____, simmetrica. L'immagine è _____. La massa di probabilità sulle code è _____ di quella di una Normale.\"",
      options: [
        "discreta, R, minore",
        "continua, R, maggiore",
        "continua, R+, maggiore",
        "mista, R, uguale"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: B

"La v.a. t di Student è una v.a. CONTINUA, simmetrica.
L'immagine è R. La massa di probabilità sulle code è
MAGGIORE di quella di una Normale."

📚 SPIEGAZIONE DETTAGLIATA:

1️⃣ CONTINUA (non discreta):
- t di Student è una distribuzione CONTINUA
- Ha funzione di densità f(x), NON funzione di massa
- Può assumere qualsiasi valore reale

2️⃣ SIMMETRICA:
- La distribuzione è simmetrica rispetto a 0
- f(-x) = f(x)
- Mediana = Moda = Media = 0

3️⃣ IMMAGINE = R (tutti i reali):
- t ∈ ℝ = (-∞, +∞)
- NON è limitata a R+ (reali positivi)
- Può essere negativa o positiva

4️⃣ CODE PIÙ PESANTI (fat tails):
- P(|t| > k) > P(|Z| > k) per Z ~ N(0,1)
- Più massa di probabilità sulle code
- Più "estremi" rispetto alla Normale
- All'aumentare dei gradi di libertà, si avvicina a N(0,1)

🔬 CONFRONTO CON NORMALE:

| Caratteristica | t di Student | Normale |
|----------------|--------------|---------|
| Tipo | Continua | Continua |
| Simmetria | ✓ Sì | ✓ Sì |
| Immagine | ℝ | ℝ |
| Code | PESANTI | Leggere |
| Parametri | df (gradi lib.) | μ, σ² |

📈 VISUALIZZAZIONE:
- Centro: simile a N(0,1)
- Code: t ha code PIÙ ALTE
- df → ∞: t converge a N(0,1)

🎯 QUANDO SI USA:
- Inferenza su media con σ² incognita
- Campioni piccoli (n < 30)
- t-test, intervalli di confidenza
- Statistica: T = (X̄ - μ)/(S/√n) ~ t(n-1)

💡 RICORDA:
"t di Student ha code GRASSE → più valori estremi"`,
      realExam: "29 Gennaio 2025 - Turno 4, Domanda 3"
    },
    {
      id: 6,
      category: "Distribuzione Esponenziale",
      difficulty: "⭐⭐⭐",
      question: "X ~ Esponenziale(λ=1). Calcola P(X < 1.5):",
      options: [
        "0.7769",
        "0.2231",
        "0.5000",
        "0.6321"
      ],
      correct: 0,
      subQuestions: [
        {
          question: "P(X > 3) = ?",
          answer: "0.0498",
          code: "1 - pexp(3, 1)"
        },
        {
          question: "P(X > 3 | X < 6) = ? (probabilità condizionata)",
          answer: "0.0474",
          code: "(pexp(6,1) - pexp(3,1)) / pexp(6,1)"
        }
      ],
      explanation: `✅ SOLUZIONE COMPLETA:

DATO: X ~ Exp(λ = 1)
Quindi: rate = 1, media μ = 1/λ = 1

---

DOMANDA 1: P(X < 1.5)

Codice R:
pexp(1.5, 1) = 0.7769

📌 NOTA:
- pexp(x, rate) calcola P(X ≤ x) per default
- Equivalente a P(X < x) (distribuzione continua)

FORMULA:
F(x) = P(X ≤ x) = 1 - e^(-λx)
F(1.5) = 1 - e^(-1×1.5) = 1 - e^(-1.5) = 0.7769

---

DOMANDA 2: P(X > 3)

Codice R:
1 - pexp(3, 1) = 0.0498

OPPURE:
pexp(3, 1, lower.tail=FALSE) = 0.0498

FORMULA:
P(X > x) = e^(-λx)
P(X > 3) = e^(-1×3) = e^(-3) = 0.0498

---

DOMANDA 3: P(X > 3 | X < 6)
"Probabilità che X > 3 SAPENDO che X < 6"

FORMULA PROBABILITÀ CONDIZIONATA:
P(A|B) = P(A ∩ B) / P(B)

P(X > 3 | X < 6) = P(3 < X < 6) / P(X < 6)

Numeratore: P(3 < X < 6)
= P(X < 6) - P(X < 3)
= pexp(6,1) - pexp(3,1)

Denominatore: P(X < 6)
= pexp(6,1)

Codice R:
(pexp(6,1) - pexp(3,1)) / pexp(6,1) = 0.0474

VERIFICA VALORI:
pexp(6,1) = 0.9975
pexp(3,1) = 0.9502
(0.9975 - 0.9502) / 0.9975 = 0.0473/0.9975 = 0.0474 ✓

---

⚠️ ATTENZIONE:
NON si può usare proprietà memoryless qui!

Memoryless vale SOLO per:
P(X > s+t | X > s) = P(X > t)

Ma qui abbiamo:
P(X > 3 | X < 6) ≠ P(X > 3)

La condizione è "X < 6", NON "X > qualcosa"

---

🎯 COMANDI R UTILI:

# P(X ≤ x)
pexp(x, rate)

# P(X > x)
1 - pexp(x, rate)
# oppure
pexp(x, rate, lower.tail=FALSE)

# P(a < X < b)
pexp(b, rate) - pexp(a, rate)

# P(X > a | X < b) dove a < b
(pexp(b, rate) - pexp(a, rate)) / pexp(b, rate)`,
      realExam: "29 Gennaio 2025 - Turno 4, Domanda 4"
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
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-xl mb-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <BookOpen className="w-10 h-10" />
          <div>
            <h1 className="text-3xl font-bold">Esame 29 Gennaio 2025 - Turno 4</h1>
            <p className="text-indigo-100 mt-1">
              Analisi Descrittiva, Test t Appaiato, Probabilità, Teoria, Esponenziale
            </p>
          </div>
        </div>

        {!showResults && (
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
            <div className="flex justify-between items-center text-sm">
              <span>Domanda {currentQuestion + 1} di {questions.length}</span>
              <span>Risposte: {Object.keys(selectedAnswers).length}/{questions.length}</span>
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
                      ? 'bg-indigo-600 text-white ring-4 ring-indigo-200'
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
              <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                {currentQ.category}
              </span>
              <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                {currentQ.difficulty}
              </span>
            </div>

            <h2 className="text-2xl font-semibold mb-8 leading-relaxed text-gray-800 whitespace-pre-line">
              {currentQ.question}
            </h2>

            {/* Sub-questions info */}
            {currentQ.subQuestions && (
              <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <p className="font-medium text-blue-900 mb-2">📋 Domande aggiuntive correlate:</p>
                <ul className="space-y-1 text-sm text-blue-800">
                  {currentQ.subQuestions.map((sq, idx) => (
                    <li key={idx}>• {sq.question} → {sq.answer}</li>
                  ))}
                </ul>
              </div>
            )}

            {currentQ.subQuestion && (
              <div className="mb-6 p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
                <p className="font-medium text-purple-900 mb-3">{currentQ.subQuestion.question}</p>
                <ul className="space-y-2 text-sm">
                  {currentQ.subQuestion.options.map((opt, idx) => (
                    <li key={idx} className={idx === currentQ.subQuestion.correct ? 'text-green-700 font-semibold' : 'text-purple-800'}>
                      {String.fromCharCode(65 + idx)}) {opt}
                    </li>
                  ))}
                </ul>
              </div>
            )}

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
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-gray-50'
                    } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        showCorrect
                          ? 'bg-green-500 text-white'
                          : showWrong
                          ? 'bg-red-500 text-white'
                          : selected
                          ? 'bg-indigo-600 text-white'
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
                <div className="whitespace-pre-line text-base leading-relaxed text-gray-700">
                  {currentQ.explanation}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <p className="text-sm text-gray-600 italic">
                    📚 Fonte: {currentQ.realExam}
                  </p>
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
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
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
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
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
            score >= 5 ? 'bg-green-500' : score >= 4 ? 'bg-orange-500' : 'bg-red-500'
          }`}>
            {score}/{questions.length}
          </div>

          <h2 className="text-4xl font-bold mb-4">
            {score >= 5 ? '🎉 Ottimo!' : score >= 4 ? '👍 Bene!' : '📚 Continua così!'}
          </h2>

          <p className="text-xl text-gray-600 mb-8">
            Hai risposto correttamente a {score} domande su {questions.length}
          </p>

          <div className="bg-gray-50 p-6 rounded-xl mb-8 text-left">
            <h3 className="text-xl font-bold mb-4">📊 Dettaglio:</h3>
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
            className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center gap-3 mx-auto shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Ricomincia Quiz
          </button>
        </div>
      )}

      {/* Tips */}
      <div className="mt-8 bg-amber-50 p-6 rounded-xl border-l-4 border-amber-500">
        <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
          <AlertCircle className="w-6 h-6" />
          💡 Punti Chiave Esame Turno 4
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Test t paired:</strong> Usa paired=TRUE quando le stesse unità sono misurate 2 volte (PRIMA/DOPO)</li>
          <li><strong>Alternative "greater":</strong> Per testare se PRIMA > DOPO (diminuzione)</li>
          <li><strong>Interpretazione p-value:</strong> p &lt; α → Rifiuto H₀, supporto H₁</li>
          <li><strong>Probabilità eventi:</strong> P(n risultati uguali moneta) = 2 × (1/2)ⁿ</li>
          <li><strong>t di Student:</strong> Continua, simmetrica, immagine R, code PESANTI</li>
          <li><strong>Esponenziale condizionata:</strong> P(A|B) = P(A∩B)/P(B), NON sempre memoryless!</li>
        </ul>
      </div>
    </div>
  );
};

export default QuizGennaio2025Turno4;
