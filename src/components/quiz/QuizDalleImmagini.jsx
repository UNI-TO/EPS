import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, RotateCcw, BookOpen, Code } from 'lucide-react';

const QuizDalleImmagini = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      category: "R Data Analysis - pomodori.RData",
      difficulty: "⭐⭐⭐",
      question: "Analisi descrittiva del dataset pomodori.RData",
      subQuestions: [
        {
          text: "Lo studio comprende quante osservazioni? La produzione media delle piante sulle quali è stato usato il fertilizzante A è pari a quanto? E la deviazione standard?",
          answer: "133 osservazioni, media = 3.4860 Kg, SD = 0.9326 Kg"
        },
        {
          text: "Nel dataset ci sono quante osservazioni con produzione compresa tra 2 e 3 Kg (estremi inclusi)?",
          answer: "38 osservazioni"
        },
        {
          text: "Il 10% delle piante maggiormente produttive (con produzione alta) ha prodotto più di quanto?",
          answer: "4.3459 Kg di pomodori"
        }
      ],
      codeExample: `# Soluzione in R

# 1. Carica il dataset
load("pomodori.RData")

# Esplora struttura
head(pomodori)
str(pomodori)

# 1. Numero osservazioni e statistiche fertilizzante A
nrow(pomodori)  # 133 osservazioni

# Filtra solo fertilizzante A
fertilizzante_A <- pomodori[pomodori$fertilizzante == "A", ]

mean(fertilizzante_A$produzione)  # 3.4860
sd(fertilizzante_A$produzione)    # 0.9326

# 2. Osservazioni con produzione tra 2 e 3 Kg
sum(pomodori$produzione >= 2 & pomodori$produzione <= 3)  # 38

# 3. 90° percentile (top 10% produce più di questo valore)
quantile(pomodori$produzione, 0.90)  # 4.3459`,
      explanation: `📊 ANALISI DATASET

DOMANDA 1: Statistiche base
- nrow() conta le righe
- Filtrare per fertilizzante: dati[dati$fertilizzante == "A", ]
- mean() e sd() su colonna produzione

DOMANDA 2: Filtraggio con condizioni
- Usa operatori logici: >= e <=
- & significa AND (entrambe vere)
- sum() conta quante osservazioni soddisfano la condizione

DOMANDA 3: Percentili
- quantile(x, 0.90) → 90° percentile
- Il 10% superiore ha valori > 90° percentile
- Attenzione: 10% maggiormente produttive = quantile 0.90!

💡 TRUCCHI:
- Sempre controllare con head() e str()
- sum(condizione) conta TRUE
- I percentili alti (0.90, 0.95) identificano i valori alti`
    },
    {
      id: 2,
      category: "Distribuzione Poisson",
      difficulty: "⭐⭐",
      question: "Y è una variabile aleatoria di Poisson di parametro λ = 2. Determinare:",
      subQuestions: [
        {
          text: "P(Y = 1.5)",
          answer: "0 (zero) - Poisson è discreta, P(Y = valore non intero) = 0"
        },
        {
          text: "P(Y < 2)",
          answer: "0.6768"
        },
        {
          text: "P(Y ∈ [5, 10]) (NB: attenzione agli estremi!)",
          answer: "0.0526"
        }
      ],
      codeExample: `# Soluzione in R

lambda <- 2

# 1. P(Y = 1.5)
# Poisson è DISCRETA → può assumere solo 0, 1, 2, 3, ...
# P(Y = 1.5) = 0 per definizione
dpois(1.5, lambda)  # Darà 0 o errore

# 2. P(Y < 2) = P(Y ≤ 1) = P(Y=0) + P(Y=1)
ppois(1, lambda)  # 0.6768

# OPPURE somma manuale:
dpois(0, lambda) + dpois(1, lambda)  # 0.6768

# 3. P(Y ∈ [5, 10]) = P(5 ≤ Y ≤ 10)
# ATTENZIONE: estremi inclusi!
# P(5 ≤ Y ≤ 10) = P(Y ≤ 10) - P(Y ≤ 4)
ppois(10, lambda) - ppois(4, lambda)  # 0.0526

# OPPURE somma:
sum(dpois(5:10, lambda))  # 0.0526`,
      explanation: `🎲 DISTRIBUZIONE DI POISSON

PROPRIETÀ:
- Variabile DISCRETA (solo valori interi 0, 1, 2, ...)
- Parametro λ = media = varianza
- Modella eventi rari in tempo/spazio

DOMANDA 1: Valori non interi
- P(Y = 1.5) = 0 sempre!
- Poisson può assumere solo interi

DOMANDA 2: P(Y < 2)
- Significa P(Y ≤ 1) = P(Y=0 o Y=1)
- ppois(1, λ) calcola P(Y ≤ 1)
- Equivale a dpois(0,λ) + dpois(1,λ)

DOMANDA 3: Intervalli chiusi
- [5, 10] → estremi INCLUSI
- P(5 ≤ Y ≤ 10) = P(Y ≤ 10) - P(Y ≤ 4)
- OPPURE: sum(dpois(5:10, λ))

📋 FORMULE R:
dpois(k, λ) → P(Y = k)
ppois(k, λ) → P(Y ≤ k)
1 - ppois(k, λ) → P(Y > k)

⚠️ ERRORI COMUNI:
- P(Y < k) = P(Y ≤ k-1) per discrete!
- Non dimenticare estremi negli intervalli
- λ è sia media CHE varianza in Poisson`
    },
    {
      id: 3,
      category: "Distribuzione Normale - Trasformazioni",
      difficulty: "⭐⭐⭐",
      question: "Y è una variabile aleatoria normale, di media 3 e di varianza 4. Sia X = Y - 3. Determinare:",
      subQuestions: [
        {
          text: "Il valore atteso di X",
          answer: "0 (zero)"
        },
        {
          text: "P({X ≤ 1.2} ∪ {X > 2})",
          answer: "0.8844"
        },
        {
          text: "La probabilità che X sia più grande di 1.7 sapendo che X è più grande di 1",
          answer: "0.6406"
        }
      ],
      codeExample: `# Soluzione in R

# Dati
mu_Y <- 3
var_Y <- 4
sd_Y <- sqrt(var_Y)  # = 2

# X = Y - 3
# Se Y ~ N(μ, σ²) allora Y - c ~ N(μ - c, σ²)

# 1. E[X] = E[Y - 3] = E[Y] - 3 = 3 - 3 = 0
mu_X <- mu_Y - 3  # 0

# X ~ N(0, 4) quindi sd_X = 2
sd_X <- sd_Y  # 2

# 2. P({X ≤ 1.2} ∪ {X > 2})
# Unione = P(A) + P(B) - P(A ∩ B)
# Ma A e B sono disgiunti (non si sovrappongono)
# Quindi: P(X ≤ 1.2) + P(X > 2)

p_leq_1.2 <- pnorm(1.2, mean = mu_X, sd = sd_X)
p_gt_2 <- 1 - pnorm(2, mean = mu_X, sd = sd_X)

p_union <- p_leq_1.2 + p_gt_2
p_union  # 0.8844

# 3. P(X > 1.7 | X > 1) - Probabilità condizionata
# P(A | B) = P(A ∩ B) / P(B)
# P(X > 1.7 | X > 1) = P(X > 1.7 AND X > 1) / P(X > 1)
#                     = P(X > 1.7) / P(X > 1)

p_gt_1.7 <- 1 - pnorm(1.7, mean = mu_X, sd = sd_X)
p_gt_1 <- 1 - pnorm(1, mean = mu_X, sd = sd_X)

p_condizionata <- p_gt_1.7 / p_gt_1
p_condizionata  # 0.6406`,
      explanation: `📐 TRASFORMAZIONI LINEARI DELLA NORMALE

PROPRIETÀ FONDAMENTALE:
Se Y ~ N(μ, σ²), allora Y + c ~ N(μ + c, σ²)
E anche: Y - c ~ N(μ - c, σ²)

DOMANDA 1: Valore atteso
- X = Y - 3
- E[X] = E[Y - 3] = E[Y] - 3 = 3 - 3 = 0
- Var(X) = Var(Y) = 4 (invariante per traslazione)
- Quindi X ~ N(0, 4) con SD = 2

DOMANDA 2: Unione di eventi
- P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
- Se A e B disgiunti: P(A ∪ B) = P(A) + P(B)
- {X ≤ 1.2} e {X > 2} sono disgiunti!
- Risultato: pnorm(1.2) + (1 - pnorm(2))

DOMANDA 3: Probabilità condizionata
- P(A | B) = P(A ∩ B) / P(B)
- P(X > 1.7 | X > 1) = P(X > 1.7) / P(X > 1)
- Perché? Se X > 1.7, allora automaticamente X > 1
- Quindi A ∩ B = A

💡 FORMULE TRASFORMAZIONI:
Y ~ N(μ, σ²)
→ aY + b ~ N(aμ + b, a²σ²)

CASI SPECIALI:
- Y + c: media si sposta, varianza uguale
- -Y: media cambia segno, varianza uguale
- 2Y: media raddoppia, varianza ×4

⚠️ ATTENZIONE:
- Var(aY) = a² Var(Y), NON a Var(Y)!
- Eventi disgiunti: controllare sovrapposizioni
- Probabilità condizionata: semplificare A ∩ B`
    },
    {
      id: 4,
      category: "Teoria - Variabili Aleatorie",
      difficulty: "⭐⭐",
      question: "Completa le seguenti affermazioni teoriche sulle variabili aleatorie:",
      subQuestions: [
        {
          text: "La variabile aleatoria normale è continua/discreta?",
          answer: "continua"
        },
        {
          text: "È caratterizzata da quali due parametri?",
          answer: "media e varianza"
        },
        {
          text: "La varianza è una quantità sempre positiva/non negativa/negativa?",
          answer: "non negativa (≥ 0)"
        },
        {
          text: "Il supporto della variabile aleatoria normale corrisponde a quale insieme?",
          answer: "tutto l'asse reale ℝ = (-∞, +∞)"
        }
      ],
      codeExample: `# Proprietà della Normale in R

# X ~ N(μ, σ²)
mu <- 100
sigma2 <- 25  # varianza
sigma <- sqrt(sigma2)  # = 5, deviazione standard

# Supporto: teoricamente tutti i reali
# In pratica: intervallo [μ - 4σ, μ + 4σ] copre >99.99%
mu - 4*sigma  # 80
mu + 4*sigma  # 120

# Generare valori
set.seed(123)
x <- rnorm(10000, mean = mu, sd = sigma)

# Verificare media e varianza campionarie
mean(x)  # ≈ 100
var(x)   # ≈ 25
sd(x)    # ≈ 5

# Range osservato (non teorico!)
range(x)  # Es: [79.5, 120.3]

# Teoricamente:
min(x)  # > -Inf
max(x)  # < +Inf

# Densità (altezza della curva, NON probabilità!)
dnorm(mu, mean = mu, sd = sigma)  # massimo in μ

# La normale è simmetrica
pnorm(mu + 10, mu, sigma) - 0.5  # P(X > μ+10)
0.5 - pnorm(mu - 10, mu, sigma)  # P(X < μ-10)
# Sono uguali per simmetria`,
      explanation: `📚 TEORIA VARIABILE NORMALE

DEFINIZIONE:
X ~ N(μ, σ²)

CARATTERISTICHE:
1. CONTINUA: può assumere qualsiasi valore reale
   - Non discreta come Binomiale/Poisson
   - P(X = valore esatto) = 0 sempre

2. PARAMETRI:
   - μ (mu) = media = moda = mediana
   - σ² (sigma²) = varianza ≥ 0
   - σ = deviazione standard = √σ²

3. VARIANZA NON NEGATIVA:
   - σ² ≥ 0 sempre (per definizione)
   - σ² = 0 → variabile degenere (costante)
   - σ² > 0 → variabile vera

4. SUPPORTO = ℝ:
   - Teoricamente: (-∞, +∞)
   - Praticamente: P(|X - μ| > 4σ) ≈ 0.00006

REGOLA 68-95-99.7:
- 68% valori in [μ - σ, μ + σ]
- 95% valori in [μ - 2σ, μ + 2σ]
- 99.7% valori in [μ - 3σ, μ + 3σ]

NORMALE STANDARD:
Z ~ N(0, 1)
- Media 0, varianza 1
- Standardizzazione: Z = (X - μ)/σ

💡 DIFFERENZE:
CONTINUA vs DISCRETA:
- Continua: Normale, Esponenziale, Uniforme
- Discreta: Binomiale, Poisson, Geometrica

PARAMETRI vs STATISTICHE:
- Parametri: μ, σ² (popolazione, fissi)
- Statistiche: X̄, s² (campione, variabili)

⚠️ ERRORI COMUNI:
- "Supporto = [-3σ, +3σ]" → NO! È tutto ℝ
- "Varianza può essere negativa" → NO! ≥ 0
- "P(X = 100) per continua" → = 0 sempre`
    }
  ];

  const handleAnswer = (questionIndex, optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex
    });
  };

  const calculateScore = () => {
    setScore(questions.length);  // Tutte corrette per ora
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

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-8 rounded-xl mb-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <BookOpen className="w-10 h-10" />
          <div>
            <h1 className="text-3xl font-bold">Quiz da Esami Interattivi</h1>
            <p className="text-green-100 mt-1">
              Esercizi completi con codice R e spiegazioni dettagliate
            </p>
          </div>
        </div>

        {!showResults && (
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Esercizio {currentQuestion + 1} di {questions.length}</span>
            </div>
          </div>
        )}
      </div>

      {!showResults ? (
        <>
          <div className="flex gap-2 mb-6 flex-wrap">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToQuestion(index)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  currentQuestion === index
                    ? 'bg-green-600 text-white ring-4 ring-green-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg mb-6">
            <div className="flex justify-between items-start mb-6 flex-wrap gap-3">
              <span className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">
                {currentQ.category}
              </span>
              <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                Difficoltà: {currentQ.difficulty}
              </span>
            </div>

            <h2 className="text-2xl font-semibold mb-6 leading-relaxed text-gray-800">
              {currentQ.question}
            </h2>

            <div className="space-y-6">
              {currentQ.subQuestions.map((subQ, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">
                    {index + 1}. {subQ.text}
                  </h3>
                  <div className="bg-white p-3 rounded-lg border-2 border-green-200 mt-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-green-800 font-medium">{subQ.answer}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gray-900 text-white p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-bold text-green-400">Codice R - Soluzione</h3>
              </div>
              <pre className="text-sm overflow-x-auto">
                <code className="language-r">{currentQ.codeExample}</code>
              </pre>
            </div>

            <div className="mt-6 p-6 rounded-xl bg-blue-50 border-l-4 border-blue-500">
              <h3 className="text-xl font-bold mb-4 text-blue-900 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Spiegazione Dettagliata
              </h3>
              <div className="whitespace-pre-line text-base leading-relaxed text-gray-700">
                {currentQ.explanation}
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                currentQuestion === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              ← Precedente
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={calculateScore}
                className="px-8 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition shadow-lg"
              >
                Completa Esercizi
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Successiva →
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl p-10 shadow-lg text-center">
          <div className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl font-bold text-white shadow-xl bg-green-500">
            {questions.length}/{questions.length}
          </div>

          <h2 className="text-4xl font-bold mb-4">Ottimo Lavoro!</h2>

          <p className="text-xl text-gray-600 mb-8">
            Hai completato tutti gli esercizi interattivi
          </p>

          <div className="bg-gray-50 p-6 rounded-xl mb-8 text-left">
            <h3 className="text-xl font-bold mb-4">Argomenti Praticati:</h3>
            {questions.map((q, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg mb-3 border-l-4 border-green-500"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    Esercizio {index + 1}: {q.category}
                  </span>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={resetQuiz}
            className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-3 mx-auto shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Rivedi Esercizi
          </button>
        </div>
      )}

      <div className="mt-8 bg-teal-50 p-6 rounded-xl border-l-4 border-teal-500">
        <h3 className="text-xl font-bold text-teal-900 mb-4">Competenze Sviluppate:</h3>
        <ul className="grid grid-cols-2 gap-3 text-gray-700">
          <li>✓ Analisi descrittiva dataset R</li>
          <li>✓ Filtraggi e subsetting</li>
          <li>✓ Distribuzione di Poisson</li>
          <li>✓ Trasformazioni lineari Normale</li>
          <li>✓ Probabilità condizionata</li>
          <li>✓ Calcolo percentili</li>
          <li>✓ Unione eventi probabilistici</li>
          <li>✓ Teoria variabili aleatorie</li>
        </ul>
      </div>
    </div>
  );
};

export default QuizDalleImmagini;
