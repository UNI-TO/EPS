import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, RotateCcw, BookOpen } from 'lucide-react';

const QuizFebbraio2025 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      category: "Normale - Esame 12 Feb 2025",
      difficulty: "⭐⭐",
      question: "X ~ N(μ=2, σ²=1). Calcola P(X > 1.9).",
      options: [
        "pnorm(1.9, 2, 1)",
        "1 - pnorm(1.9, 2, 1)",
        "pnorm(2, 1.9, 1)",
        "1 - pnorm(2, 1.9, 1)"
      ],
      correct: 1,
      explanation: `✅ SOLUZIONE CORRETTA: opzione 2

P(X > 1.9) = 1 - P(X ≤ 1.9)

CODICE R:
> 1 - pnorm(1.9, 2, 1)
[1] 0.5398

📌 ATTENZIONE:
- pnorm() calcola P(X ≤ x)
- Per P(X > x) serve 1 - pnorm()
- Parametri: pnorm(valore, media, sd)

VERIFICA:
> pnorm(1.9, 2, 1)
[1] 0.4602

Quindi P(X > 1.9) = 1 - 0.4602 = 0.5398 ✓`
    },
    {
      id: 2,
      category: "Poisson Condizionata - Esame 12 Feb 2025",
      difficulty: "⭐⭐⭐⭐",
      question: "X ~ Poisson(λ=1). Calcola P(X ∈ {1,2,3,4} | X > 0).",
      options: [
        "ppois(4, 1) - ppois(0, 1)",
        "(ppois(4,1) - dpois(0,1)) / (1 - dpois(0,1))",
        "ppois(4, 1) / (1 - dpois(0, 1))",
        "1 - ppois(4, 1)"
      ],
      correct: 1,
      explanation: `✅ SOLUZIONE CORRETTA: opzione 2

FORMULA:
P(X ∈ {1,2,3,4} | X > 0) = P(X ∈ {1,2,3,4} ∩ X > 0) / P(X > 0)

PASSO PER PASSO:

1. Numeratore:
   P(X ∈ {1,2,3,4} ∩ X > 0) = P(X ∈ {1,2,3,4})
   = P(X ≤ 4) - P(X = 0)
   = ppois(4, 1) - dpois(0, 1)

2. Denominatore:
   P(X > 0) = 1 - P(X = 0) = 1 - dpois(0, 1)

3. Risultato:
   (ppois(4,1) - dpois(0,1)) / (1 - dpois(0,1))

CODICE R:
> (ppois(4,1) - dpois(0,1)) / (1 - dpois(0,1))
[1] 0.9942

ALTERNATIVA (più lungo ma chiaro):
> (dpois(1,1) + dpois(2,1) + dpois(3,1) + dpois(4,1)) / (1-dpois(0,1))
[1] 0.9942

📌 CONCETTO:
Il condizionamento su X>0 esclude solo X=0,
quindi l'insieme {1,2,3,4} è già dentro X>0!`
    },
    {
      id: 3,
      category: "Chi-quadro Bontà del Fit - Esame 12 Feb 2025",
      difficulty: "⭐⭐⭐",
      question: "In un ristorante hai 319 osservazioni su tipologia piatto (carne/pesce/vegetariano). Vuoi testare se i tre tipi hanno stessa probabilità (p=1/3). Quale test?",
      options: [
        "Test chi-quadro per l'indipendenza",
        "Test chi-quadro per bontà del fit con H_0: p_carne = p_pesce = p_veg = 1/3",
        "Test t per differenza di medie",
        "Test per proporzioni con binom.test()"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: opzione 2

TEST CHI-QUADRO PER BONTÀ DEL FIT

📌 QUANDO USARLO:
- Hai 1 variabile categoriale con k categorie
- Vuoi testare se segue una distribuzione specificata

IPOTESI:
H_0: la variabile ha distribuzione p_1=p_2=p_3=1/3
H_1: la variabile non ha la distribuzione indicata

CODICE R COMPLETO:
load("ristorante.RData")

# Analisi descrittiva
nrow(ristorante)  # 319 osservazioni

# Caso mancante
which(is.na(ristorante), arr.ind=TRUE)

# Frequenze
table(ristorante$categoria_piatto)

# Test bontà del fit
test <- chisq.test(table(ristorante$categoria_piatto),
                   p = rep(1/3, 3))

test$p.value      # 0 (< 0.01)
test$expected     # Tutte = 106.33

📊 INTERPRETAZIONE:
p-value = 0 < 0.01 → RIFIUTO H0
La variabile categoria_piatto NON ha distribuzione
uniforme (p_1 = p_2 = p_3 = 1/3)

⚠️ DIFFERENZA CON TEST INDIPENDENZA:
- Bontà del fit: 1 variabile vs distribuzione teorica
- Indipendenza: 2 variabili, relazione tra loro

✅ REGOLA DI COCHRAN:
Tutte le freq. attese >= 5 → test affidabile!`
    },
    {
      id: 4,
      category: "Test Proporzione - Esame 12 Feb 2025",
      difficulty: "⭐⭐⭐",
      question: "In 96 pezzi prodotti, 51 sono non conformi (proporzione 0.5313). Tra i non conformi, 29 hanno difetto estetico. Vuoi testare se meno del 50% dei non conformi ha difetto estetico. Con p-value non significativo, cosa concludi?",
      options: [
        "Posso affermare che meno del 50% ha difetto estetico",
        "Nessuna conclusione valida",
        "Posso affermare che più del 50% ha difetto estetico",
        "Posso affermare che esattamente il 50% ha difetto estetico"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: opzione 2

TEST PER PROPORZIONE:

IPOTESI:
H_0: p = 0.5 (50% ha difetto estetico)
H_1: p < 0.5 (meno del 50%)

CODICE R:
load("pezzi.RData")

# Analisi
table(pezzi)
# Output:
#          Estetico Nessuno Strutturale
# Conforme      10      22          13
# Non conforme  22       0          29

# Solo pezzi non conformi: 51 totali
# Difetti estetici: 22

# Test
test <- binom.test(22, 51, p=0.5, alternative="less")
test$p.value  # Non significativo (>0.01)

📊 INTERPRETAZIONE CON α=0.01:
p-value > 0.01 → NON POSSO RIFIUTARE H0

CONCLUSIONE CORRETTA:
"Nessuna affermazione è vera"

Perché?
- NON posso dire "meno del 50%" (H1 non confermata)
- NON posso dire "più del 50%" (non testato)
- NON posso dire "esattamente 50%" (non "accetto" H0)

📌 REGOLA D'ORO:
Quando NON rifiuto H0, posso solo dire:
"Non c'è sufficiente evidenza per rifiutare H0"

⚠️ MAI DIRE "Accetto H0" !!!`
    },
    {
      id: 5,
      category: "Teoria P-value - Esame 12 Feb 2025",
      difficulty: "⭐⭐",
      question: "Completa: 'Quando svolgo un test di ipotesi calcolo ___. Il p-value è ___ che, supponendo che l'ipotesi ___ sia vera, la ___ assuma valori pari a quelli campionari o più estremi. Se il p-value è ___ della ___, allora rifiuto l'ipotesi ___.'",
      options: [
        "una verosimiglianza / quantità pivotale / alternativa / statistica / maggiore / confidenza / alternativa",
        "un p-value / la probabilità / nulla / statistica del test / minore / significatività / nulla",
        "un intervallo / quantità pivotale / nulla / media / uguale / significatività / alternativa",
        "un p-value / la probabilità / maggiore / verosimiglianza / minore / confidenza / nulla"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: opzione 2

"Quando svolgo un test di ipotesi calcolo UN P-VALUE.
Il p-value è LA PROBABILITÀ che, supponendo che
l'ipotesi NULLA sia vera, la STATISTICA DEL TEST
assuma valori pari a quelli campionari o più estremi.
Se il p-value è MINORE della SIGNIFICATIVITÀ,
allora rifiuto l'ipotesi NULLA."

📚 DEFINIZIONE FORMALE P-VALUE:

Il p-value è la probabilità di osservare dati
altrettanto o più estremi di quelli osservati,
ASSUMENDO CHE H_0 SIA VERA.

🎯 INTERPRETAZIONE:

p-value PICCOLO → dati incompatibili con H0 → rifiuto H0
p-value GRANDE → dati compatibili con H0 → non rifiuto H0

📊 REGOLA DECISIONALE:

Se p-value < α (significatività) → RIFIUTO H0
Se p-value ≥ α → NON RIFIUTO H0

ESEMPI:
• α = 0.05, p-value = 0.03 → Rifiuto H0
• α = 0.01, p-value = 0.03 → Non rifiuto H0
• α = 0.05, p-value = 0.001 → Forte evidenza contro H0

⚠️ COSA NON È IL P-VALUE:
- NON è P(H0 è vera)
- NON è P(H1 è vera)
- NON è la probabilità di errore

📌 CONCETTI CHIAVE:
- Statistica del test: funzione dei dati (t, chi², z, ecc.)
- Significatività α: soglia scelta a priori (0.05, 0.01)
- H0: ipotesi nulla da testare`
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
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-8 rounded-xl mb-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <BookOpen className="w-10 h-10" />
          <div>
            <h1 className="text-3xl font-bold">Esame 12 Febbraio 2025 - Turno 1</h1>
            <p className="text-pink-100 mt-1">
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
                      ? 'bg-pink-600 text-white ring-4 ring-pink-200'
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
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 bg-white hover:border-pink-300 hover:bg-gray-50'
                    } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        showCorrect
                          ? 'bg-green-500 text-white'
                          : showWrong
                          ? 'bg-red-500 text-white'
                          : selected
                          ? 'bg-pink-600 text-white'
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
                  : 'bg-pink-600 text-white hover:bg-pink-700'
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
                className="px-6 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition"
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
            className="px-8 py-4 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition flex items-center gap-3 mx-auto shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Ricomincia Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizFebbraio2025;
