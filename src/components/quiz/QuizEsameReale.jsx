import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, RotateCcw, BookOpen } from 'lucide-react';

const QuizEsameReale = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      category: "Esponenziale - Esame Feb 2021",
      difficulty: "⭐⭐⭐",
      question: "Le precipitazioni giornaliere seguono una distribuzione Esponenziale con media 3 mm. Qual è la probabilità che in un giorno piova più di 7.5 mm?",
      options: [
        "0.0821",
        "0.9179",
        "0.0498",
        "0.2231"
      ],
      correct: 0,
      explanation: `✅ SOLUZIONE:\n\nDato: X ~ Exp(λ) con E[X] = μ = 3 mm\n\nPasso 1: Calcolare λ (rate)\nλ = 1/μ = 1/3\n\nPasso 2: Calcolare P(X > 7.5)\nP(X > 7.5) = 1 - P(X ≤ 7.5) = 1 - pexp(7.5, 1/3)\n\nCodice R:\n> 1 - pexp(7.5, 1/3)\n[1] 0.0821\n\n⚠️ ATTENZIONE:\n- rate = λ = 1/μ (NON μ!)\n- P(X > t) = 1 - pexp(t, rate)\n- Arrotondare a 4 decimali`
    },
    {
      id: 2,
      category: "Test Ipotesi - Esame Feb 2021",
      difficulty: "⭐⭐⭐",
      question: "Un gruppo di maratoneti segue un piano alimentare per 3 mesi. Vuoi testare se i tempi di percorrenza sono migliorati (diminuiti). Hai dati PRE e POST per ogni atleta. Quale test usi?",
      options: [
        "t.test(PRE, POST, paired=FALSE, alternative=\"less\")",
        "t.test(PRE, POST, paired=TRUE, alternative=\"greater\")",
        "t.test(POST, PRE, paired=TRUE, alternative=\"less\")",
        "binom.test() per proporzioni"
      ],
      correct: 1,
      explanation: `✅ SOLUZIONE CORRETTA: opzione 2\n\nt.test(PRE, POST, paired=TRUE, alternative="greater")\n\n📌 SPIEGAZIONE:\n\n1. paired=TRUE perché:\n   - Stessi atleti misurati 2 volte\n   - Campioni appaiati/dipendenti\n\n2. alternative="greater" perché:\n   - H1: μPRE > μPOST (tempi diminuiti = prestazioni migliorate)\n   - Testiamo se PRE è MAGGIORE di POST\n   - "greater" si riferisce alla DIFFERENZA (PRE - POST > 0)\n\n3. Ordine PRE, POST perché:\n   - Vogliamo μPRE - μPOST > 0\n   - Equivale a dire che i tempi sono diminuiti\n\n❌ ERRORI COMUNI:\n- paired=FALSE → sbagliato, sono campioni appaiati\n- alternative="less" → testerebbe μPRE < μPOST (peggioramento)\n- Invertire ordine → cambierebbe il segno dell'ipotesi`
    },
    {
      id: 3,
      category: "Analisi R - Esame Lug 2025",
      difficulty: "⭐⭐",
      question: "Hai un dataset 'basket' con colonne 'Ruolo in campo' e 'Scarpa preferita'. Come calcoli la proporzione di giocatori Playmaker che preferiscono scarpe Basse?",
      options: [
        "prop.table(table(basket$`Ruolo in campo`))[\"Playmaker\"]",
        "subset <- basket[basket$`Ruolo in campo`==\"Playmaker\",]; table(subset$`Scarpa preferita`)[\"Basse\"]/nrow(subset)",
        "mean(basket$`Ruolo in campo`==\"Playmaker\" & basket$`Scarpa preferita`==\"Basse\")",
        "binom.test(basket$`Ruolo in campo`, basket$`Scarpa preferita`)"
      ],
      correct: 1,
      explanation: `✅ SOLUZIONE CORRETTA: opzione 2\n\nPROCEDURA:\n\n# 1. Filtrare solo i Playmaker\nsubset <- basket[basket$\`Ruolo in campo\` == "Playmaker", ]\n\n# 2. Contare quanti preferiscono Basse\ntable(subset$\`Scarpa preferita\`)\n# Output esempio: Alte Basse Medie\n#                   20    40     10\n\n# 3. Calcolare proporzione Basse\ntable(subset$\`Scarpa preferita\`)["Basse"] / nrow(subset)\n# = 40 / 70 = 0.5714\n\nOPPURE (più compatto):\ntable(subset$\`Scarpa preferita\`)["Basse"] / sum(table(subset$\`Scarpa preferita\`))\n\n📌 CONCETTI CHIAVE:\n- Primo filtraggio: isolare gruppo di interesse\n- Poi calcolare proporzione DENTRO quel gruppo\n- Dividere per totale del sottogruppo, non del dataset intero`
    },
    {
      id: 4,
      category: "Esponenziale Condizionata - Esame Lug 2025",
      difficulty: "⭐⭐⭐⭐",
      question: "X ~ Exp(rate=2). Calcola P(X < 7 | X > 6), ovvero la probabilità che X sia minore di 7 sapendo che è maggiore di 6.",
      options: [
        "pexp(7, 2) - pexp(6, 2)",
        "(pexp(7, 2) - pexp(6, 2)) / (1 - pexp(6, 2))",
        "1 - pexp(1, 2)",
        "pexp(1, 2)"
      ],
      correct: 1,
      explanation: `✅ SOLUZIONE CORRETTA: opzione 2\n\nFORMULA PROBABILITÀ CONDIZIONATA:\nP(A|B) = P(A ∩ B) / P(B)\n\nPasso per passo:\n\nP(X < 7 | X > 6) = P(6 < X < 7) / P(X > 6)\n\nNumeratore: P(6 < X < 7)\n= P(X < 7) - P(X < 6)\n= pexp(7, 2) - pexp(6, 2)\n\nDenominatore: P(X > 6)\n= 1 - P(X ≤ 6)\n= 1 - pexp(6, 2)\n\nRisultato:\n(pexp(7, 2) - pexp(6, 2)) / (1 - pexp(6, 2))\n\nCodice R:\n> (pexp(7, 2) - pexp(6, 2)) / (1 - pexp(6, 2))\n[1] 0.8647\n\n🔑 NOTA: Proprietà memoryless NON applicabile qui`
    },
    {
      id: 5,
      category: "Teoria - Esame Lug 2025",
      difficulty: "⭐⭐",
      question: "Completa: \"La media campionaria è _____ che viene usata per _____ la media della popolazione. La media campionaria assume valori _____ su campioni diversi.\"",
      options: [
        "un parametro / calcolare / uguali",
        "una statistica / stimare / diversi",
        "una costante / trasformare / uguali",
        "un parametro / stimare / diversi"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: opzione 2\n\n"La media campionaria è UNA STATISTICA che viene usata per \nSTIMARE la media della popolazione. La media campionaria \nassume valori DIVERSI su campioni diversi."\n\n📚 CONCETTI CHIAVE:\n\n1. STATISTICA vs PARAMETRO:\n   - Statistica = calcolata su CAMPIONE (variabile)\n   - Parametro = proprietà della POPOLAZIONE (costante)\n\n2. STIMARE:\n   - Obiettivo della statistica inferenziale\n   - Usare campione per inferire proprietà popolazione\n\n3. VALORI DIVERSI:\n   - Ogni campione diverso → media campionaria diversa\n   - X̄ è una variabile aleatoria`
    },
    {
      id: 6,
      category: "Probabilità Classica - Esame Lug 2025",
      difficulty: "⭐⭐⭐",
      question: "Lanci una moneta 5 volte. Sia B = 'i primi 3 risultati sono uguali' ∪ 'gli ultimi 3 risultati sono uguali'. Calcola P(B).",
      options: [
        "0.25",
        "0.4375",
        "0.50",
        "0.3125"
      ],
      correct: 1,
      explanation: `✅ SOLUZIONE: 0.4375\n\nDEFINIZIONI:\nA = "primi 3 uguali" = (CCC··) ∪ (TTT··)\nA' = "ultimi 3 uguali" = (··CCC) ∪ (··TTT)\nB = A ∪ A'\n\nCALCOLO P(A):\nP(CCC··) = (1/2)³ = 1/8\nP(TTT··) = (1/2)³ = 1/8\nP(A) = 1/8 + 1/8 = 1/4 = 0.25\n\nP(A') = 0.25 (per simmetria)\n\nP(A ∩ A') = "tutti 5 uguali":\nP(A ∩ A') = 2 × (1/2)⁵ = 1/16 = 0.0625\n\nFORMULA UNIONE:\nP(B) = P(A) + P(A') - P(A ∩ A')\nP(B) = 0.25 + 0.25 - 0.0625 = 0.4375\n\n🎯 Non dimenticare di sottrarre l'intersezione!`
    },
    {
      id: 7,
      category: "Test Proporzioni - Esame Lug 2025",
      difficulty: "⭐⭐⭐",
      question: "In un dataset di 324 giocatori, 65 sono Playmaker (proporzione = 0.2006). Testi H0: p=0.25 vs H1: p≠0.25. Ottieni p-value=0.0401. Con α=0.01, quale conclusione?",
      options: [
        "Rifiuto H0, meno del 25% sono Playmaker",
        "Non posso rifiutare H0, il 25% dei giocatori è nel ruolo Playmaker",
        "Rifiuto H0, il 25% dei giocatori è nel ruolo Playmaker",
        "Non posso rifiutare H0, più del 25% sono Playmaker"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: opzione 2\n\nANALISI:\np-value (0.0401) > α (0.01)\n→ NON POSSO RIFIUTARE H0\n\nINTERPRETAZIONE:\n"Il 25% dei giocatori è nel ruolo Playmaker"\n\nCodice R:\n> binom.test(65, 324, p=0.25, alternative="two.sided")\n> test$p.value\n[1] 0.0401\n\n📌 NOTA: p-value = 0.0401 sarebbe significativo con α=0.05,\nma NON con α=0.01 (più stringente)\n\n⚠️ MAI dire "Accetto H0" → si dice "Non rifiuto H0"`
    },
    {
      id: 8,
      category: "R Filtering - Esame Feb 2021",
      difficulty: "⭐⭐",
      question: "Hai un dataframe 'dati' con colonne 'genere' e 'tempiPRE'. Come calcoli il 16° percentile dei tempi PRE solo per i maschi?",
      options: [
        "quantile(dati$tempiPRE, 0.16, na.rm=TRUE)",
        "quantile(dati[dati$genere==\"M\",]$tempiPRE, 0.16, na.rm=TRUE)",
        "quantile(dati$tempiPRE[dati$genere==\"M\"], 0.16, na.rm=TRUE)",
        "Opzione 2 e 3 sono entrambe corrette"
      ],
      correct: 3,
      explanation: `✅ RISPOSTA CORRETTA: opzione 4 (sia 2 che 3 corrette)\n\nDUE METODI EQUIVALENTI:\n\nMetodo 1 (subsetting):\nquantile(dati[dati$genere=="M", ]$tempiPRE, 0.16, na.rm=TRUE)\n\nMetodo 2 (filtraggio vettoriale):\nquantile(dati$tempiPRE[dati$genere=="M"], 0.16, na.rm=TRUE)\n\n💡 Entrambi danno lo stesso risultato!\n\n⚠️ SEMPRE aggiungere na.rm=TRUE`
    },
    {
      id: 9,
      category: "Esponenziale Sistema - Avanzato",
      difficulty: "⭐⭐⭐⭐",
      question: "Un sistema ha 3 sensori indipendenti. Ogni sensore ha durata X ~ Exp(μ=5 anni). Il sistema funziona se almeno 2 sensori funzionano. Qual è la probabilità che il sistema funzioni dopo 7 anni?",
      options: [
        "P(almeno 2 sensori vivi) = 1 - P(0 o 1 vivo)",
        "Usare Binomiale: n=3, p=P(X>7), k≥2",
        "1 - [pbinom(1, 3, prob) dove prob=1-pexp(7,1/5)]",
        "Tutte le precedenti (approcci equivalenti)"
      ],
      correct: 3,
      explanation: `✅ TUTTE LE OPZIONI SONO CORRETTE!\n\nPROBLEMA "SISTEMA DI COMPONENTI"\n\nStep 1: Probabilità UN sensore funzioni\np = P(X > 7) = 1 - pexp(7, 1/5) ≈ 0.2466\n\nStep 2: Numero sensori vivi ~ Binomiale\nY ~ Bin(n=3, p=0.2466)\n\nStep 3: Sistema funziona se Y ≥ 2\nP(Y ≥ 2) = 1 - pbinom(1, 3, p)\n\nCODICE R:\np <- 1 - pexp(7, 1/5)\nprob_sistema <- 1 - pbinom(1, 3, p)\n# Risultato: 0.1335\n\n🎯 PATTERN RICORRENTE NEGLI ESAMI!`
    },
    {
      id: 10,
      category: "Interpretazione P-value",
      difficulty: "⭐⭐",
      question: "Hai fatto un test t-test paired con alternative='greater'. Ottieni p-value=0.03. Con α=0.05, che frase è corretta?",
      options: [
        "Il campione casuale non porta sufficiente evidenza per abbandonare l'ipotesi nulla",
        "Il campione casuale porta sufficiente evidenza per abbandonare l'ipotesi nulla",
        "Accetto l'ipotesi alternativa",
        "Rifiuto l'ipotesi alternativa"
      ],
      correct: 1,
      explanation: `✅ RISPOSTA CORRETTA: opzione 2\n\n"Il campione casuale porta sufficiente evidenza per \nabbandonare l'ipotesi nulla"\n\np-value (0.03) < α (0.05) → RIFIUTO H0\n\nFRASEOLOGIA CORRETTA:\n✅ "Rifiuto l'ipotesi nulla"\n✅ "Sufficiente evidenza per abbandonare H0"\n✅ "Posso affermare che...[H1]"\n\n❌ EVITARE:\n- "Accetto H1" → mai dire "accetto"\n- "H0 è falsa" → non possiamo provare falsità\n- "Dimostro che..." → test ≠ dimostrazione\n\n📊 TABELLA:\np < α → Rifiuto H0 → "Sufficiente evidenza"\np ≥ α → Non rifiuto → "Non sufficiente evidenza"`
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
            <h1 className="text-3xl font-bold">Quiz Avanzato EPS</h1>
            <p className="text-purple-100 mt-1">
              Domande da esami reali (Feb 2021, Lug 2025)
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
            score >= 7 ? 'bg-green-500' : score >= 5 ? 'bg-orange-500' : 'bg-red-500'
          }`}>
            {score}/{questions.length}
          </div>

          <h2 className="text-4xl font-bold mb-4">
            {score >= 7 ? '🎉 Ottimo lavoro!' :
             score >= 5 ? '👍 Buon risultato!' :
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

      {/* Tips */}
      <div className="mt-8 bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
        <h3 className="text-xl font-bold text-blue-900 mb-4">💡 Suggerimenti per l'esame:</h3>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Esponenziale:</strong> Ricorda che rate λ = 1/media μ</li>
          <li><strong>Test paired:</strong> Usa paired=TRUE per misure ripetute sugli stessi soggetti</li>
          <li><strong>P-value:</strong> p &lt; α → rifiuto H0, p ≥ α → non rifiuto H0</li>
          <li><strong>R filtering:</strong> Usa sempre na.rm=TRUE con mean(), sd(), quantile()</li>
          <li><strong>Arrotondamenti:</strong> 4 decimali per probabilità, 2 per statistiche</li>
        </ul>
      </div>
    </div>
  );
};

export default QuizEsameReale;
