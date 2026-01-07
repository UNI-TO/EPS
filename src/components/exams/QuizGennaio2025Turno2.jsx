import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, RotateCcw, BookOpen } from 'lucide-react';

const QuizGennaio2025Turno2 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minuti

  const questions = [
    {
      id: 1,
      category: "Dataset fertilizzante.RData - Test t",
      difficulty: "⭐⭐⭐⭐",
      question: "Hai il dataset fertilizzante.RData con 40 piante trattate con fertilizzante A e 168 con fertilizzante B. Vuoi testare se i due fertilizzanti hanno lo stesso effetto sulla crescita. Quale test usi e quale affermazione è corretta?",
      options: [
        "Test t per la differenza di medie con alternativa bilaterale, p-value < 0.01 quindi non rifiuto H0",
        "Test t per la differenza di medie con alternativa bilaterale, p-value < 0.01 quindi rifiuto H0",
        "Test t per una singola media con alternativa unilaterale",
        "ANOVA con test post-hoc"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: Test t bilaterale, rifiuto H0

📌 PROBLEMA:
Confrontare due fertilizzanti A e B sulla crescita delle piante.

🔍 TEST APPROPRIATO:
- **Test t per due campioni indipendenti**
- **Alternativa bilaterale** (two.sided)
- H0: μA = μB vs H1: μA ≠ μB

📊 CODICE R:
\`\`\`r
# Carica dataset
load("fertilizzante.RData")

# Statistiche descrittive
mean(dati$altezza[dati$fertilizzante == "A"])
sd(dati$altezza[dati$fertilizzante == "A"])

mean(dati$altezza[dati$fertilizzante == "B"])
sd(dati$altezza[dati$fertilizzante == "B"])

# Test t
t.test(
  dati$altezza[dati$fertilizzante == "A"],
  dati$altezza[dati$fertilizzante == "B"],
  mu = 0,
  alternative = "two.sided",
  paired = FALSE
)
\`\`\`

📈 INTERPRETAZIONE:
- Se **p-value < 0.01** → rifiuto H0
- Conclusione: i due fertilizzanti hanno effetto significativamente diverso
- Le piante crescono in modo diverso con i due fertilizzanti

⚠️ ATTENZIONE:
Siccome rifiuto H0, NON posso dire quale fertilizzante è migliore senza guardare le medie campionarie!

🎯 VISUALIZZAZIONE:
\`\`\`r
# Boxplot per confronto visivo
boxplot(dati$altezza ~ dati$fertilizzante,
        main = "Altezza per Fertilizzante",
        ylab = "Altezza (cm)",
        col = c("lightblue", "lightgreen"))

# Le scatole si sovrappongono? → vero
\`\`\``
    },
    {
      id: 2,
      category: "Distribuzione Esponenziale",
      difficulty: "⭐⭐⭐",
      question: "Sia X ~ Esponenziale(λ=2). Calcola P(X < 1.5 ∪ X > 3):",
      options: [
        "0.9502",
        "0.9527",
        "0.0025",
        "0.5556"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: 0.9527

📌 DISTRIBUZIONE:
X ~ Esponenziale(λ = 2)

🔍 EVENTO:
P(X < 1.5 ∪ X > 3) = P(X < 1.5) + P(X > 3)

📊 CALCOLO IN R:
\`\`\`r
# P(X < 1.5)
p1 <- pexp(1.5, rate = 2)

# P(X > 3) = 1 - P(X ≤ 3)
p2 <- 1 - pexp(3, rate = 2)

# Unione
risultato <- p1 + p2
# risultato = 0.9527
\`\`\`

🧮 CALCOLO DETTAGLIATO:
\`\`\`r
pexp(1.5, 2) + (1 - pexp(3, 2))
# = 0.9502 + 0.0025
# = 0.9527
\`\`\`

📈 ALTRI VALORI UTILI:
\`\`\`r
# P(X > 3)
1 - pexp(3, 2)  # = 0.0025

# P(X ∈ (1,6) ∩ X > 3) = P(3 < X < 6)
pexp(6, 2) - pexp(3, 2)  # = 0.0025
\`\`\`

💡 PROPRIETÀ ESPONENZIALE:
- **Memoryless**: P(X > s+t | X > s) = P(X > t)
- Media: E[X] = 1/λ = 1/2 = 0.5
- Varianza: Var(X) = 1/λ² = 1/4 = 0.25

⚠️ ATTENZIONE AL PARAMETRO:
- R usa **rate** = λ (non mean!)
- pexp(x, rate = 2) ≠ pexp(x, rate = 0.5)`
    },
    {
      id: 3,
      category: "Probabilità Classica - Eventi",
      difficulty: "⭐⭐⭐⭐",
      question: "Lanci 4 volte una moneta non equa con P(testa) = 1/3. A = 'i primi tre risultati sono uguali', B = 'gli ultimi due risultati sono uguali'. Calcola P(A ∩ B):",
      options: [
        "0.3333",
        "0.5556",
        "0.2099",
        "0.1111"
      ],
      correct: 2,
      explanation: `✅ RISPOSTA CORRETTA: 0.2099

📌 SETUP:
- 4 lanci di moneta non equa
- P(T) = 1/3, P(C) = 2/3
- A = "primi 3 risultati uguali"
- B = "ultimi 2 risultati uguali"

🔍 EVENTO A ∩ B:
Per avere sia A che B veri, serve:
- Primi 3 uguali: TTTT... o CCC...
- Ultimi 2 uguali: ...TT o ...CC

Quindi A ∩ B = {TTTT, CCCC}
Tutti e 4 i lanci devono essere uguali!

📊 CALCOLO:
\`\`\`r
# P(TTTT)
p_tttt <- (1/3)^4

# P(CCCC)
p_cccc <- (2/3)^4

# P(A ∩ B)
p_a_intersect_b <- p_tttt + p_cccc
# = 0.0123 + 0.1975
# = 0.2099
\`\`\`

🧮 VERIFICHE:
\`\`\`r
# P(A) = primi 3 uguali
# {TTTT, TTTC, CCCC, CCCT}
(1/3)^3 + (2/3)^3
# = 0.0370 + 0.2963 = 0.3333

# P(B) = ultimi 2 uguali
# {TTTT, CTTT, TCTT, CCTT, CCCC, TCCC, CTCC, TTCC}
(1/3)^2 + (2/3)^2
# = 0.1111 + 0.4444 = 0.5556

# Verifica: P(A ∩ B) ≤ min(P(A), P(B)) ✓
# 0.2099 < 0.3333 ✓
\`\`\`

💡 INTERPRETAZIONE:
A ∩ B è MOLTO più restrittivo di A o B singolarmente!

⚠️ ERRORE COMUNE:
NON fare P(A) × P(B) = 0.3333 × 0.5556
Gli eventi NON sono indipendenti!`
    },
    {
      id: 4,
      category: "Dataset alberi.RData - Correlazione e Regressione",
      difficulty: "⭐⭐⭐⭐",
      question: "Hai il dataset alberi.RData (319 alberi, 6 NA). Vuoi testare se diametro e altezza sono correlati. Quale test svolgi e cosa concludi con α = 0.01?",
      options: [
        "Test sulla media della correlazione, p-value < 0.01, correlazione nulla",
        "Test sulla correlazione (H0: ρ = 0), p-value < 0.01, correlazione significativamente non nulla",
        "Test sulla correlazione (H0: ρ ≠ 0), p-value > 0.01, correlazione nulla",
        "ANOVA per confrontare le medie"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: Test su correlazione, rifiuto H0, correlazione non nulla

📌 PROBLEMA:
Verificare se diametro e altezza degli alberi sono linearmente correlati.

🔍 TEST APPROPRIATO:
- **Test sulla correlazione di Pearson**
- H0: ρ = 0 (non c'è correlazione)
- H1: ρ ≠ 0 (c'è correlazione)

📊 CODICE R:
\`\`\`r
# Carica dataset
load("alberi.RData")

# Dimensione dataset
nrow(dati)  # 319 alberi
sum(is.na(dati))  # 6 NA

# Statistiche descrittive
# Alberi con 25 ≤ altezza ≤ 35
mean(dati$diametro[dati$altezza >= 25 & dati$altezza <= 35],
     na.rm = TRUE)
sd(dati$diametro[dati$altezza >= 25 & dati$altezza <= 35],
   na.rm = TRUE)

# 90° percentile altezze
quantile(dati$altezza, 0.9, na.rm = TRUE)

# Boxplot per confronto
boxplot(dati$altezza[dati$diametro < 40],
        dati$altezza[dati$diametro >= 40])
# Le scatole si sovrappongono → vero

# Correlazione
cor(dati$diametro, dati$altezza, use = "complete.obs")
# r ≈ 0.85 (forte correlazione positiva)

# Test sulla correlazione
cor.test(dati$diametro, dati$altezza)
# p-value ≈ 0 (< 0.01)
# Conclusione: correlazione significativamente NON NULLA
\`\`\`

📈 REGRESSIONE LINEARE:
\`\`\`r
# Modello: altezza ~ diametro
modello <- lm(altezza ~ diametro, data = dati)
summary(modello)

# Coefficiente angolare
coef(modello)[2]  # ≈ 0.3488

# Test significatività coefficiente
# p-value ≈ 0 (< 0.05)
# Conclusione: coefficiente NON NULLO
\`\`\`

💡 INTERPRETAZIONE:
- Correlazione forte e positiva (r ≈ 0.85)
- Significativamente diversa da 0
- Alberi con diametro maggiore tendono ad essere più alti
- Per ogni cm di diametro in più, altezza aumenta di ~0.35 m

⚠️ ATTENZIONE:
- Correlazione ≠ Causalità
- Presenza di NA → usa na.rm = TRUE o use = "complete.obs"`
    },
    {
      id: 5,
      category: "Teoria - Funzione di Distribuzione",
      difficulty: "⭐⭐⭐",
      question: "Completa: 'La funzione di distribuzione cumulativa (CDF) di una variabile aleatoria è non decrescente e _____. Se la VA è discreta, la CDF è _____. Per la Normale, la CDF è _____.'",
      options: [
        "continua a destra; costante a tratti; strettamente crescente",
        "continua a sinistra; continua ovunque; asintotica",
        "puntiforme; continua a tratti; asintotica",
        "continua ovunque; costante a tratti; continua a tratti"
      ],
      correct: 0,
      explanation: `✅ RISPOSTA CORRETTA: continua a destra; costante a tratti; strettamente crescente

📌 FUNZIONE DI DISTRIBUZIONE (CDF):
F(x) = P(X ≤ x)

🔍 PROPRIETÀ GENERALI:
1. **Non decrescente**: se x₁ < x₂ → F(x₁) ≤ F(x₂)
2. **Continua a destra**: lim(h→0⁺) F(x+h) = F(x)
3. Limiti: lim(x→-∞) F(x) = 0, lim(x→∞) F(x) = 1
4. 0 ≤ F(x) ≤ 1 per ogni x

📊 VARIABILE ALEATORIA DISCRETA:
- CDF è **costante a tratti** (funzione a scalini)
- Salti nei punti con probabilità > 0
- Esempio: Binomiale, Poisson, Geometrica

\`\`\`r
# Esempio: Poisson(λ=3)
x <- seq(0, 10, by = 0.1)
y <- ppois(floor(x), lambda = 3)
plot(x, y, type = "l", main = "CDF Poisson")
# Nota: funzione a scalini!
\`\`\`

📈 VARIABILE ALEATORIA CONTINUA:
- CDF è **continua**
- Per la Normale: **strettamente crescente**
- Derivabile (tranne al più in punti isolati)

\`\`\`r
# Esempio: Normale(0,1)
x <- seq(-4, 4, by = 0.01)
y <- pnorm(x)
plot(x, y, type = "l", main = "CDF Normale")
# Nota: curva S continua e crescente!
\`\`\`

💡 NORMALE STANDARD:
- CDF: Φ(x) = P(Z ≤ x)
- Strettamente crescente su tutto ℝ
- Simmetrica: Φ(-x) = 1 - Φ(x)
- Φ(0) = 0.5

⚠️ ATTENZIONE ALLE DEFINIZIONI:
- **Continua a destra** ≠ Continua ovunque
- Discrete: salti (discontinuità)
- Continue: nessun salto

🎯 ESEMPI IN R:
\`\`\`r
# Confronta CDF discrete vs continue
par(mfrow = c(1, 2))

# Binomiale (discreta)
x1 <- 0:10
y1 <- pbinom(x1, 10, 0.5)
plot(x1, y1, type = "s", main = "CDF Binomiale")

# Normale (continua)
x2 <- seq(-3, 3, 0.01)
y2 <- pnorm(x2)
plot(x2, y2, type = "l", main = "CDF Normale")
\`\`\``
    }
  ];

  const handleAnswer = (questionId, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) correct++;
    });
    return correct;
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setTimeLeft(900);
  };

  const question = questions[currentQuestion];
  const score = calculateScore();
  const percentage = ((score / questions.length) * 100).toFixed(1);

  React.useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showResults]);

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full mb-4">
                {percentage >= 60 ? (
                  <CheckCircle className="w-16 h-16 text-white" />
                ) : (
                  <XCircle className="w-16 h-16 text-white" />
                )}
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Quiz Completato!
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                Esame 29 Gennaio 2025 - Turno 2
              </p>
              <p className="text-6xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
                {percentage}%
              </p>
              <p className="text-xl text-gray-600">
                {score} su {questions.length} risposte corrette
              </p>
            </div>

            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Prestazione</span>
                <span>{percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    percentage >= 90
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                      : percentage >= 70
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                      : percentage >= 60
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                      : 'bg-gradient-to-r from-red-500 to-pink-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {questions.map((q, idx) => {
                const userAnswer = selectedAnswers[q.id];
                const isCorrect = userAnswer === q.correct;
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-lg border-2 ${
                      isCorrect
                        ? 'bg-green-50 border-green-500'
                        : 'bg-red-50 border-red-500'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 mb-1">
                          Domanda {idx + 1}: {q.category}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">{q.question}</p>
                        <p className="text-sm">
                          <span className="font-medium">La tua risposta: </span>
                          <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                            {q.options[userAnswer] || 'Nessuna risposta'}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p className="text-sm mt-1">
                            <span className="font-medium">Risposta corretta: </span>
                            <span className="text-green-700">{q.options[q.correct]}</span>
                          </p>
                        )}
                      </div>
                      <div>
                        {isCorrect ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                    </div>
                    <details className="mt-3">
                      <summary className="cursor-pointer text-sm font-medium text-orange-600 hover:text-orange-800">
                        Vedi spiegazione completa
                      </summary>
                      <div className="mt-2 p-3 bg-white rounded border border-gray-200">
                        <pre className="text-xs text-gray-700 whitespace-pre-wrap font-sans">
                          {q.explanation}
                        </pre>
                      </div>
                    </details>
                  </div>
                );
              })}
            </div>

            <button
              onClick={resetQuiz}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-orange-700 hover:to-amber-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              <RotateCcw className="w-5 h-5" />
              Ricomincia Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Esame 29 Gennaio 2025 - Turno 2
              </h1>
              <p className="text-gray-600 mt-1">
                Test t, Esponenziale, Probabilità, Correlazione, Teoria
              </p>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-5 h-5" />
              <span className="font-mono text-lg">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Domanda {currentQuestion + 1} di {questions.length}
            </span>
            <span className="text-gray-600">
              {Object.keys(selectedAnswers).length}/{questions.length} risposte
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div
              className="bg-gradient-to-r from-orange-600 to-amber-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {currentQuestion + 1}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  {question.category}
                </span>
                <span className="text-gray-500">{question.difficulty}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 leading-relaxed">
                {question.question}
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswers[question.id] === index;
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(question.id, index)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-orange-600 bg-gradient-to-r from-orange-50 to-amber-50 shadow-md'
                      : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? 'border-orange-600 bg-orange-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </div>
                    <span className={`${isSelected ? 'font-medium text-orange-900' : 'text-gray-700'}`}>
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
          >
            ← Precedente
          </button>

          <div className="flex-1" />

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={submitQuiz}
              disabled={Object.keys(selectedAnswers).length !== questions.length}
              className="px-8 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-700 hover:to-amber-700 transition-all duration-300 shadow-lg flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Completa Quiz
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-semibold hover:from-orange-700 hover:to-amber-700 transition-all duration-300 shadow-lg"
            >
              Successiva →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizGennaio2025Turno2;
