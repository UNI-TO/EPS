import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, RotateCcw, BookOpen } from 'lucide-react';

const QuizDistribuzioniDiscrete = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      category: "Poisson - Base",
      difficulty: "⭐⭐",
      question: "X ~ Poisson(λ=3). Calcola P(X = 2). Quale comando R?",
      options: [
        "ppois(2, lambda=3)",
        "dpois(2, lambda=3)",
        "qpois(2, lambda=3)",
        "rpois(2, lambda=3)"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: dpois(2, lambda=3)

📊 FUNZIONI POISSON IN R:

dpois(k, lambda) → P(X = k)  [density/mass]
ppois(k, lambda) → P(X ≤ k)  [cumulative]
qpois(p, lambda) → k tale che P(X ≤ k) = p
rpois(n, lambda) → genera n valori casuali

💻 CALCOLO:

lambda <- 3

# P(X = 2)
dpois(2, lambda)  # 0.2240

# Formula manuale
exp(-3) * 3^2 / factorial(2)  # 0.2240

📈 ALTRI CALCOLI:

# P(X ≤ 2) = P(X=0) + P(X=1) + P(X=2)
ppois(2, lambda)  # 0.4232
# Oppure:
sum(dpois(0:2, lambda))  # 0.4232

# P(X > 2) = 1 - P(X ≤ 2)
1 - ppois(2, lambda)  # 0.5768
ppois(2, lambda, lower.tail=FALSE)  # 0.5768

# P(X ≥ 2) = 1 - P(X ≤ 1)
1 - ppois(1, lambda)  # 0.8009`
    },
    {
      id: 2,
      category: "Binomiale - dbinom vs pbinom",
      difficulty: "⭐⭐",
      question: "Lanci una moneta 10 volte. P(esattamente 6 teste)?",
      options: [
        "dbinom(6, 10, 0.5)",
        "pbinom(6, 10, 0.5)",
        "1 - pbinom(6, 10, 0.5)",
        "qbinom(6, 10, 0.5)"
      ],
      correct: 0,
      explanation: `✅ RISPOSTA CORRETTA: dbinom(6, 10, 0.5)

📊 BINOMIALE: X ~ Bin(n, p)

dbinom(k, size=n, prob=p) → P(X = k) ESATTAMENTE
pbinom(k, n, p) → P(X ≤ k) AL MASSIMO

💻 CALCOLO:

n <- 10
p <- 0.5

# P(X = 6) esattamente 6 teste
dbinom(6, n, p)  # 0.2051

# Formula manuale
choose(10, 6) * 0.5^6 * 0.5^4  # 0.2051

📈 ALTRI ESEMPI:

# P(X ≤ 6) al massimo 6 teste
pbinom(6, n, p)  # 0.8281

# P(X > 6) più di 6 teste
1 - pbinom(6, n, p)  # 0.1719

# P(X ≥ 6) almeno 6 teste
1 - pbinom(5, n, p)  # 0.3770

# P(4 ≤ X ≤ 7) tra 4 e 7 inclusi
pbinom(7, n, p) - pbinom(3, n, p)  # 0.7734
# Oppure:
sum(dbinom(4:7, n, p))  # 0.7734

🔑 MEDIA E VARIANZA:
E[X] = np = 10 × 0.5 = 5
Var(X) = np(1-p) = 10 × 0.5 × 0.5 = 2.5`
    },
    {
      id: 3,
      category: "Geometrica - Offset R",
      difficulty: "⭐⭐⭐⭐",
      question: "Lanci dado fino al primo 6. P(serve esattamente 3 lanci)?",
      options: [
        "dgeom(3, prob=1/6)",
        "dgeom(2, prob=1/6)",
        "pgeom(3, prob=1/6)",
        "1 - pgeom(3, prob=1/6)"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: dgeom(2, prob=1/6)

⚠️ ATTENZIONE: R conta FALLIMENTI, non prove!

📊 DISTRIBUZIONE GEOMETRICA:

Y = numero di PROVE fino a successo
X = numero di FALLIMENTI prima del successo
X = Y - 1

In R: dgeom/pgeom usa X (fallimenti)!

💻 CALCOLO:

p <- 1/6

# Esattamente 3 lanci (Y = 3)
# → 2 fallimenti prima (X = 2)
dgeom(2, prob=p)  # 0.1157

# Formula: P(Y = k) = (1-p)^(k-1) × p
(1-p)^2 * p  # 0.1157

📈 PATTERN GENERALE:

P(Y = k prove) → dgeom(k-1, p)

Esempi:
# P(primo 6 al 1° lancio) Y=1
dgeom(0, p)  # 0.1667

# P(primo 6 al 5° lancio) Y=5
dgeom(4, p)  # 0.0804

# P(serve più di 10 lanci) Y>10
pgeom(9, p, lower.tail=FALSE)  # 0.1615
# Oppure: (1-p)^10 = 0.1615

🔑 FORMULE:
E[Y] = 1/p = 6 lanci medi
Var(Y) = (1-p)/p² = 30`
    },
    {
      id: 4,
      category: "Poisson - Somma",
      difficulty: "⭐⭐⭐",
      question: "Se X ~ Poisson(2) e Y ~ Poisson(3) indipendenti, quanto vale X+Y?",
      options: [
        "X + Y ~ Poisson(5)",
        "X + Y ~ Poisson(6)",
        "X + Y ~ Normale(5, 5)",
        "Non si può sommare"
      ],
      correct: 0,
      explanation: `✅ RISPOSTA CORRETTA: X + Y ~ Poisson(5)

📊 PROPRIETÀ ADDITIVA POISSON:

Se X ~ Poisson(λ₁) e Y ~ Poisson(λ₂) indipendenti:
X + Y ~ Poisson(λ₁ + λ₂)

Nel nostro caso:
X ~ Poisson(2), Y ~ Poisson(3)
→ X + Y ~ Poisson(2 + 3 = 5)

💻 VERIFICA CON SIMULAZIONE:

set.seed(123)
n <- 100000

X <- rpois(n, lambda=2)
Y <- rpois(n, lambda=3)
Z <- X + Y

# Media Z
mean(Z)  # ≈ 5 = 2 + 3 ✓

# Varianza Z
var(Z)   # ≈ 5 (per Poisson Var = λ) ✓

# Verifica distribuzione
hist(Z, breaks=20, prob=TRUE)
points(0:15, dpois(0:15, lambda=5),
       col="red", pch=19)

📈 APPLICAZIONI:

"In media arrivano 2 email/ora di lavoro
e 3 email/ora personali. Totale email/ora?"

Totale ~ Poisson(2 + 3 = 5)

# P(più di 7 email totali in 1h)
1 - ppois(7, lambda=5)  # 0.1334

🔑 PROPRIETÀ:
- Media: E[X+Y] = 2 + 3 = 5
- Varianza: Var(X+Y) = 2 + 3 = 5
- Per Poisson: E[X] = Var(X) = λ

⚠️ Vale solo per Poisson indipendenti!`
    },
    {
      id: 5,
      category: "Ipergeometrica - dhyper",
      difficulty: "⭐⭐⭐⭐",
      question: "Urna: 6 rosse, 4 blu. Estrai 3 senza reinserimento. P(esattamente 2 rosse)?",
      options: [
        "dbinom(2, 3, 6/10)",
        "dhyper(2, 6, 4, 3)",
        "dhyper(2, 3, 6, 4)",
        "dpois(2, lambda=1.8)"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: dhyper(2, 6, 4, 3)

📊 DISTRIBUZIONE IPERGEOMETRICA:

Campionamento SENZA reinserimento da
popolazione finita con due tipi di oggetti.

dhyper(x, m, n, k)
- x = numero successi desiderati
- m = successi in popolazione (rosse)
- n = insuccessi in popolazione (blu)
- k = dimensione campione

💻 CALCOLO:

# Urna: 6 rosse, 4 blu
# Estraggo: 3 palline
# Voglio: 2 rosse

dhyper(2, m=6, n=4, k=3)  # 0.5

# Formula manuale
choose(6,2) * choose(4,1) / choose(10,3)
# = 15 × 4 / 120 = 60/120 = 0.5

📈 TUTTI I CASI:

# P(0 rosse) = 3 blu
dhyper(0, 6, 4, 3)  # 0.0333

# P(1 rossa)
dhyper(1, 6, 4, 3)  # 0.3

# P(2 rosse) ← nostro caso
dhyper(2, 6, 4, 3)  # 0.5

# P(3 rosse)
dhyper(3, 6, 4, 3)  # 0.1667

# Verifica: somma = 1
sum(dhyper(0:3, 6, 4, 3))  # 1.0 ✓

# P(almeno 2 rosse)
sum(dhyper(2:3, 6, 4, 3))  # 0.6667
# Oppure:
1 - sum(dhyper(0:1, 6, 4, 3))

🔑 IPERGEOMETRICA VS BINOMIALE:

IPERGEOMETRICA:
- SENZA reinserimento
- Popolazione finita
- Probabilità cambia ad ogni estrazione

BINOMIALE:
- CON reinserimento (o pop. infinita)
- Probabilità costante
- Prove indipendenti

Se n/N < 0.05 (campione < 5% popolazione):
Ipergeometrica ≈ Binomiale

📊 MEDIA E VARIANZA:
E[X] = k × m/(m+n) = 3 × 6/10 = 1.8
Var(X) = k × (m/(m+n)) × (n/(m+n)) × ((m+n-k)/(m+n-1))
       = 3 × 0.6 × 0.4 × 7/9 = 0.56`
    },
    {
      id: 6,
      category: "Binomiale - Approssimazione Normale",
      difficulty: "⭐⭐⭐",
      question: "X ~ Bin(100, 0.3). Quando posso approssimare con Normale?",
      options: [
        "Sempre per n grande",
        "Se np ≥ 5 E n(1-p) ≥ 5",
        "Se n ≥ 30",
        "Mai, sono distribuzioni diverse"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: Se np ≥ 5 E n(1-p) ≥ 5

📊 APPROSSIMAZIONE NORMALE ALLA BINOMIALE:

CONDIZIONE:
np ≥ 5  E  n(1-p) ≥ 5

Se verificata:
X ~ Bin(n, p) ≈ N(np, np(1-p))

💻 VERIFICA NEL NOSTRO CASO:

n <- 100
p <- 0.3

# Verifica condizioni
np <- n * p  # 30 ≥ 5 ✓
n_1_p <- n * (1-p)  # 70 ≥ 5 ✓

# Posso approssimare!
mu <- n * p  # 30
sigma2 <- n * p * (1-p)  # 21
sigma <- sqrt(sigma2)  # 4.583

📈 CONFRONTO:

# P(X ≤ 35) con Binomiale (esatto)
pbinom(35, n, p)  # 0.8839

# P(X ≤ 35) con Normale (approx)
pnorm(35, mu, sigma)  # 0.8620

# Meglio con CORREZIONE CONTINUITÀ:
# P(X ≤ 35) ≈ P(Y ≤ 35.5)
pnorm(35.5, mu, sigma)  # 0.8849 ← più preciso!

🔑 CORREZIONE DI CONTINUITÀ:

Binomiale è discreta, Normale continua
→ Aggiusta mezzo punto

P(X = k) ≈ P(k-0.5 < Y < k+0.5)
P(X ≤ k) ≈ P(Y ≤ k+0.5)
P(X ≥ k) ≈ P(Y ≥ k-0.5)
P(X < k) ≈ P(Y < k-0.5)
P(X > k) ≈ P(Y > k+0.5)

📊 ESEMPIO COMPLETO:

# P(25 ≤ X ≤ 35)

# Esatto (Binomiale)
pbinom(35, n, p) - pbinom(24, n, p)  # 0.7579

# Approx senza correzione
pnorm(35, mu, sigma) - pnorm(25, mu, sigma)  # 0.7244

# Approx con correzione
pnorm(35.5, mu, sigma) - pnorm(24.5, mu, sigma)  # 0.7606
# Molto vicino all'esatto!

💡 QUANDO USARLA:
- n grande e calcoli Binomiali lenti
- Negli esami se richiesto
- Per IC e test ipotesi su proporzioni`
    },
    {
      id: 7,
      category: "Poisson - Approssimazione Binomiale",
      difficulty: "⭐⭐⭐⭐",
      question: "X ~ Bin(1000, 0.002). Quale approssimazione è migliore?",
      options: [
        "Normale(2, 1.996)",
        "Poisson(2)",
        "Esponenziale(1/2)",
        "Nessuna approssimazione valida"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: Poisson(2)

📊 APPROSSIMAZIONE POISSON ALLA BINOMIALE:

CONDIZIONI:
- n grande (>20)
- p piccolo (<0.05)
- λ = np moderato (<10)

Se verificate:
X ~ Bin(n, p) ≈ Poisson(λ = np)

💻 VERIFICA:

n <- 1000
p <- 0.002

# Verifica condizioni
n > 20  # ✓
p < 0.05  # ✓
lambda <- n * p  # 2 < 10 ✓

# Tutte soddisfatte!
# X ~ Bin(1000, 0.002) ≈ Poisson(2)

📈 CONFRONTO:

# P(X = 3)
dbinom(3, n, p)  # 0.1804 (esatto)
dpois(3, lambda)  # 0.1804 (eccellente!)

# P(X ≤ 5)
pbinom(5, n, p)  # 0.9834
ppois(5, lambda)  # 0.9834 (perfetto!)

⚠️ PERCHÉ NON NORMALE?

# Verifica condizioni Normale
np  # 2 < 5 ✗
n*(1-p)  # 998 ≥ 5 ✓

# Solo una condizione soddisfatta!
# Normale NON appropriata per p così piccolo

💡 APPLICAZIONI TIPICHE:

"Eventi rari in grande popolazione"

Esempi:
- Difetti in 1000 pezzi (p=0.001)
- Incidenti in 10000 voli (p=0.0002)
- Errori in 5000 transazioni (p=0.003)

📊 REGOLA PRATICA:

n grande, p piccolo, np moderato
→ Usa Poisson(np)

n grande, p moderato, np e n(1-p) ≥ 5
→ Usa Normale(np, np(1-p))

n piccolo
→ Usa Binomiale esatta

🔑 ESEMPIO COMPLETO:

# Fabbrica: 10000 pezzi, 0.1% difettosi
n <- 10000
p <- 0.001
lambda <- n * p  # 10

# P(più di 15 difetti)
# Binomiale esatta (lenta)
1 - pbinom(15, n, p)  # 0.0487

# Poisson (veloce, precisa)
1 - ppois(15, lambda)  # 0.0487 ✓`
    },
    {
      id: 8,
      category: "Confronto Distribuzioni",
      difficulty: "⭐⭐⭐⭐",
      question: "Quale distribuzione per: 'Numero clienti che arrivano in 1 ora, media 5/ora'?",
      options: [
        "Binomiale(n=?, p=5/n)",
        "Poisson(λ=5)",
        "Geometrica(p=1/5)",
        "Normale(5, 5)"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: Poisson(λ=5)

📊 QUANDO USARE POISSON:

CONTEGGIO di eventi RARI in:
- Tempo fisso
- Spazio fisso
- Volume fisso

con tasso medio λ costante

💡 CARATTERISTICHE SCENARIO:
✓ Conteggio eventi (arrivi)
✓ In tempo fisso (1 ora)
✓ Tasso medio noto (5/ora)
✓ Eventi indipendenti
→ POISSON!

💻 MODELLO:

X = numero arrivi in 1h
X ~ Poisson(λ = 5)

# P(esattamente 5 arrivi)
dpois(5, lambda=5)  # 0.1755

# P(meno di 3 arrivi)
ppois(2, lambda=5)  # 0.1247

# P(almeno 7 arrivi)
1 - ppois(6, lambda=5)  # 0.2378

📈 ESTENSIONI:

# In 2 ore: λ = 5 × 2 = 10
X₂ ~ Poisson(10)
dpois(8, lambda=10)  # P(8 in 2h)

# In 30 minuti: λ = 5 × 0.5 = 2.5
X₀.₅ ~ Poisson(2.5)
dpois(3, lambda=2.5)  # P(3 in 30min)

❌ PERCHÉ NON ALTRE?

BINOMIALE?
- Serve n (numero prove) fisso
- Qui n non è definito (arrivi illimitati)

GEOMETRICA?
- Modella prove FINO A successo
- Qui contiamo successi in tempo fisso

NORMALE?
- Per λ grande (>20) ok come approx
- Ma per λ=5 meglio Poisson

🔑 ALTRI ESEMPI POISSON:

✓ Chiamate call center/ora
✓ Errori per pagina documento
✓ Difetti per m² tessuto
✓ Incidenti per settimana
✓ Email ricevute al giorno
✓ Clienti che entrano in negozio/ora

📊 RELAZIONE CON ESPONENZIALE:

Se CONTEGGIO ~ Poisson(λ per unità)
allora TEMPO tra eventi ~ Exp(λ)

Esempio:
- N. arrivi in 1h ~ Poisson(5)
- Tempo tra arrivi ~ Exp(5/60 min⁻¹)

💡 VERIFICA ASSUNZIONI:

1. Eventi indipendenti?
2. Tasso costante nel tempo?
3. Un evento per volta?

Se tutte SÌ → Poisson appropriata`
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
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-xl mb-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <BookOpen className="w-10 h-10" />
          <div>
            <h1 className="text-3xl font-bold">Quiz Distribuzioni Discrete</h1>
            <p className="text-blue-100 mt-1">
              8 domande su Poisson, Binomiale, Geometrica e Ipergeometrica
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
          <div className="flex gap-2 mb-6 flex-wrap">
            {questions.map((_, index) => {
              const answered = selectedAnswers[index] !== undefined;
              return (
                <button
                  key={index}
                  onClick={() => goToQuestion(index)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    currentQuestion === index
                      ? 'bg-blue-600 text-white ring-4 ring-blue-200'
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
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50'
                    } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        showCorrect
                          ? 'bg-green-500 text-white'
                          : showWrong
                          ? 'bg-red-500 text-white'
                          : selected
                          ? 'bg-blue-600 text-white'
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
              </div>
            )}
          </div>

          <div className="flex justify-between gap-4">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                currentQuestion === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
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
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Successiva →
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl p-10 shadow-lg text-center">
          <div className={`w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl font-bold text-white shadow-xl ${
            score >= 6 ? 'bg-green-500' : score >= 4 ? 'bg-orange-500' : 'bg-red-500'
          }`}>
            {score}/{questions.length}
          </div>

          <h2 className="text-4xl font-bold mb-4">
            {score >= 6 ? '🎉 Ottimo lavoro!' :
             score >= 4 ? '👍 Buon risultato!' :
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
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-3 mx-auto shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Ricomincia Quiz
          </button>
        </div>
      )}

      <div className="mt-8 bg-indigo-50 p-6 rounded-xl border-l-4 border-indigo-500">
        <h3 className="text-xl font-bold text-indigo-900 mb-4">💡 Argomenti Trattati:</h3>
        <ul className="grid grid-cols-2 gap-3 text-gray-700">
          <li>✓ Poisson (dpois, ppois)</li>
          <li>✓ Binomiale (dbinom, pbinom)</li>
          <li>✓ Geometrica (offset R)</li>
          <li>✓ Somma Poisson</li>
          <li>✓ Ipergeometrica (dhyper)</li>
          <li>✓ Approx Normale-Binomiale</li>
          <li>✓ Approx Poisson-Binomiale</li>
          <li>✓ Scelta distribuzione corretta</li>
        </ul>
      </div>
    </div>
  );
};

export default QuizDistribuzioniDiscrete;
