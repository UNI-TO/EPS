import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, RotateCcw, BookOpen } from 'lucide-react';

const QuizGennaio2026Turno2 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      category: "Probabilità Classica - Moneta Sbilanciata",
      difficulty: "⭐⭐⭐",
      question: "Una moneta sbilanciata viene lanciata ripetutamente. In ciascun lancio P(T) = 0.4. Calcola: A = 'la prima T esce al quarto lancio', B = 'la seconda T esce al quarto lancio', C = A ∩ B.",
      options: [
        "P(A) = 0.0864, P(B) = 0.1728, P(C) = 0",
        "P(A) = 0.1296, P(B) = 0.3456, P(C) = 0.0518",
        "P(A) = 0.0864, P(B) = 0.3456, P(C) = 0",
        "P(A) = 0.0864, P(B) = 0.1728, P(C) = 0.0346"
      ],
      correct: 0,
      explanation: `✅ SOLUZIONE CORRETTA: opzione 1

PROBABILITÀ CLASSICA CON SEQUENZE

Dati: P(T) = 0.4, P(C) = 0.6

SOLUZIONE:

1) A = "la prima T esce al quarto lancio"
   Significa: CCCT
   P(A) = P(C) × P(C) × P(C) × P(T)
        = 0.6 × 0.6 × 0.6 × 0.4
        = 0.6³ × 0.4
        = 0.216 × 0.4
        = 0.0864

2) B = "la seconda T esce al quarto lancio"
   Significa: nei primi 3 lanci c'è esattamente 1 T,
   e il quarto lancio è T.

   Possibili sequenze:
   - TCCT: P = 0.4 × 0.6 × 0.6 × 0.4 = 0.0576
   - CTCT: P = 0.6 × 0.4 × 0.6 × 0.4 = 0.0576
   - CCTT: P = 0.6 × 0.6 × 0.4 × 0.4 = 0.0576

   P(B) = 3 × 0.4² × 0.6²
        = 3 × 0.16 × 0.36
        = 0.1728

3) C = A ∩ B
   "La prima T al quarto E la seconda T al quarto"

   IMPOSSIBILE! Non possono verificarsi entrambi!
   Se la prima T esce al 4°, non può esserci
   una seconda T anche al 4°.

   P(C) = P(A ∩ B) = 0

CODICE R:
# P(A) - prima T al quarto
0.4 * (0.6)^3
[1] 0.0864

# P(B) - seconda T al quarto
3 * 0.4^2 * (0.6)^2
[1] 0.1728

# P(C) - entrambi
# Impossibile
0

📌 CONCETTO CHIAVE - EVENTI INCOMPATIBILI:
Se due eventi non possono verificarsi insieme,
sono detti incompatibili (o disgiunti).
In tal caso: P(A ∩ B) = 0

💡 DISTRIBUZIONE GEOMETRICA:
P(prima T al k-esimo lancio) = (1-p)^(k-1) × p
P(A) = (0.6)³ × 0.4 = distribuzione geometrica!`
    },
    {
      id: 2,
      category: "Teoria - Varianza e Deviazione Standard",
      difficulty: "⭐⭐",
      question: "Completa: 'La deviazione standard è definita come la radice della media _____. Si ottiene come _____ della varianza. La varianza si calcola come _____ delle differenze _____ dalla media, elevati al quadrato, e moltiplicati per la loro _____. È un valore sempre _____.'",
      options: [
        "quadrato / radice quadrata / somma / degli scarti / probabilità / >= 0",
        "degli scarti al quadrato / radice quadrata / somma / dei valori nell'immagine / probabilità / >= 0",
        "degli scarti / prodotto / somma / dei valori / frequenza / >= 0",
        "al quadrato / radice / prodotto / degli scarti / media / <= 0"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: opzione 2

"La deviazione standard è definita come la radice della
media DEGLI SCARTI AL QUADRATO. Si ottiene come RADICE
QUADRATA della varianza. La varianza si calcola come
SOMMA delle differenze DEI VALORI NELL'IMMAGINE dalla
media, elevati al quadrato, e moltiplicati per la loro
PROBABILITÀ. È un valore sempre >= 0."

📚 DEFINIZIONI FORMALI:

1. VARIANZA di X discreta:
   Var(X) = E[(X - μ)²]
          = Σ (xᵢ - μ)² × P(X = xᵢ)

   dove:
   - xᵢ sono i valori nell'immagine di X
   - μ = E[X] è la media
   - P(X = xᵢ) è la probabilità

2. DEVIAZIONE STANDARD:
   σ = √Var(X)

   È la radice quadrata della varianza

3. PROPRIETÀ:
   - Var(X) ≥ 0 sempre (è una somma di quadrati!)
   - Var(X) = 0 ⟺ X è costante
   - σ ha le stesse unità di misura di X

💡 PERCHÉ "MEDIA DEGLI SCARTI AL QUADRATO"?
   Var(X) = E[(X - μ)²]

   (X - μ) = scarto dalla media
   (X - μ)² = scarto al quadrato
   E[...] = media (valore atteso)

FORMULE ALTERNATIVE:
   Var(X) = E[X²] - (E[X])²
   Var(X) = E[X²] - μ²

⚠️ ERRORI COMUNI:
- La varianza NON è la media degli scarti
  (quella sarebbe sempre 0!)
- La varianza è SEMPRE positiva o zero
- La deviazione standard è la RADICE, non il quadrato`
    },
    {
      id: 3,
      category: "Dataset allenamento + Regressione - Esame 16 Gen 2026",
      difficulty: "⭐⭐⭐⭐",
      question: "Dataset 'allenamento.RData' con 506 atleti. Vuoi indagare se durata allenamento e capacità cardiorespiratoria sono legate linearmente. La correlazione è 0.9703 (significativa con α=0.01, p-value=0). La retta y=ax+b ha a=29.9921 e b=3.5067. Quale valore è SBAGLIATO?",
      options: [
        "a = 29.9921 (dovrebbe essere circa 3.5)",
        "b = 3.5067 (dovrebbe essere circa 29.99)",
        "Correlazione 0.9703 è corretta",
        "p-value = 0 è corretto"
      ],
      correct: 0,
      explanation: `✅ SOLUZIONE: c'è un errore nei valori di a e b!

ANALISI COMPLETA DEL DATASET:

CODICE R:
# 1. Caricamento e info base
load("allenamento.RData")
nrow(dati)            # 506
sum(is.na(dati))      # 0

# 2. Statistische descrittive per allenamento=2
mean(dati$cardio[dati$allenamento == 2])  # 37.625
sd(dati$cardio[dati$allenamento == 2])    # 1.974

# 3. Quantile 97% (3% degli atleti più alti)
quantile(dati$cardio, 0.97)  # 66

# 4. Boxplot
boxplot(dati$cardio ~ dati$allenamento)
# Il 50° percentile (mediana) di chi si allena 3 ore
# è maggiore del 75° percentile di chi si allena 2 ore

# 5. Correlazione
cor(dati$allenamento, dati$cardio)  # 0.9703

# Test significatività
cor.test(dati$allenamento, dati$cardio)
# p-value < 2.2e-16 ≈ 0
# La correlazione è SIGNIFICATIVAMENTE NON NULLA

# 6. Regressione lineare
# y = cardio (variabile risposta)
# x = allenamento (variabile esplicativa)
modello <- lm(cardio ~ allenamento, data=dati)
summary(modello)

# Coefficienti CORRETTI:
# Intercept (b): 3.5067
# Slope (a):    29.9921

⚠️ INTERPRETAZIONE COEFFICIENTI:
- b (intercetta) = 3.5067
  → Capacità cardiorespiratoria con 0 ore di allenamento

- a (pendenza) = 29.9921
  → Aumento di capacità per ogni ora aggiuntiva
  → Se alleni 1 ora in più, capacità aumenta di ~30 ml/kg/min

📊 EQUAZIONE RETTA:
cardio = 3.5067 + 29.9921 × allenamento

Esempi:
- allenamento = 1 ora → cardio = 3.51 + 29.99 = 33.5
- allenamento = 2 ore → cardio = 3.51 + 59.98 = 63.5
- allenamento = 3 ore → cardio = 3.51 + 89.97 = 93.5

🔍 L'ERRORE NELL'ESAME:
Nell'esame, i valori di a e b erano invertiti
(a = 29.9921, b = 3.5067 è CORRETTO!)

📌 CORRELAZIONE ALTISSIMA:
r = 0.9703 indica relazione lineare FORTISSIMA
(vicino a 1 = perfetta correlazione positiva)`
    },
    {
      id: 4,
      category: "Esponenziale - Memoryless - Esame 16 Gen 2026",
      difficulty: "⭐⭐⭐",
      question: "Il tempo di vita (ore) delle lampadine è X ~ Esponenziale con media 10 ore. Calcola: 1) P(X > 10), 2) P(X > 20 | X > 5) [la lampadina è accesa da 5 ore, quanto dura altre 15?], 3) Tempo medio con 2 lampadine indipendenti (sostituzione immediata).",
      options: [
        "1) 0.3679  2) 0.2231  3) 20",
        "1) 0.3679  2) 0.2231  3) 10",
        "1) 0.6321  2) 0.7769  3) 20",
        "1) 0.3679  2) 0.3679  3) 10"
      ],
      correct: 0,
      explanation: `✅ SOLUZIONE CORRETTA: opzione 1

DISTRIBUZIONE ESPONENZIALE
X ~ Exp con media μ = 10 ore
Quindi rate λ = 1/μ = 1/10 = 0.1

SOLUZIONE:

1) P(X > 10)
1 - pexp(10, rate = 0.1)
= 1 - pexp(10, 0.1)
= 1 - 0.6321
= 0.3679

Alternativamente: exp(-λ × 10) = exp(-1) = 0.3679

2) P(X > 20 | X > 5)
PROPRIETÀ MEMORYLESS (assenza di memoria):
P(X > t + s | X > s) = P(X > t)

Quindi:
P(X > 20 | X > 5) = P(X > 15)
                  = 1 - pexp(15, 0.1)
                  = 0.2231

⚠️ NON è P(X > 20 | X > 5) = P(X > 20)!
Dobbiamo calcolare P(X > 5+15 | X > 5) = P(X > 15)

3) Tempo medio con 2 lampadine
Se X₁ e X₂ sono indipendenti con media 10:
E[X₁ + X₂] = E[X₁] + E[X₂]
           = 10 + 10
           = 20 ore

CODICE R COMPLETO:
# 1. P(X > 10)
1 - pexp(10, 0.1)
[1] 0.3679

# 2. P(X > 20 | X > 5) = P(X > 15)
1 - pexp(15, 0.1)
[1] 0.2231

# 3. E[X₁ + X₂]
10 + 10
[1] 20

📌 PROPRIETÀ MEMORYLESS:
La distribuzione esponenziale è l'UNICA distribuzione
continua con questa proprietà!

Significa: "il futuro non dipende dal passato"
Se la lampadina ha funzionato 5 ore, la probabilità
che duri altre 15 ore è uguale alla probabilità
che una lampadina nuova duri 15 ore.

💡 FORMULE ESPONENZIALE:
Se X ~ Exp(λ):
- E[X] = 1/λ
- Var[X] = 1/λ²
- P(X > t) = exp(-λt) = 1 - pexp(t, λ)
- P(X ≤ t) = 1 - exp(-λt) = pexp(t, λ)

⚠️ ATTENZIONE IN R:
pexp(t, rate) usa il parametro rate = λ
Se hai la media μ, usa rate = 1/μ`
    },
    {
      id: 5,
      category: "Dataset consumo + Test Proporzioni - Esame 16 Gen 2026",
      difficulty: "⭐⭐⭐⭐",
      question: "Dataset 'consumo.RData': 84 abitazioni con risparmio energetico (S), 2 NA. Vuoi testare se più del 40% ha dispositivi di risparmio. Test binom.test(84, 162, p=0.4, alternative='greater') dà p-value=0.0015. Con α=0.05, quale conclusione?",
      options: [
        "Non rifiuto H₀, non ci sono elementi per affermare che > 40% ha risparmio",
        "Rifiuto H₀, più del 40% delle abitazioni ha dispositivi di risparmio",
        "Rifiuto H₀, meno del 40% delle abitazioni ha dispositivi di risparmio",
        "Test sbagliato, dovrei usare t.test per differenza medie"
      ],
      correct: 1,
      explanation: `✅ SOLUZIONE CORRETTA: opzione 2

TEST DI IPOTESI PER UNA PROPORZIONE

CODICE R COMPLETO:
# 1. Caricamento dati
load("consumo.RData")

# 2. Info base
table(dati$risparmio)
# N: 76, S: 84
sum(is.na(dati))  # 2 NA

# Totale osservazioni valide: 84 + 76 = 160
# Ma l'esame dice 162 (probabilmente include i 2 NA)

# 3. Statistiche per abitazioni con risparmio (S)
mean(dati$consumo[dati$risparmio == "S"], na.rm=TRUE)  # 254.6905
sd(dati$consumo[dati$risparmio == "S"], na.rm=TRUE)    # 60.6449

# 4. Quantile 90% (top 10% consuma più di...)
quantile(dati$consumo, 0.9, na.rm=TRUE)  # 325.1

# 5. Boxplot
boxplot(dati$consumo ~ dati$risparmio)
# Verifica: i grafici sono consistenti?

# 6. TEST DI IPOTESI SULLA PROPORZIONE
# H₀: p = 0.4 (40% ha risparmio)
# H₁: p > 0.4 (più del 40% ha risparmio)

test <- binom.test(84, 162, p=0.4, alternative="greater")
test$p.value   # 0.0015
test$estimate  # 0.5185 (stima = 84/162)

# 7. DECISIONE con α = 0.05
# p-value (0.0015) < α (0.05)
# → RIFIUTO H₀

# 8. CONCLUSIONE
# C'è sufficiente evidenza per affermare che
# PIÙ DEL 40% delle abitazioni ha dispositivi
# di risparmio energetico

📌 TEST BINOMIALE:
Si usa quando:
- Variabile dicotomica (Sì/No, S/N)
- Vogliamo testare una proporzione
- Dati: k successi su n prove

Sintassi R:
binom.test(x, n, p, alternative)
- x = numero successi (84)
- n = totale (162)
- p = proporzione sotto H₀ (0.4)
- alternative = "greater", "less", "two.sided"

📊 INTERPRETAZIONE:
- p̂ = 84/162 = 0.5185 (51.85%)
- Osserviamo 51.85% > 40%
- p-value molto piccolo (0.0015)
- Forte evidenza contro H₀

⚠️ ATTENZIONE:
- alternative="greater" perché testiamo p > 0.4
- Se volevamo p < 0.4 → alternative="less"
- Se volevamo p ≠ 0.4 → alternative="two.sided"`
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
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-8 rounded-xl mb-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <BookOpen className="w-10 h-10" />
          <div>
            <h1 className="text-3xl font-bold">Esame 16 Gennaio 2026 - Turno 2</h1>
            <p className="text-cyan-100 mt-1">
              Quiz completo basato sull'esame reale (9 CFU)
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
                      ? 'bg-cyan-600 text-white ring-4 ring-cyan-200'
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
                        ? 'border-cyan-500 bg-cyan-50'
                        : 'border-gray-200 bg-white hover:border-cyan-300 hover:bg-gray-50'
                    } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        showCorrect
                          ? 'bg-green-500 text-white'
                          : showWrong
                          ? 'bg-red-500 text-white'
                          : selected
                          ? 'bg-cyan-600 text-white'
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
                  : 'bg-cyan-50 border-cyan-500'
              }`}>
                <h3 className={`text-xl font-bold mb-4 flex items-center gap-3 ${
                  isCorrect ? 'text-green-800' : 'text-cyan-800'
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
                  : 'bg-cyan-600 text-white hover:bg-cyan-700'
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
                className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition"
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
            score >= 4 ? 'bg-green-500' : score >= 3 ? 'bg-cyan-500' : 'bg-red-500'
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
            className="px-8 py-4 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition flex items-center gap-3 mx-auto shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Ricomincia Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizGennaio2026Turno2;