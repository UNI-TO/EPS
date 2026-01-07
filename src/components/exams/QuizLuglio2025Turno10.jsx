import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, RotateCcw, BookOpen } from 'lucide-react';

const QuizLuglio2025Turno10 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(4500); // 75 minuti

  const questions = [
    {
      id: 1,
      category: "Dataset fito.RData - Correlazione e Regressione",
      difficulty: "⭐⭐⭐⭐",
      question: "Hai il dataset fito.RData (509 osservazioni, 1 NA) con temperatura dell'acqua e densità di fitoplancton. La correlazione è r = 0.8306 con p-value ≈ 0. Quale modello di regressione usi?",
      options: [
        "Modello senza intercetta (y ~ x - 1), R² = 0.5",
        "Modello completo con intercetta e coefficiente angolare, R² ≈ 0.69",
        "Modello polinomiale di grado 2",
        "Nessun modello, correlazione non significativa"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: Modello completo con intercetta e coefficiente angolare

📌 ANALISI DATASET:
- 509 osservazioni, 1 NA
- Variabili: temperatura acqua (°C) e densità fitoplancton (milioni/L)
- Correlazione r = 0.8306 (forte correlazione positiva)
- p-value ≈ 0 (< 0.01) → correlazione significativa

📊 STATISTICHE DESCRITTIVE:
\`\`\`r
# Carica dataset
load("fito.RData")

# Osservazioni
nrow(fito)  # 509
sum(is.na(fito))  # 1

# Località con T < 18.5°C
mean(fito$fitoplancton[fito$temperatura < 18.5], na.rm = TRUE)
# Media: 3.5491
sd(fito$fitoplancton[fito$temperatura < 18.5], na.rm = TRUE)
# SD: 0.6626

# 5° percentile temperatura
quantile(fito$temperatura, 0.05, na.rm = TRUE)
# 14.8°C
\`\`\`

🔍 ANALISI CORRELAZIONE:
\`\`\`r
# Scatterplot
plot(fito$temperatura, fito$fitoplancton,
     main = "Temperatura vs Fitoplancton",
     xlab = "Temperatura (°C)",
     ylab = "Densità (milioni/L)")

# Correlazione positiva evidente!

# Test correlazione
cor.test(fito$temperatura, fito$fitoplancton)
# r = 0.8306
# p-value ≈ 0 (< 0.01)
# Conclusione: correlazione NON NULLA
\`\`\`

📈 REGRESSIONE LINEARE:
\`\`\`r
# Modello completo
modello <- lm(fitoplancton ~ temperatura, data = fito)
summary(modello)

# Risultati:
# - Coefficiente angolare: SIGNIFICATIVO (p < 0.01)
# - Intercetta: SIGNIFICATIVA (p < 0.01)
# - R² ≈ 0.69 (69% varianza spiegata)

# IMPORTANTE: Entrambi i parametri sono significativi!
# Quindi il modello DEVE contenere sia intercetta che coefficiente
\`\`\`

💡 INTERPRETAZIONE R²:
- R² = 0.69 significa che il 69% della variabilità nella densità di fitoplancton è spiegata dalla temperatura
- R² = r² = (0.8306)² ≈ 0.69
- Forte capacità predittiva del modello

⚠️ ERRORE COMUNE:
NON rimuovere l'intercetta a meno che non ci sia una motivazione teorica!
Se i test sui parametri sono significativi, tieni entrambi nel modello.

🎯 QUANDO RIMUOVERE L'INTERCETTA:
Solo se:
1. C'è una motivazione teorica (es. y deve essere 0 quando x = 0)
2. Il test sulla intercetta indica p-value > α
3. Il confronto di modelli (con/senza) lo giustifica`
    },
    {
      id: 2,
      category: "Probabilità con Urne - Binomiale",
      difficulty: "⭐⭐⭐⭐",
      question: "Urna U₁ ha p=0.3 palline bianche, U₂ ha p=0.5. Estrai 4 da U₁ e 6 da U₂, le metti in U₃. Sia X la proporzione di bianche in U₃. Calcola E[X] e Var(X):",
      options: [
        "E[X] = 0.50, Var(X) = 0.0250",
        "E[X] = 0.42, Var(X) = 0.0234",
        "E[X] = 0.40, Var(X) = 0.0210",
        "E[X] = 0.45, Var(X) = 0.0225"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: E[X] = 0.42, Var(X) = 0.0234

📌 SETUP PROBLEMA:
- U₁: proporzione 0.3 di palline bianche
- U₂: proporzione 0.5 di palline bianche
- Estrai CON REIMBUSSOLAMENTO:
  - 4 palline da U₁
  - 6 palline da U₂
- Tutte le 10 palline estratte vanno in U₃
- X = proporzione di bianche in U₃

🔍 VARIABILI ALEATORIE:
Sia B₁ = numero di bianche estratte da U₁
Sia B₂ = numero di bianche estratte da U₂

- B₁ ~ Binomiale(n=4, p=0.3)
- B₂ ~ Binomiale(n=6, p=0.5)
- B₁ e B₂ sono INDIPENDENTI

📊 PROPORZIONE IN U₃:
X = (B₁ + B₂) / 10

🧮 CALCOLO E[X]:
\`\`\`
E[X] = E[(B₁ + B₂) / 10]
     = (E[B₁] + E[B₂]) / 10
     = (n₁p₁ + n₂p₂) / 10
     = (4 × 0.3 + 6 × 0.5) / 10
     = (1.2 + 3.0) / 10
     = 4.2 / 10
     = 0.42
\`\`\`

💡 VARIANZA BINOMIALE:
- Var(B₁) = n₁p₁(1-p₁) = 4 × 0.3 × 0.7 = 0.84
- Var(B₂) = n₂p₂(1-p₂) = 6 × 0.5 × 0.5 = 1.50

🧮 CALCOLO Var(X):
\`\`\`
Var(X) = Var[(B₁ + B₂) / 10]
       = Var(B₁ + B₂) / 10²
       = (Var(B₁) + Var(B₂)) / 100    [per indipendenza]
       = (0.84 + 1.50) / 100
       = 2.34 / 100
       = 0.0234
\`\`\`

📈 SIMULAZIONE IN R:
\`\`\`r
# Simulazione
set.seed(123)
n_sim <- 10000

proporzioni <- replicate(n_sim, {
  b1 <- rbinom(1, 4, 0.3)
  b2 <- rbinom(1, 6, 0.5)
  (b1 + b2) / 10
})

# Verifica
mean(proporzioni)  # ≈ 0.42
var(proporzioni)   # ≈ 0.0234
\`\`\`

💡 PROPRIETÀ CHIAVE:
1. **Linearità del valore atteso**:
   E[aX + bY] = aE[X] + bE[Y]

2. **Varianza con indipendenza**:
   Var(X + Y) = Var(X) + Var(Y)

3. **Varianza con costante**:
   Var(aX) = a²Var(X)

⚠️ ATTENZIONE:
- La somma di Binomiali con STESSO p è ancora Binomiale
- Ma B₁ + B₂ NON è Binomiale (p diversi!)
- X non è Binomiale (è una proporzione)

🎯 DISTRIBUZIONE DI X:
X può assumere valori: 0, 0.1, 0.2, ..., 0.9, 1.0
La distribuzione è discreta ma NON binomiale`
    },
    {
      id: 3,
      category: "Distribuzione Normale - Probabilità Condizionata",
      difficulty: "⭐⭐⭐",
      question: "Sia X ~ N(0, 4). Calcola P(X > 3 | X < 6):",
      options: [
        "0.0668",
        "0.0655",
        "0.7734",
        "0.9332"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: 0.0655

📌 DISTRIBUZIONE:
X ~ N(μ = 0, σ² = 4)
Quindi: μ = 0, σ = 2

🔍 PROBABILITÀ CONDIZIONATA:
P(X > 3 | X < 6) = P(X > 3 ∩ X < 6) / P(X < 6)
                 = P(3 < X < 6) / P(X < 6)

📊 CALCOLO IN R:
\`\`\`r
# Parametri
mu <- 0
sigma <- 2

# 1. P(X < 1.5)
pnorm(1.5, mu, sigma)
# = 0.7734

# 2. P(X > 3)
1 - pnorm(3, mu, sigma)
# = 0.0668

# 3. P(X > 3 | X < 6)
# Numeratore: P(3 < X < 6)
num <- pnorm(6, mu, sigma) - pnorm(3, mu, sigma)

# Denominatore: P(X < 6)
den <- pnorm(6, mu, sigma)

# Risultato
prob_cond <- num / den
# = 0.0655
\`\`\`

🧮 CALCOLO DETTAGLIATO:
\`\`\`r
# P(3 < X < 6)
pnorm(6, 0, 2) - pnorm(3, 0, 2)
# = 0.9987 - 0.9332
# = 0.0655 (circa)

# P(X < 6)
pnorm(6, 0, 2)
# = 0.9987

# P(X > 3 | X < 6)
(pnorm(6, 0, 2) - pnorm(3, 0, 2)) / pnorm(6, 0, 2)
# = 0.0655 / 0.9987
# ≈ 0.0655
\`\`\`

💡 FORMULA PROBABILITÀ CONDIZIONATA:
P(A | B) = P(A ∩ B) / P(B)

Nel nostro caso:
- A = {X > 3}
- B = {X < 6}
- A ∩ B = {3 < X < 6}

📈 VISUALIZZAZIONE:
\`\`\`r
# Grafico
x <- seq(-6, 6, 0.01)
y <- dnorm(x, 0, 2)

plot(x, y, type = "l", main = "N(0, 4)")

# Area P(3 < X < 6)
x_area <- seq(3, 6, 0.01)
y_area <- dnorm(x_area, 0, 2)
polygon(c(3, x_area, 6), c(0, y_area, 0),
        col = rgb(1, 0, 0, 0.3))
\`\`\`

⚠️ ATTENZIONE AL PARAMETRO:
- X ~ N(0, 4) significa σ² = 4, quindi σ = 2
- In R: pnorm(x, mean = 0, sd = 2)
- NON pnorm(x, mean = 0, sd = 4)!

🎯 ALTRI VALORI UTILI:
\`\`\`r
# P(X < 1.5) = 0.7734
pnorm(1.5, 0, 2)

# P(X > 3) = 0.0668
1 - pnorm(3, 0, 2)

# P(X < 6) ≈ 0.9987 (molto probabile!)
pnorm(6, 0, 2)
\`\`\`

💡 INTERPRETAZIONE:
Dato che X < 6 (quasi certo), la probabilità condizionata
P(X > 3 | X < 6) è leggermente diversa da P(X > 3 | X ∈ ℝ)`
    },
    {
      id: 4,
      category: "Teoria - Riconoscimento Distribuzione",
      difficulty: "⭐⭐",
      question: "Una variabile aleatoria X ha funzione di densità f(x) = c·exp(-cx) per x ∈ ℝ₊ e c > 0. X è distribuita:",
      options: [
        "come una Binomiale con parametro c, ed è discreta",
        "esponenzialmente con parametro c, ed è continua",
        "in modo uniforme, ed è continua",
        "geometricamente con parametro c, ed è discreta"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: esponenzialmente con parametro c, ed è continua

📌 FUNZIONE DI DENSITÀ:
f(x) = c·exp(-cx) per x ∈ ℝ₊ (x > 0), zero altrove

🔍 RICONOSCIMENTO DISTRIBUZIONE:

**Distribuzione ESPONENZIALE**:
- Funzione di densità: f(x) = λ·exp(-λx) per x > 0
- Parametro: λ > 0 (rate)
- Supporto: ℝ₊ = (0, +∞)
- **Variabile CONTINUA**

Nel nostro caso: λ = c

📊 CARATTERISTICHE ESPONENZIALE:
\`\`\`
Densità:    f(x) = c·e^(-cx),  x > 0
CDF:        F(x) = 1 - e^(-cx), x > 0
Media:      E[X] = 1/c
Varianza:   Var(X) = 1/c²
\`\`\`

💡 PROPRIETÀ IMPORTANTE:
**Memoryless** (senza memoria):
P(X > s + t | X > s) = P(X > t)

📈 FUNZIONI IN R:
\`\`\`r
# Densità
dexp(x, rate = c)

# CDF
pexp(x, rate = c)

# Quantili
qexp(p, rate = c)

# Campionamento
rexp(n, rate = c)
\`\`\`

⚠️ CONFRONTO CON ALTRE DISTRIBUZIONI:

**Binomiale**:
- DISCRETA
- f(x) = (n choose x)·p^x·(1-p)^(n-x)
- Supporto: {0, 1, 2, ..., n}

**Geometrica**:
- DISCRETA
- P(X = k) = (1-p)^(k-1)·p
- Supporto: {1, 2, 3, ...}
- In R conta i FALLIMENTI prima del successo

**Uniforme**:
- CONTINUA
- f(x) = 1/(b-a) per x ∈ [a, b]
- Densità COSTANTE (non esponenziale!)

**Gamma**:
- CONTINUA
- Include Esponenziale come caso speciale
- f(x) ∝ x^(α-1)·e^(-βx)
- Esponenziale = Gamma(α=1, β=c)

🎯 COME RICONOSCERE L'ESPONENZIALE:
1. ✅ Supporto: x > 0 (ℝ₊)
2. ✅ Forma: c·exp(-cx) o λ·exp(-λx)
3. ✅ Continua (non discreta)
4. ✅ Decrescente monotonicamente

💡 APPLICAZIONI ESPONENZIALE:
- Tempi di attesa
- Durata componenti elettronici
- Tempo tra eventi (processo Poisson)
- Radioattività (tempo di decadimento)

🧮 ESEMPIO IN R:
\`\`\`r
# Esponenziale con rate = 2
c <- 2

# Grafico densità
x <- seq(0, 5, 0.01)
y <- dexp(x, rate = c)
plot(x, y, type = "l",
     main = "Densità Esponenziale(2)",
     ylab = "f(x)")

# P(X < 1.5)
pexp(1.5, rate = c)
# = 0.9502

# P(X > 3)
1 - pexp(3, rate = c)
# = 0.0025
\`\`\``
    },
    {
      id: 5,
      category: "Dataset escursioni.RData - Test Proporzioni",
      difficulty: "⭐⭐⭐⭐",
      question: "Hai 162 escursionisti: 71 preferiscono sentieri facili, 91 impegnativi. Testi H₀: p = 0.5 vs H₁: p > 0.5 (dove p = proporzione sentieri impegnativi). p-value = 0.1352, α = 0.01. Conclusione?",
      options: [
        "Rifiuto H₀: più del 50% preferisce impegnativi",
        "Non rifiuto H₀: posso affermare che il 50% preferisce impegnativi",
        "Rifiuto H₀: meno del 50% preferisce impegnativi",
        "Non rifiuto H₀: non posso concludere nulla"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: Non rifiuto H₀: posso affermare che il 50% preferisce impegnativi

📌 DATI:
- 162 escursionisti totali
- 71 preferiscono sentieri facili
- 91 preferiscono sentieri impegnativi
- Proporzione impegnativi: 91/162 = 0.5617

📊 STATISTICHE DESCRITTIVE:
\`\`\`r
# Carica dataset
load("escursioni.RData")

# Dimensione
nrow(escursioni)  # 162

# Frequenze
table(escursioni$Preferenza)
# Facili: 71
# Impegnativi: 91

# Proporzioni
table(escursioni$Preferenza) / sum(table(escursioni$Preferenza))
# Facili: 0.4383
# Impegnativi: 0.5617

# Media escursioni (solo facili)
mean(escursioni$"Numero escursioni"[
  escursioni$Preferenza == "Sentiero facile"])
# = 1.3803
\`\`\`

🔍 TEST DI IPOTESI:
Domanda: "Più della metà preferisce sentieri impegnativi?"

- H₀: p = 0.5 (50% preferisce impegnativi)
- H₁: p > 0.5 (più del 50% preferisce impegnativi)
- Test UNILATERALE (greater)
- α = 0.01

📈 TEST IN R:
\`\`\`r
# Test binomiale esatto
binom.test(
  x = 91,              # successi (impegnativi)
  n = 162,             # prove totali
  p = 0.5,             # proporzione null
  alternative = "greater"
)

# Risultati:
# p-value = 0.1352
\`\`\`

💡 REGOLA DECISIONALE:
- Se p-value < α → Rifiuto H₀
- Se p-value ≥ α → Non rifiuto H₀

Nel nostro caso:
- p-value = 0.1352
- α = 0.01
- 0.1352 > 0.01 → **NON RIFIUTO H₀**

📊 INTERPRETAZIONE:
**NON posso rifiutare H₀** significa:
- NON ho evidenza sufficiente per dire che p > 0.5
- I dati sono compatibili con H₀: p = 0.5
- Posso affermare che "il 50% preferisce impegnativi"

⚠️ ATTENZIONE ALLE CONCLUSIONI:

❌ ERRORE: "Accetto H₀"
✅ CORRETTO: "Non rifiuto H₀"

❌ ERRORE: "H₀ è vera"
✅ CORRETTO: "Non ho evidenza contro H₀"

❌ ERRORE: "p = 0.5 esattamente"
✅ CORRETTO: "I dati sono compatibili con p = 0.5"

🎯 COSA POSSO DIRE CON α = 0.01:
"Con livello di significatività 0.01, non posso affermare che più del 50% degli escursionisti preferisce sentieri impegnativi. I dati sono compatibili con la proporzione del 50%."

💡 SE AVESSI USATO α = 0.15:
\`\`\`r
# p-value = 0.1352 < 0.15
# → Rifiuterei H₀
# → Potrei dire "p > 0.5"
\`\`\`

Ma con α = 0.01, sono più conservativo!

📈 INTERVALLO DI CONFIDENZA:
\`\`\`r
# IC 99% per la proporzione
binom.test(91, 162, conf.level = 0.99)$conf.int
# [0.451, 0.668]

# Nota: 0.5 è DENTRO l'IC 99%
# → Non posso rifiutare H₀: p = 0.5
\`\`\`

🔍 VISUALIZZAZIONE:
\`\`\`r
# Barplot preferenze
barplot(table(escursioni$Preferenza),
        main = "Preferenze Escursionisti",
        col = c("lightblue", "salmon"),
        ylab = "Frequenza")

# Histogram numero escursioni
hist(escursioni$"Numero escursioni",
     main = "Numero Escursioni",
     xlab = "Numero",
     col = "lightgreen")
\`\`\`

💡 DIFFERENZA CON TEST BILATERALE:
\`\`\`r
# Se avessi fatto H₁: p ≠ 0.5
binom.test(91, 162, p = 0.5, alternative = "two.sided")
# p-value = 0.2704 (ancora maggiore!)
# Stessa conclusione: non rifiuto H₀
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
    setTimeLeft(4500);
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
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full mb-4">
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
                Esame 11 Luglio 2025 - Turno 10 (9cfu)
              </p>
              <p className="text-6xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
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
                      <summary className="cursor-pointer text-sm font-medium text-cyan-600 hover:text-cyan-800">
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
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Esame 11 Luglio 2025 - Turno 10
              </h1>
              <p className="text-gray-600 mt-1">
                Correlazione, Urne/Binomiale, Normale, Esponenziale, Proporzioni
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
              className="bg-gradient-to-r from-cyan-600 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {currentQuestion + 1}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
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
                      ? 'border-cyan-600 bg-gradient-to-r from-cyan-50 to-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-cyan-300 hover:bg-cyan-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? 'border-cyan-600 bg-cyan-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </div>
                    <span className={`${isSelected ? 'font-medium text-cyan-900' : 'text-gray-700'}`}>
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
              className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Completa Quiz
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
            >
              Successiva →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizLuglio2025Turno10;
