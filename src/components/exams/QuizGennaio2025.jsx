import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, RotateCcw, BookOpen, Download } from 'lucide-react';

const QuizGennaio2025 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      category: "Chi-quadro Indipendenza - Esame 29 Gen 2025",
      difficulty: "⭐⭐⭐",
      question: "Hai un dataset 'nidi.RData' con 202 osservazioni su foresta primaria/secondaria e nidi occupati/non occupati. Vuoi testare se c'è associazione tra tipo di foresta e occupazione nidi. Quale test usi?",
      options: [
        "Test chi-quadro per l'indipendenza con H_0: le due variabili sono indipendenti",
        "Test chi-quadro per bontà del fit con H_0: p_1 = p_2 = 1/2",
        "Test t per differenza di medie",
        "Test chi-quadro con H_0: le due variabili non sono indipendenti"
      ],
      correct: 0,
      explanation: `✅ SOLUZIONE CORRETTA: opzione 1

TEST CHI-QUADRO PER L'INDIPENDENZA

📌 QUANDO USARLO:
- Hai 2 variabili categoriali
- Vuoi testare se sono indipendenti

IPOTESI:
H_0: le due variabili sono indipendenti
H_1: le due variabili non sono indipendenti

CODICE R:
# Caricamento dati
load("nidi.RData")

# Creare tabella di contingenza
table(nidi)

# Test chi-quadro
test <- chisq.test(table(nidi))
test$p.value  # Ottengo p-value = 0

# Verificare regola di Cochran
min(test$expected)  # Tutte freq. attese >= 5

📊 INTERPRETAZIONE:
p-value = 0 < 0.05 → Rifiuto H_0
Le due variabili NON sono indipendenti

⚠️ REGOLA DI COCHRAN:
Tutte le frequenze attese devono essere >= 5
Se violata, risultati non affidabili`
    },
    {
      id: 2,
      category: "Normale Condizionata - Esame 29 Gen 2025",
      difficulty: "⭐⭐⭐",
      question: "X ~ N(μ=1, σ²=1). Calcola P(X > 0.5 | X < 6), ovvero la probabilità che X sia maggiore di 0.5 sapendo che X è minore di 6.",
      options: [
        "pnorm(6,1,1) - pnorm(0.5,1,1)",
        "(pnorm(6,1,1) - pnorm(0.5,1,1)) / pnorm(6,1,1)",
        "1 - pnorm(0.5,1,1)",
        "pnorm(0.5,1,1) / pnorm(6,1,1)"
      ],
      correct: 1,
      explanation: `✅ SOLUZIONE CORRETTA: opzione 2

FORMULA PROBABILITÀ CONDIZIONATA:
P(A|B) = P(A ∩ B) / P(B)

PASSO PER PASSO:

P(X > 0.5 | X < 6) = P(0.5 < X < 6) / P(X < 6)

Numeratore: P(0.5 < X < 6)
= P(X < 6) - P(X ≤ 0.5)
= pnorm(6, 1, 1) - pnorm(0.5, 1, 1)

Denominatore: P(X < 6)
= pnorm(6, 1, 1)

Risultato:
(pnorm(6,1,1) - pnorm(0.5,1,1)) / pnorm(6,1,1)

CODICE R:
> (pnorm(6,1,1) - pnorm(0.5,1,1)) / pnorm(6,1,1)
[1] 0.6915

📌 CONCETTO CHIAVE:
La probabilità condizionata "restringe" lo spazio
campionario all'evento condizionante`
    },
    {
      id: 3,
      category: "Teoria - Media Campionaria",
      difficulty: "⭐⭐",
      question: "Completa: 'La media campionaria è _____ che viene usata per _____ la media della popolazione. La sua varianza _____ al crescere della taglia campionaria. Per n grande ha distribuzione approssimativamente _____, per il _____.'",
      options: [
        "un parametro / calcolare / aumenta / uniforme / legge dei grandi numeri",
        "una statistica / stimare / diminuisce / normale / teorema del limite centrale",
        "una costante / trasformare / rimane costante / esponenziale / TLC",
        "un parametro / stimare / diminuisce / normale / teorema del limite centrale"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: opzione 2

"La media campionaria è UNA STATISTICA che viene usata
per STIMARE la media della popolazione. La sua varianza
DIMINUISCE al crescere della taglia campionaria. Per n
grande ha distribuzione approssimativamente NORMALE,
per il TEOREMA DEL LIMITE CENTRALE."

📚 CONCETTI CHIAVE:

1. STATISTICA vs PARAMETRO:
   - Statistica = calcolata su CAMPIONE (varia)
   - Parametro = proprietà della POPOLAZIONE (fisso)

2. VARIANZA DELLA MEDIA CAMPIONARIA:
   Var(X̄) = σ²/n
   Più grande è n, più piccola è la varianza

3. TEOREMA DEL LIMITE CENTRALE (TLC):
   Per n sufficientemente grande (n ≥ 30):
   X̄ ~ N(μ, σ²/n) approssimativamente

   Valido INDIPENDENTEMENTE dalla distribuzione
   originale di X!

4. IMPORTANZA:
   - Base della statistica inferenziale
   - Permette di fare inferenze sulla popolazione
     usando il campione`
    },
    {
      id: 4,
      category: "Poisson Condizionata - Esame 29 Gen 2025",
      difficulty: "⭐⭐⭐⭐",
      question: "X ~ Poisson(λ=10). Calcola P(X ≤ 3 | X ≠ 0), ovvero la probabilità che X sia al massimo 3 sapendo che X è diverso da 0.",
      options: [
        "ppois(3, 10)",
        "(ppois(3,10) - ppois(0,10)) / (1 - dpois(0,10))",
        "ppois(3, 10) / (1 - ppois(0, 10))",
        "1 - ppois(3, 10)"
      ],
      correct: 1,
      explanation: `✅ SOLUZIONE CORRETTA: opzione 2

FORMULA PROBABILITÀ CONDIZIONATA:
P(A|B) = P(A ∩ B) / P(B)

PASSO PER PASSO:

P(X ≤ 3 | X ≠ 0) = P(X ≤ 3 ∩ X ≠ 0) / P(X ≠ 0)

Numeratore: P(X ≤ 3 ∩ X ≠ 0)
= P(1 ≤ X ≤ 3)
= P(X ≤ 3) - P(X = 0)
= ppois(3, 10) - dpois(0, 10)

Denominatore: P(X ≠ 0)
= 1 - P(X = 0)
= 1 - dpois(0, 10)

Risultato:
(ppois(3,10) - dpois(0,10)) / (1 - dpois(0,10))

CODICE R:
> (ppois(3,10) - dpois(0,10)) / (1 - dpois(0,10))
[1] 0.0103

📌 ATTENZIONE:
ppois(3,10) include P(X=0), quindi va sottratto!

ALTERNATIVA:
> (dpois(1,10) + dpois(2,10) + dpois(3,10)) / (1-dpois(0,10))
[1] 0.0103`
    },
    {
      id: 5,
      category: "Test t Appaiato - Esame 29 Gen 2025",
      difficulty: "⭐⭐⭐",
      question: "120 giocatori di pallavolo testano un nuovo allenamento. Hai misurazioni PRIMA e DOPO. Vuoi testare se la % di battute efficaci è aumentata. Con p-value=0 e α=0.01, quale test e conclusione?",
      options: [
        "t.test(PRIMA, DOPO, paired=FALSE) → Non posso concludere",
        "t.test(PRIMA, DOPO, paired=TRUE, alternative='less') → Rifiuto H0, è aumentata",
        "binom.test() → Non rifiuto H0",
        "t.test(DOPO, PRIMA, paired=TRUE, alternative='greater') → Rifiuto H0"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: opzione 2

TEST CORRETTO:
t.test(PRIMA, DOPO, paired=TRUE, alternative="less")

📌 SPIEGAZIONE:

1. paired=TRUE perché:
   - Stessi giocatori misurati 2 volte
   - Campioni APPAIATI (dipendenti)
   - NON campioni indipendenti!

2. alternative="less" perché:
   - H1: μ_PRIMA < μ_DOPO
   - Vogliamo che DOPO > PRIMA
   - Testiamo se μ_PRIMA - μ_DOPO < 0

3. Ordine PRIMA, DOPO perché:
   - Il test calcola PRIMA - DOPO
   - Se performance migliorano, PRIMA < DOPO
   - Quindi μ_PRIMA - μ_DOPO < 0

CODICE R COMPLETO:
load("pallavolo.RData")

# Analisi descrittiva
mean(dati$DOPO)      # 0.7115
sd(dati$DOPO)        # 0.084
sum(dati$DOPO > 0.7) # 68 giocatori

# Test ipotesi
test <- t.test(dati$PRIMA, dati$DOPO,
               paired = TRUE,
               alternative = "less")
test$p.value  # 0 (< 0.01)

📊 CONCLUSIONE:
p-value (0) < α (0.01) → RIFIUTO H0
C'è sufficiente evidenza per affermare che la
percentuale di battute efficaci è AUMENTATA

⚠️ ERRORI COMUNI:
- paired=FALSE → SBAGLIATO (campioni dipendenti!)
- alternative="greater" → testerebbe il contrario`
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
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-8 rounded-xl mb-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <BookOpen className="w-10 h-10" />
          <div>
            <h1 className="text-3xl font-bold">Esame 29 Gennaio 2025 - Turno 1</h1>
            <p className="text-orange-100 mt-1">
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
                      ? 'bg-orange-600 text-white ring-4 ring-orange-200'
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
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 bg-white hover:border-orange-300 hover:bg-gray-50'
                    } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        showCorrect
                          ? 'bg-green-500 text-white'
                          : showWrong
                          ? 'bg-red-500 text-white'
                          : selected
                          ? 'bg-orange-600 text-white'
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
                  : 'bg-orange-600 text-white hover:bg-orange-700'
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
                className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition"
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
            className="px-8 py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition flex items-center gap-3 mx-auto shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Ricomincia Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizGennaio2025;
