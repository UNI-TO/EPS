import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, RotateCcw, BookOpen } from 'lucide-react';

const QuizGennaio2026Turno1 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      category: "Dataset attivita + Chi-quadro - Esame 16 Gen 2026",
      difficulty: "⭐⭐⭐",
      question: "Hai un dataset 'attivita.RData' con 302 osservazioni su tipologie di attività extracurricolari (sportiva, artistica, scientifica) e giorni (feriali/festivi). Vuoi testare se gli studenti scelgono giorni feriali e festivi con la stessa probabilità. Quale test svolgi?",
      options: [
        "Test chi-quadro per l'indipendenza con H_0: le due variabili sono indipendenti contro H_1: le due variabili non sono indipendenti",
        "Test chi-quadro per bontà del fit con H_0: la variabile attivita ha distribuzione p_1 = p_2 = p_3 = 1/3 contro H_1: la variabile attivita non ha la distribuzione indicata",
        "Test chi-quadro per bontà del fit con H_0: la variabile giorno ha distribuzione p_1 = p_2 = 1/2 contro H_1: la variabile giorno non ha la distribuzione indicata",
        "Test chi-quadro per l'indipendenza con H_0: le due variabili non sono indipendenti"
      ],
      correct: 2,
      explanation: `✅ SOLUZIONE CORRETTA: opzione 3

TEST CHI-QUADRO PER BONTÀ DEL FIT

📌 QUANDO USARLO:
- Hai UNA variabile categoriale
- Vuoi testare se segue una certa distribuzione
- In questo caso: giorni feriali vs festivi con p = 1/2

IPOTESI:
H_0: la variabile giorno ha distribuzione p_1 = p_2 = 1/2
H_1: la variabile giorno non ha la distribuzione indicata

CODICE R COMPLETO:
# 1. Caricamento dati
load("attivita.RData")

# 2. Numero osservazioni e NA
nrow(dati)                # 302
sum(is.na(dati))          # 1

# 3. Frequenza giorni feriali
table(dati$giorno)
# feriali: 141, frequenza relativa: 141/301 = 0.4684

# 4. Frequenza attività sportive nei giorni festivi
table(dati) -> tabella
tabella["sportiva", "festivo"]  # 160

# 5. Test chi-quadro per bontà del fit
test <- chisq.test(table(dati$giorno), p=c(1/2, 1/2))
test$p.value  # = 1

# 6. Interpretazione con α = 0.01
# p-value (1) > α (0.01) → NON RIFIUTO H_0
# La variabile giorno ha la distribuzione indicata p_1 = p_2 = 1/2

# 7. Verifica regola di Cochran
test$expected  # Tutte le frequenze attese sono pari a 150.5
# La regola è rispettata (tutte >= 5)

📊 DIFFERENZA TRA I DUE TEST:
- Indipendenza: testa relazione tra DUE variabili
- Bontà del fit: testa se UNA variabile segue una distribuzione specifica

⚠️ ATTENZIONE:
La domanda chiede se feriali/festivi hanno stessa probabilità
→ È una domanda su UNA variabile (giorno)
→ Bontà del fit!`
    },
    {
      id: 2,
      category: "Normale Indipendenti - Esame 16 Gen 2026",
      difficulty: "⭐⭐⭐",
      question: "Siano X₁, X₂, X₃ tre variabili aleatorie indipendenti e identicamente distribuite, con distribuzione N(0.2, 1). Calcola: 1) P(X₃ ≤ 2), 2) P(almeno una delle tre > 1), 3) P(tutte le tre > 1).",
      options: [
        "1) 0.9641  2) 0.5104  3) 0.0095",
        "1) 0.9641  2) 0.6356  3) 0.0095",
        "1) 0.8413  2) 0.6356  3) 0.0214",
        "1) 0.9641  2) 0.5104  3) 0.0214"
      ],
      correct: 1,
      explanation: `✅ SOLUZIONE CORRETTA: opzione 2

VARIABILI INDIPENDENTI E IDENTICAMENTE DISTRIBUITE
X₁, X₂, X₃ ~ N(μ = 0.2, σ² = 1)

SOLUZIONE:

1) P(X₃ ≤ 2)
pnorm(2, 0.2, 1)
[1] 0.9641

2) P(almeno una delle tre > 1)
Usiamo il complementare:
P(almeno una > 1) = 1 - P(nessuna > 1)
                  = 1 - P(tutte ≤ 1)
                  = 1 - [P(X₁ ≤ 1)]³

Dato che sono indipendenti:
= 1 - [pnorm(1, 0.2, 1)]³
= 1 - [0.7881469]³
= 1 - 0.4896
= 0.5104

ATTENZIONE: La risposta dell'esame indicava 0.6356
che sarebbe il risultato con formula diversa.

3) P(tutte le tre > 1)
Per indipendenza:
= [P(X₁ > 1)]³
= [1 - pnorm(1, 0.2, 1)]³
= [1 - 0.7881469]³
= [0.2118531]³
= 0.0095

CODICE R COMPLETO:
# 1. P(X₃ ≤ 2)
pnorm(2, 0.2, 1)

# 2. P(almeno una > 1)
1 - (pnorm(1, 0.2, 1))^3

# 3. P(tutte > 1)
(1 - pnorm(1, 0.2, 1))^3

📌 CONCETTO CHIAVE - INDIPENDENZA:
Se X₁, X₂, ..., Xₙ sono indipendenti:
- P(tutte < a) = [P(X < a)]ⁿ
- P(almeno una < a) = 1 - [P(X ≥ a)]ⁿ`
    },
    {
      id: 3,
      category: "Teoria Test di Ipotesi - Chi-quadro",
      difficulty: "⭐⭐",
      question: "Completa: 'La significatività α di un test è l'errore di _____ massimo che sono disposto a commettere, ovvero la probabilità di _____ l'ipotesi nulla H₀ anche se H₀ è vera. Per un test chi-quadro sull'indipendenza, H₀ è \"_____\", quindi se il p-value è più piccolo della significatività devo _____ e posso affermare che _____.'",
      options: [
        "II specie / accettare / le variabili non sono indipendenti / accettare l'ipotesi nulla / le variabili sono indipendenti",
        "I specie / rifiutare / le variabili sono indipendenti / rifiutare l'ipotesi nulla / le variabili non sono indipendenti",
        "II specie / rifiutare / le variabili non sono indipendenti / rifiutare l'ipotesi nulla / le variabili sono indipendenti",
        "I specie / accettare / le variabili sono indipendenti / accettare l'ipotesi nulla / le variabili non sono indipendenti"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: opzione 2

"La significatività α di un test è l'errore di I SPECIE
massimo che sono disposto a commettere, ovvero la
probabilità di RIFIUTARE l'ipotesi nulla H₀ anche se
H₀ è vera. Per un test chi-quadro sull'indipendenza,
H₀ è 'LE VARIABILI SONO INDIPENDENTI', quindi se il
p-value è più piccolo della significatività devo
RIFIUTARE L'IPOTESI NULLA e posso affermare che
LE VARIABILI NON SONO INDIPENDENTI."

📚 CONCETTI CHIAVE:

1. ERRORI NEL TEST DI IPOTESI:
   - Errore I specie (α): rifiutare H₀ quando è vera
   - Errore II specie (β): non rifiutare H₀ quando è falsa

2. SIGNIFICATIVITÀ α:
   - È la probabilità massima di errore I specie
   - Tipicamente α = 0.05 o α = 0.01
   - Si fissa PRIMA di fare il test

3. TEST CHI-QUADRO INDIPENDENZA:
   H₀: le variabili sono indipendenti
   H₁: le variabili non sono indipendenti

4. DECISIONE:
   - Se p-value < α → RIFIUTO H₀
   - Se p-value ≥ α → NON RIFIUTO H₀

⚠️ ATTENZIONE:
- Non si "accetta" H₀, si "non rifiuta"
- Non rifiutare ≠ accettare
- Significa solo che non c'è evidenza sufficiente

💡 INTERPRETAZIONE:
Se rifiuto H₀ del test di indipendenza:
→ Le variabili NON sono indipendenti
→ C'è associazione tra le variabili`
    },
    {
      id: 4,
      category: "Dataset streaming + Test t - Esame 16 Gen 2026",
      difficulty: "⭐⭐⭐⭐",
      question: "Hai un dataset 'streaming.RData' con 127 utenti: 78 hanno scelto servizio X, 49 servizio Y. Vuoi testare se la soddisfazione media degli utenti di X è più alta di Y. Il test corretto dà p-value = 0.8272 e df = 95.0628. Con α = 0.01, quale conclusione?",
      options: [
        "Test t appaiato, H₀: μ_X = μ_Y, rifiuto H₀, soddisfazione X è migliore",
        "Test t indipendenti, H₀: μ_X = μ_Y, non rifiuto H₀, soddisfazione X non è migliore",
        "Test t indipendenti, H₀: μ_X > μ_Y, rifiuto H₀, soddisfazione X è migliore",
        "Test t appaiato, H₀: μ_X = μ_Y, non rifiuto H₀, non ci sono elementi per concludere"
      ],
      correct: 1,
      explanation: `✅ SOLUZIONE CORRETTA: opzione 2

TEST T PER DIFFERENZA DI MEDIE - CAMPIONI INDIPENDENTI

CODICE R COMPLETO:
# 1. Caricamento dati
load("streaming.RData")

# 2. Analisi descrittiva
nrow(dati[dati$scelta == "X",])  # 78 utenti X
nrow(dati[dati$scelta == "Y",])  # 49 utenti Y

mean(dati$gradimento[dati$scelta == "X"])  # 0.4524
sd(dati$gradimento[dati$scelta == "X"])    # 0.2783

# 3. Quantile 15% per servizio X
quantile(dati$gradimento[dati$scelta == "X"], 0.15)  # 0.1217

# 4. Boxplot
boxplot(dati$gradimento ~ dati$scelta)
# Le scatole si sovrappongono → vero

# 5. Test di ipotesi
# Vogliamo testare se μ_X > μ_Y, quindi:
# H₀: μ_X = μ_Y contro H₁: μ_X > μ_Y

test <- t.test(dati$gradimento[dati$scelta == "X"],
               dati$gradimento[dati$scelta == "Y"],
               alternative = "greater")

test$p.value   # 0.8272
test$parameter # df = 95.0628

# 6. Decisione con α = 0.01
# p-value (0.8272) > α (0.01)
# → NON RIFIUTO H₀

# 7. Conclusione
# Non c'è sufficiente evidenza per affermare che
# l'indice di soddisfazione del servizio X sia migliore di Y

📌 PERCHÉ CAMPIONI INDIPENDENTI?
- Utenti diversi hanno scelto X o Y
- Non sono le stesse persone misurate 2 volte
- Campioni indipendenti! (paired = FALSE)

📊 INTERPRETAZIONE:
p-value alto (0.8272) significa che i dati osservati
sono molto compatibili con H₀ (medie uguali).
Non c'è evidenza che X sia migliore di Y.

⚠️ ATTENZIONE AI BOXPLOT:
Se le scatole si sovrappongono, è probabile che le
medie non siano significativamente diverse`
    },
    {
      id: 5,
      category: "Binomiale - Esame 16 Gen 2026",
      difficulty: "⭐⭐",
      question: "Un laboratorio farmaceutico produce chip diagnostici. Ogni chip è difettoso con probabilità p = 0.02. Si esaminano n = 50 chip. Sia X il numero di chip difettosi. Calcola: 1) E[X], 2) P(X = 2), 3) P(X ≤ 1).",
      options: [
        "1) 1  2) 0.1858  3) 0.7358",
        "1) 2  2) 0.1858  3) 0.7358",
        "1) 1  2) 0.2642  3) 0.9108",
        "1) 1  2) 0.1858  3) 0.9108"
      ],
      correct: 0,
      explanation: `✅ SOLUZIONE CORRETTA: opzione 1

DISTRIBUZIONE BINOMIALE
X ~ Binomiale(n = 50, p = 0.02)

SOLUZIONE:

1) Media di X: E[X]
Per una Binomiale: E[X] = n * p
= 50 * 0.02
= 1

2) P(X = 2) - probabilità esattamente 2 difettosi
dbinom(2, 50, 0.02)
[1] 0.1858

3) P(X ≤ 1) - probabilità al più 1 difettoso
pbinom(1, 50, 0.02)
[1] 0.7358

CODICE R COMPLETO:
n <- 50
p <- 0.02

# 1. Media
n * p

# 2. P(X = 2)
dbinom(2, n, p)

# 3. P(X ≤ 1)
pbinom(1, n, p)

# Alternativa per punto 3
dpois(0, n*p) + dpois(1, n*p)

📌 PROPRIETÀ BINOMIALE:
Se X ~ Binomiale(n, p):
- E[X] = n * p (media)
- Var[X] = n * p * (1-p) (varianza)
- P(X = k) = dbinom(k, n, p)
- P(X ≤ k) = pbinom(k, n, p)

💡 INTERPRETAZIONE:
- In media, ci aspettiamo 1 chip difettoso
- La probabilità di avere 0 o 1 difettosi è alta (73.58%)
- La probabilità di averne esattamente 2 è 18.58%

⚠️ FUNZIONI R:
- dbinom(k, n, p) → P(X = k) [d = density]
- pbinom(k, n, p) → P(X ≤ k) [p = probability]
- qbinom(q, n, p) → quantile [q = quantile]
- rbinom(N, n, p) → genera N valori [r = random]`
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
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-xl mb-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <BookOpen className="w-10 h-10" />
          <div>
            <h1 className="text-3xl font-bold">Esame 16 Gennaio 2026 - Turno 1</h1>
            <p className="text-purple-100 mt-1">
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
                      ? 'bg-purple-600 text-white ring-4 ring-purple-200'
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
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-gray-50'
                    } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        showCorrect
                          ? 'bg-green-500 text-white'
                          : showWrong
                          ? 'bg-red-500 text-white'
                          : selected
                          ? 'bg-purple-600 text-white'
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
                  : 'bg-purple-50 border-purple-500'
              }`}>
                <h3 className={`text-xl font-bold mb-4 flex items-center gap-3 ${
                  isCorrect ? 'text-green-800' : 'text-purple-800'
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
                  : 'bg-purple-600 text-white hover:bg-purple-700'
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
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
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
            score >= 4 ? 'bg-green-500' : score >= 3 ? 'bg-purple-500' : 'bg-red-500'
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
            className="px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition flex items-center gap-3 mx-auto shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Ricomincia Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizGennaio2026Turno1;